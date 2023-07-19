const express = require("express");

const {
  getdailyexpenditure,
  postdailyexpenditure,
} = require("../controllers/dailyexpenditure");

const route = express.Router();

route.get("/", getdailyexpenditure);

route.post("/", postdailyexpenditure);

module.exports = route;
