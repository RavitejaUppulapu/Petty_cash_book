const mongoose = require("mongoose");

const dailyexpenditureschema = mongoose.Schema({
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

const dailyexpendituremodel = mongoose.model(
  "dailyexpenditure",
  dailyexpenditureschema
);

module.exports = dailyexpendituremodel;
