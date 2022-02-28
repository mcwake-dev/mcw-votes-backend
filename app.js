const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { handleServerErrors, handleCustomErrors } = require("./errors");
const apiRouter = require("./routes/api.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use("", (req, res, next) => next({ status: 404, msg: "Not found" }));
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
