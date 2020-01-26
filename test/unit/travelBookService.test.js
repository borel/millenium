const {
  buildGalaxyMap,
  buildPathWithSpace,
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
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "A", position: 2 },
              { name: "B", position: 3 },
              { name: "A", position: 4 },
              { name: "D", position: 5 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "A", position: 2 },
              { name: "D", position: 3 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "space", position: 2 },
              { name: "C", position: 3 },
              { name: "D", position: 4 }
            ],
            [
              { name: "A", position: 0 },
              { name: "D", position: 1 }
            ]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const paths = buildPath(galaxyMap, 6, "A", "D");
        const pathWithSpace = buildPathWithSpace(paths, ctx.element.rows);
        expect(pathWithSpace).to.eql(ctx.expected.pathWithSpace);
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
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "A", position: 2 },
              { name: "B", position: 3 },
              { name: "A", position: 4 },
              { name: "D", position: 5 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "A", position: 2 },
              { name: "B", position: 3 },
              { name: "C", position: 4 },
              { name: "D", position: 5 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "A", position: 2 },
              { name: "D", position: 3 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "C", position: 2 },
              { name: "B", position: 3 },
              { name: "A", position: 4 },
              { name: "D", position: 5 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "C", position: 2 },
              { name: "B", position: 3 },
              { name: "C", position: 4 },
              { name: "D", position: 5 }
            ],
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "C", position: 2 },
              { name: "D", position: 3 }
            ],
            [
              { name: "A", position: 0 },
              { name: "D", position: 1 }
            ]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const paths = buildPath(galaxyMap, 5, "A", "D");
        const pathWithSpace = buildPathWithSpace(paths, ctx.element.rows);
        console.log("pathWithSpace", pathWithSpace);
        expect(pathWithSpace).to.eql(ctx.expected.pathWithSpace);
      });
    });
  });
});
