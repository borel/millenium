const tripParam = require("../resources/millenium-falcon.json");
const { buildTravelBook } = require("./service/travelBookService");
const { buildPaths } = require("./service/pathService");

const getPaths = async empireParam => {
  const travelBooks = await buildTravelBook(tripParam);
  const paths = buildPaths(travelBooks, empireParam, tripParam);
  return paths;
};

module.exports = {
  getPaths
};
