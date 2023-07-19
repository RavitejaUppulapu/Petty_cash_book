const express = require("express");

const postdailydisplay = require("../controllers/dailydisplay");

const route = express.Router();

route.post("/", postdailydisplay);

module.exports = route;
