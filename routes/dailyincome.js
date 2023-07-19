const express = require("express");

const {
  getdailyincome,
  postdailyincome,
} = require("../controllers/dailyincome");

const route = express.Router();

route.get("/", getdailyincome);

route.post("/", postdailyincome);

module.exports = route;
