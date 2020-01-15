const { buildPaths } = require("../../src/service/pathService");

/* global expect */
/* eslint-env mocha */
describe("PathService", () => {
  // describe("#buildPaths - Path and countdown ", () => {
  //   const travelBooks = [
  //     [
  //       { name: "A", position: 0 },
  //       { name: "B", position: 1 },
  //       { name: "space", position: 2 },
  //       { name: "space", position: 3 },
  //       { name: "C", position: 4 },
  //       { name: "space", position: 5 },
  //       { name: "D", position: 6 }
  //     ],
  //     [
  //       { name: "A", position: 0 },
  //       { name: "space", position: 1 },
  //       { name: "space", position: 2 },
  //       { name: "space", position: 3 },
  //       { name: "space", position: 4 },
  //       { name: "D", position: 5 }
  //     ]
  //   ];
  //   const dataDriven = [
  //     {
  //       desc:
  //         "Should return 100 as there is only one  possible path without bounty",
  //       element: {
  //         travelBooks,
  //         bountyHunterParam: {
  //           countdown: 4,
  //           bounty_hunters: []
  //         },
  //         tripParam: {
  //           autonomy: 6,
  //           departure: "A",
  //           arrival: "D",
  //           routes_db: "universe.db"
  //         }
  //       },
  //       expected: {
  //         nbPossiblePath: 0,
  //         maxPercent: 0
  //       }
  //     },
  //     {
  //       desc:
  //         "Should return 100 as there is only one  possible path without bounty",
  //       element: {
  //         travelBooks,
  //         bountyHunterParam: {
  //           countdown: 5,
  //           bounty_hunters: []
  //         },
  //         tripParam: {
  //           autonomy: 6,
  //           departure: "A",
  //           arrival: "D",
  //           routes_db: "universe.db"
  //         }
  //       },
  //       expected: {
  //         nbPossiblePath: 1,
  //         maxPercent: 100
  //       }
  //     },
  //     {
  //       desc: "Should return 90 as there is only one possible path with bounty",
  //       element: {
  //         travelBooks,
  //         bountyHunterParam: {
  //           countdown: 5,
  //           bounty_hunters: [{ planet: "D", day: 5 }]
  //         },
  //         tripParam: {
  //           autonomy: 6,
  //           departure: "A",
  //           arrival: "D",
  //           routes_db: "universe.db"
  //         }
  //       },
  //       expected: {
  //         nbPossiblePath: 1,
  //         maxPercent: 90
  //       }
  //     },
  //     {
  //       desc: "Should return 100 as one of the path has no bounty",
  //       element: {
  //         travelBooks,
  //         bountyHunterParam: {
  //           countdown: 6,
  //           bounty_hunters: [{ planet: "D", day: 6 }]
  //         },
  //         tripParam: {
  //           autonomy: 6,
  //           departure: "A",
  //           arrival: "D",
  //           routes_db: "universe.db"
  //         }
  //       },
  //       expected: {
  //         nbPossiblePath: 3,
  //         maxPercent: 100
  //       }
  //     }
  //   ];
  //   dataDriven.forEach(ctx => {
  //     it(ctx.desc, () => {
  //       const res = buildPaths(
  //         ctx.element.travelBooks,
  //         ctx.element.bountyHunterParam,
  //         ctx.element.tripParam
  //       );

  //       expect(res.length).to.eql(ctx.expected.nbPossiblePath);
  //       if (res.length) {
  //         expect(res[0].percent).to.eql(ctx.expected.maxPercent);
  //       }
  //     });
  //   });
  // });
  describe("#buildPaths - Autonomy and countdown ", () => {
    const travelBooks = [
      [
        { name: "A", position: 0 },
        { name: "B", position: 1 },
        { name: "space", position: 2 },
        { name: "space", position: 3 },
        { name: "C", position: 4 },
        { name: "space", position: 5 },
        { name: "D", position: 6 }
      ]
    ];
    const dataDriven = [
      {
        desc: "Should return 100 as there is 1 possible path",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 7,
            bounty_hunters: []
          },
          tripParam: {
            autonomy: 4,
            departure: "A",
            arrival: "D",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 1,
          maxPercent: 100
        }
      },
      {
        desc: "Should return 100 as there is 1 possible path",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 8,
            bounty_hunters: []
          },
          tripParam: {
            autonomy: 3,
            departure: "A",
            arrival: "D",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 1,
          maxPercent: 100
        }
      },
      {
        desc: "Should return 100 as there is 4  possible paths",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 9,
            bounty_hunters: []
          },
          tripParam: {
            autonomy: 3,
            departure: "A",
            arrival: "D",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 4,
          maxPercent: 100
        }
      },
      {
        desc: "Should return 0 as there is no possible path",
        element: {
          travelBooks,
          bountyHunterParam: {
            countdown: 9,
            bounty_hunters: []
          },
          tripParam: {
            autonomy: 2,
            departure: "A",
            arrival: "D",
            routes_db: "universe.db"
          }
        },
        expected: {
          nbPossiblePath: 0,
          maxPercent: 0
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
