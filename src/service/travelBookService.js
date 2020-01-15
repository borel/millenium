const Graph = require("node-all-paths");
const sqlite3 = require("sqlite3").verbose();

const SPACE_STEP = "space";

/**
 * Build structured JSON of the galaxy who will be use to get all the possible paths
 * @param {*} rows
 */
const buildGalaxyMap = rows => {
  const galaxyMap = {};
  rows.forEach(row => {
    if (!row.ORIGIN) {
      return {};
    }
    galaxyMap[row.ORIGIN] = galaxyMap[row.ORIGIN] ? galaxyMap[row.ORIGIN] : {};
    galaxyMap[row.ORIGIN][row.DESTINATION] = row.TRAVEL_TIME;
  });
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

/**
 * Build book with all the possible paths
 */
const buildTravelBook = async tripParam => {
  const rows = await queryAll("SELECT * FROM ROUTES", tripParam.routes_db);
  const galaxyMap = buildGalaxyMap(rows);
  const galaxyGraph = new Graph(galaxyMap);
  const paths = galaxyGraph.path(tripParam.departure, tripParam.arrival);
  const travelBook = buildPathWithSpace(paths, rows);
  return travelBook;
};

module.exports = {
  buildTravelBook,
  buildGalaxyMap,
  buildPathWithSpace
};
