const mongoose = require("mongoose");

const incomeheadschema = mongoose.Schema({
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

const incomeheadmodel = mongoose.model("incomehead", incomeheadschema);

module.exports = incomeheadmodel;
