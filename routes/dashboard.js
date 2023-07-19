const express = require('express');

const dashboard = require('../controllers/dashboard')

const route = express.Router();

route.get('/',dashboard)

module.exports = route