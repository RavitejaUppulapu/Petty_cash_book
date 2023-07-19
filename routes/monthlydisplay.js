const express = require("express");

const monthlydisplay = require("../controllers/monthlydisplay");

const route = express.Router();

route.post("/", monthlydisplay);

module.exports = route;
