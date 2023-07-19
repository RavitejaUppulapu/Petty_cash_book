const mongoose = require("mongoose");

const dailyincomeschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
});

const dailyincomemodel = mongoose.model("dailyincome", dailyincomeschema);

module.exports = dailyincomemodel;
