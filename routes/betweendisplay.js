const express = require("express");

const betweendisplay = require("../controllers/betweendisplay");

const route = express.Router();

route.post("/", betweendisplay);

module.exports = route;