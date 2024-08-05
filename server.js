const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client")));
const webMiddleware = require("./server/middlewares/checkRoutersWeb");
const configViewEngine = require("./server/config/viewEngine");
configViewEngine(app);

app.use(cors());
app.use((req, res, next) => {
  webMiddleware(app);
  next();
});

const port = process.env.PORT || 3080;
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
