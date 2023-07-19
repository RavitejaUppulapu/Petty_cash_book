const express = require("express");

const sortmonthlydisplay = require("../controllers/sortmonthlydisplay");

const route = express.Router();

route.post("/:sort/:month", sortmonthlydisplay);

module.exports = route;
