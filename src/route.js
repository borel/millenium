const { getPaths } = require("./service");

const addRoutes = app => {
  app.get("/", async (req, res) => {
    res.json({ status: "success", message: "welcome" });
  });
  app.post("/path", async (req, res) => {
    res.send(await getPaths(req.body));
  });
};

module.exports = {
  addRoutes
};
