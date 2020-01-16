const express = require("express");
const routes = require("./src/route");
const app = express();
const host = "0.0.0.0";
const port = 8080;

const runSever = () => {
  app.use(express.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  routes.addRoutes(app);

  app.listen(port, host);
  console.log(`Running on http://${host}:${port}`);
};

module.exports = {
  app
};

runSever();
