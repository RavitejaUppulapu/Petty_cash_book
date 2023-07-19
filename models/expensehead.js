const mongoose = require("mongoose");

const expenseheadschema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  mail: {
    type: String,
    require: true,
  },
});

const expenseheadmodel = mongoose.model("expensehead", expenseheadschema);

module.exports = expenseheadmodel;
