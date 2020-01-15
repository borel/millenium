const {
  buildGalaxyMap,
  buildPathWithSpace
} = require("../../src/service/travelBookService");
const Graph = require("node-all-paths");

/* global expect */
/* eslint-env mocha */
describe("TravelBookService", () => {
  describe("#buildGalaxyMap", () => {
    const dataDriven = [
      {
        desc: "Should return an empty JSON, if the rows are not well formated",
        element: {
          rows: [{ TEST: "A", TEST_B: "B", TRAVEL_TIME: 1 }]
        },
        expected: {}
      },
      {
        desc: "Should return an empty JSON, if there is no row",
        element: {
          rows: []
        },
        expected: {}
      },
      {
        desc: "Should return a formated JSON , if the rows are well formated",
        element: {
          rows: [
            { ORIGIN: "A", DESTINATION: "B", TRAVEL_TIME: 1 },
            { ORIGIN: "B", DESTINATION: "C", TRAVEL_TIME: 1 },
            { ORIGIN: "C", DESTINATION: "D", TRAVEL_TIME: 1 },
            { ORIGIN: "A", DESTINATION: "D", TRAVEL_TIME: 1 }
          ]
        },
        expected: {
          A: {
            B: 1,
            D: 1
          },
          B: {
            C: 1
          },
          C: {
            D: 1
          }
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const res = buildGalaxyMap(ctx.element.rows);
        expect(res).to.eql(ctx.expected);
      });
    });
  });
  describe("#path", () => {
    const dataDriven = [
      {
        desc: "Should return an empty JSON, if there is no row",
        element: {
          rows: []
        },
        expected: { paths: null }
      },
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
            ["A", "B", "C", "D"],
            ["A", "D"]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const galaxyGraph = new Graph(galaxyMap);
        const paths = galaxyGraph.path("A", "D");
        expect(paths).to.eql(ctx.expected.paths);
      });
    });
  });
  describe("#buildPathWithSpace", () => {
    const dataDriven = [
      {
        desc: "Should return an empty JSON, if there is no row",
        element: {
          rows: []
        },
        expected: { pathWithSpace: [] }
      },
      {
        desc: "Should return a formated path , if the rows are well formated",
        element: {
          rows: [
            { ORIGIN: "A", DESTINATION: "B", TRAVEL_TIME: 1 },
            { ORIGIN: "B", DESTINATION: "C", TRAVEL_TIME: 3 },
            { ORIGIN: "C", DESTINATION: "D", TRAVEL_TIME: 2 },
            { ORIGIN: "A", DESTINATION: "D", TRAVEL_TIME: 2 }
          ]
        },
        expected: {
          pathWithSpace: [
            [
              { name: "A", position: 0 },
              { name: "B", position: 1 },
              { name: "space", position: 2 },
              { name: "space", position: 3 },
              { name: "C", position: 4 },
              { name: "space", position: 5 },
              { name: "D", position: 6 }
            ],
            [
              { name: "A", position: 0 },
              { name: "space", position: 1 },
              { name: "D", position: 2 }
            ]
          ]
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const galaxyMap = buildGalaxyMap(ctx.element.rows);
        const galaxyGraph = new Graph(galaxyMap);
        const paths = galaxyGraph.path("A", "D");
        const pathWithSpace = buildPathWithSpace(paths, ctx.element.rows);
        expect(pathWithSpace).to.eql(ctx.expected.pathWithSpace);
      });
    });
  });
});
