const express = require("express");

const { getexpensehead, postexpensehead } = require("../controllers/expensehead");

const route = express.Router();

route.get("/", getexpensehead);

route.post("/", postexpensehead);

module.exports = route;
