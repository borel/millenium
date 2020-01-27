const {
  buildGalaxyMap,
  buildPath
} = require("../../src/service/travelBookService");
const Graph = require("node-all-paths");

/* global expect */
/* eslint-env mocha */
describe("TravelBookService", () => {
  describe("#buildPath", () => {
    const dataDriven = [
      {
        desc: "Should return a formated path , if the rows are well formated",
        element: {
          rows: [
            { ORIGIN: "A", DESTINATION: "B", TRAVEL_TIME: 1 },
            { ORIGIN: "B", DESTINATION: "C", TRAVEL_TIME: 1 },
            { ORIGIN: "C", DESTINATION: "D", TRAVEL_TIME: 1 },
            { ORIGIN: "A", DESTINATION: "D", TRAVEL_TIME: 1 }
          ]
        },
        expected: {
          paths: [
            ["A", "B", "A", "D"],
            ["A", "B", "C", "D"],
            ["A", "D"]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const paths = buildPath(galaxyMap, 5, "A", "D");
        expect(paths).to.eql(ctx.expected.paths);
      });
    });
  });
  describe("#buildPathWithSpace", () => {
    const dataDriven = [
      {
        desc: "Should return a formated path , if the rows are well formated",
        element: {
          rows: [
            { ORIGIN: "A", DESTINATION: "B", TRAVEL_TIME: 1 },
            { ORIGIN: "B", DESTINATION: "C", TRAVEL_TIME: 2 },
            { ORIGIN: "C", DESTINATION: "D", TRAVEL_TIME: 1 },
            { ORIGIN: "A", DESTINATION: "D", TRAVEL_TIME: 1 }
          ]
        },
        expected: {
          pathWithSpace: [
            ["A", "B", "A", "B", "A", "D"],
            ["A", "B", "A", "D"],
            ["A", "B", "space", "C", "D"],
            ["A", "D"]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const paths = buildPath(galaxyMap, 6, "A", "D");
        expect(paths).to.eql(ctx.expected.pathWithSpace);
      });
    });
  });
  describe("#buildPathWithSpace", () => {
    const dataDriven = [
      {
        desc: "Should return a formated path , if the rows are well formated",
        element: {
          rows: [
            { ORIGIN: "A", DESTINATION: "B", TRAVEL_TIME: 1 },
            { ORIGIN: "B", DESTINATION: "C", TRAVEL_TIME: 1 },
            { ORIGIN: "C", DESTINATION: "D", TRAVEL_TIME: 1 },
            { ORIGIN: "A", DESTINATION: "D", TRAVEL_TIME: 1 }
          ]
        },
        expected: {
          pathWithSpace: [
            ["A", "B", "A", "B", "A", "D"],
            ["A", "B", "A", "B", "C", "D"],
            ["A", "B", "A", "D"],
            ["A", "B", "C", "B", "A", "D"],
            ["A", "B", "C", "B", "C", "D"],
            ["A", "B", "C", "D"],
            ["A", "D"]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const paths = buildPath(galaxyMap, 6, "A", "D");
        expect(paths).to.eql(ctx.expected.pathWithSpace);
      });
    });
  });
});
