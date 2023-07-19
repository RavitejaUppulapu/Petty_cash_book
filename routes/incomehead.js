const express = require("express");

const { getincomehead, postincomehead } = require("../controllers/incomehead");

const route = express.Router();

route.get("/", getincomehead);

route.post("/", postincomehead);

module.exports = route;
