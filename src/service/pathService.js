const SPACE_STEP = "space";

/**
 * Build all combination of eligble paths
 * @param {*} travelBooks
 * @param {*} empireParam
 */
const buildPath = (travelBooks, empireParam, tripParam) => {
  let paths = [];
  const countdown = empireParam.countdown;

  travelBooks.forEach(travelBook => {
    let newPaths = [];
    const deltas = countdown - (travelBook.length - 1);

    travelBook.forEach(step => {
      if (newPaths.length) {
        newPaths.forEach(path => {
          // Create a graph for each occurence of step. the number of occurence depends on the number of free day (delta between countdownn and travel book)
          if (
            ![SPACE_STEP, tripParam.arrival].includes(step) &&
            deltas >= 1
          ) {
            addPath(deltas, newPaths, step, path);
          }
          // Add single step to existing graph
          path.push(step);
        });
      } else {
        if (deltas >= 1) {
          newPaths = addPath(deltas, newPaths, step, null);
        } else {
          const path = [];
          path.push(step);
          newPaths.push(path);
        }
      }
    });

    paths = paths.concat(newPaths);
  });
  // remove the paths who are too long
  return paths.filter(path => path.length <= countdown + 1);
};

const addPath = (deltas, newPaths, step, path) => {
  for (
    let deltaPosition = path ? 1 : 0; // if the path exist , we skip the first path as i
    deltaPosition <= deltas;
    deltaPosition++
  ) {
    const newPath = path ? Array.from(path) : [];
    for (
      let addStepOccurence = 0;
      addStepOccurence <= deltaPosition;
      addStepOccurence++
    ) {
      newPath.push(step);
    }
    newPaths.push(newPath);
  }
  return newPaths;
};

/**
 * Add bounty hunter information to paths
 * @param {*} paths
 * @param {*} bountyHunters
 */
const addBoutyHunter = (paths, bountyHunters) => {
  return paths.map(path => {
    return path.map((element, index) => {
      return {
        name: element,
        bountyHunter: isBountyHunted(element, index, bountyHunters)
      };
    });
  });
};

const isBountyHunted = (element, day, bountyHunters) => {
  return (
    bountyHunters.filter(
      bounty => bounty.planet == element && bounty.day == day
    ) != 0
  );
};

const filterAutonnomy = (paths, autonomy) => {
  return paths.filter(path => {
    let fuelReserve = autonomy;
    for (let tripDay = 1; tripDay < path.length; tripDay++) {
      const lastStep = path[tripDay - 1];
      const step = path[tripDay];
      // If we stay 2 days in a planet then we automaticly refuel
      if (step == lastStep && lastStep != SPACE_STEP) {
        fuelReserve = autonomy;
      } else {
        fuelReserve--;
      }
      if (fuelReserve == -1) {
        return false;
      }
    }
    return true;
  });
};

const addPercent = paths => {
  return paths
    .map(path => {
      const bountyPaths = path.filter(path => path.bountyHunter == true);
      let percent = 100;
      for (let bountyPath = 0; bountyPath < bountyPaths.length; bountyPath++) {
        percent -=
          bountyPath == 0
            ? (1 / 10) * 100
            : (Math.pow(9, bountyPath) / Math.pow(10, bountyPath + 1)) * 100;
      }
      return { path, percent };
    })
    .sort(function(firstPath, secondPath) {
      return secondPath.percent - firstPath.percent;
    });
};

const buildPaths = (travelBooks, empireParam, tripParam) => {
  const paths = buildPath(travelBooks, empireParam, tripParam);
  const pathsWithAutonnomy = filterAutonnomy(paths, tripParam.autonomy);
  const pathsWithAutonnomyAndBounty = addBoutyHunter(
    pathsWithAutonnomy,
    empireParam.bounty_hunters
  );
  return addPercent(pathsWithAutonnomyAndBounty);
};

module.exports = {
  buildPaths,
  filterAutonnomy,
  addBoutyHunter,
  addPercent
};
