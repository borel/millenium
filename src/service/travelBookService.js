const sqlite3 = require("sqlite3").verbose();

const SPACE_STEP = "space";

/**
 * Build structured JSON of the galaxy who will be use to get all the possible paths
 * @param {*} rows
 */
const buildGalaxyMap = rows => {
  const galaxyMap = [];
  if (rows) {
    rows.forEach(row => {
      if (!row.ORIGIN) {
        return {};
      }
      //both side
      galaxyMap[row.ORIGIN] = galaxyMap[row.ORIGIN]
        ? galaxyMap[row.ORIGIN]
        : [];
      galaxyMap[row.ORIGIN].push({
        planet: row.DESTINATION,
        trip: row.TRAVEL_TIME
      });

      galaxyMap[row.DESTINATION] = galaxyMap[row.DESTINATION]
        ? galaxyMap[row.DESTINATION]
        : [];
      galaxyMap[row.DESTINATION].push({
        planet: row.ORIGIN,
        trip: row.TRAVEL_TIME
      });
    });
  }
  return galaxyMap;
};

/**
 * Build fill path with planet stop and space
 * @param {*} routes
 */
const buildPathWithSpace = (paths, rows) => {
  if (!paths || paths.length == 0 || !rows || rows.length == 0) {
    return [];
  }
  return paths.map(path => {
    const pathsWithSpace = [];
    let position = 0;
    path.forEach((element, index) => {
      pathsWithSpace.push({ name: element, position });
      position++;
      // Add 'space' step between planet if needed
      const stepDb = rows.filter(
        row => row.ORIGIN == element && row.DESTINATION == path[index + 1]
      );
      if (stepDb.length && stepDb[0].TRAVEL_TIME > 1) {
        for (
          let travelTime = 1;
          travelTime < stepDb[0].TRAVEL_TIME;
          travelTime++
        ) {
          pathsWithSpace.push({ name: SPACE_STEP, position });
          position++;
        }
      }
    });
    return pathsWithSpace;
  });
};

const queryAll = (query, dbName) => {
  const db = new sqlite3.Database(`resources/${dbName}`);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const buildPath = (galaxyMap, countdown, departure, arrival) => {
  const paths = [];
  if (!galaxyMap) {
    return paths;
  }
  const path = {
    path: [],
    countdown: 0
  };
  const findNeighbors = (path, planet, arrival, countdown, galaxyMap) => {
    // Add current planet
    path.path.push(planet.planet);
    path.countdown = path.countdown + planet.trip;

    if (path.countdown >= countdown) {
      // nothing
    } else if (planet.planet == arrival) {
      paths.push(path);
    } else {
      // Find potential planet
      const neighbors = galaxyMap[planet.planet];
      neighbors.forEach(neighbor => {
        let newPath = {
          path: path ? Array.from(path.path) : [],
          countdown: path.countdown
        };
        findNeighbors(newPath, neighbor, arrival, countdown, galaxyMap);
      });
    }
  };

  const departureStructured = { planet: departure, trip: 0 };
  findNeighbors(path, departureStructured, arrival, countdown, galaxyMap);
  return paths.map(path => path.path);
};

/**
 * Build book with all the possible paths
 */
const buildTravelBook = async (tripParam, empireParam) => {
  const rows = await queryAll("SELECT * FROM ROUTES", tripParam.routes_db);
  const galaxyMap = buildGalaxyMap(rows);
  const paths = buildPath(
    galaxyMap,
    empireParam.countdown,
    tripParam.departure,
    tripParam.arrival
  );
  const travelBook = buildPathWithSpace(paths, rows);
  return travelBook;
};

module.exports = {
  buildTravelBook,
  buildGalaxyMap,
  buildPathWithSpace,
  buildPath
};
