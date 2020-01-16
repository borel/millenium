const { app } = require("../../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
describe("API", () => {
  describe("/", () => {
    it("Should return 200", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          expect(res.body.message).to.equals("welcome");
          done();
        });
    });
  });
  describe("/path", () => {
    it("Should return empty array if the countdown is too short", done => {
      chai
        .request(app)
        .post("/path")
        .send({
          countdown: 7,
          bounty_hunters: [
            { planet: "Hoth", day: 6 },
            { planet: "Hoth", day: 7 },
            { planet: "Hoth", day: 8 }
          ]
        })
        .end((err, res) => {
          expect(res.body.length).to.eql(0);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("Should return empty array if the countdown is too short", done => {
      chai
        .request(app)
        .post("/path")
        .send({
          countdown: 7,
          bounty_hunters: [
            { planet: "Hoth", day: 6 },
            { planet: "Hoth", day: 7 },
            { planet: "Hoth", day: 8 }
          ]
        })
        .end((err, res) => {
          expect(res.body.length).to.eql(0);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("Should return an array and the first element should equal 81", done => {
      chai
        .request(app)
        .post("/path")
        .send({
          countdown: 8,
          bounty_hunters: [
            { planet: "Hoth", day: 6 },
            { planet: "Hoth", day: 7 },
            { planet: "Hoth", day: 8 }
          ]
        })
        .end((err, res) => {
          expect(res.body[0].percent).to.eql(81);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("Should return an array and the first element should equal 81", done => {
      chai
        .request(app)
        .post("/path")
        .send({
          countdown: 9,
          bounty_hunters: [
            { planet: "Hoth", day: 6 },
            { planet: "Hoth", day: 7 },
            { planet: "Hoth", day: 8 }
          ]
        })
        .end((err, res) => {
          expect(res.body[0].percent).to.eql(90);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("Should return an array and the first element should equal 81", done => {
      chai
        .request(app)
        .post("/path")
        .send({
          countdown: 10,
          bounty_hunters: [
            { planet: "Hoth", day: 6 },
            { planet: "Hoth", day: 7 },
            { planet: "Hoth", day: 8 }
          ]
        })
        .end((err, res) => {
          expect(res.body[0].percent).to.eql(100);
          [
            "Tatooine",
            "space",
            "space",
            "space",
            "space",
            "space",
            "Dagobah",
            "Dagobah",
            "Dagobah",
            "Hoth",
            "Endor"
          ].forEach((planet, index) => {
            expect(res.body[0].path[index].name).eql(planet);
          });

          expect(res.body[1].percent).to.eql(100);
          [
            "Tatooine",
            "Tatooine",
            "space",
            "space",
            "space",
            "space",
            "space",
            "Dagobah",
            "Dagobah",
            "Hoth",
            "Endor"
          ].forEach((planet, index) => {
            expect(res.body[1].path[index].name).eql(planet);
          });

          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
