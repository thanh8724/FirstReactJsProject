const initWebRoute = require("../routes/api");
const webMiddleware = (app) => {
  initWebRoute(app);
  app.use((req, res) => {
    return res.json("404");
  });
};
module.exports = webMiddleware;
