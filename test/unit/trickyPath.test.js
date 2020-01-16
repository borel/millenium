const { buildPaths } = require("../../src/service/pathService");

/* global expect */
/* eslint-env mocha */
describe("TrickyPath", () => {
  describe("#trickyPath - Some tricky point", () => {
    const travelBooks = [
      [
        { name: "A", position: 0 },
        { name: "B", position: 1 },
        { name: "space", position: 2 },
        { name: "space", position: 3 },
        { name: "C", position: 4 },
        { name: "space", position: 5 },
        { name: "D", position: 6 },
        { name: "F", position: 7 }
      ],
      [
        { name: "A", position: 0 },
        { name: "space", position: 1 },
        { name: "space", position: 2 },
        { name: "space", position: 3 },
        { name: "C", position: 4 },
        { name: "space", position: 5 },
        { name: "F", position: 6 }
      ]
    ];
    const dataDriven = [
      {
        desc:
          "Should return 100 as the step C could be put in position 5 in second path",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 7,
            bounty_hunters: [{ planet: "C", day: 4 }]
          },
          tripParam: {
            autonomy: 7,
            departure: "A",
            arrival: "F",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 4,
          maxPercent: 100
        }
      },
      {
        desc: "Should return 90 as the step C is mandatory in position 4 ",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 6,
            bounty_hunters: [{ planet: "C", day: 4 }]
          },
          tripParam: {
            autonomy: 7,
            departure: "A",
            arrival: "F",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 1,
          maxPercent: 90
        }
      },
      {
        desc: "Should return 90 as the step B is mandatory in position 2 ",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 9,
            bounty_hunters: [
              { planet: "C", day: 4 },
              { planet: "B", day: 2 }
            ]
          },
          tripParam: {
            autonomy: 3,
            departure: "A",
            arrival: "F",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 1,
          maxPercent: 90
        }
      },
      {
        desc: "Should return 81 as the step B is mandatory in position 2 and C in position 5 or 6",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 10,
            bounty_hunters: [
              { planet: "C", day: 6 },
              { planet: "C", day: 7 },
              { planet: "C", day: 8 },
              { planet: "B", day: 2 }
            ]
          },
          tripParam: {
            autonomy: 3,
            departure: "A",
            arrival: "F",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 5,
          maxPercent: 81
        }
      }
    ];
    dataDriven.forEach(ctx => {
      it(ctx.desc, () => {
        const res = buildPaths(
          ctx.element.travelBooks,
          ctx.element.bountyHunterParam,
          ctx.element.tripParam
        );

        expect(res.length).to.eql(ctx.expected.nbPossiblePath);
        if (res.length) {
          expect(res[0].percent).to.eql(ctx.expected.maxPercent);
        }
      });
    });
  });
});
