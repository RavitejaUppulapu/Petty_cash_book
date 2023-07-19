const mongoose = require("mongoose");

const openbalanceschema = mongoose.Schema({
  mail: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    default: 0,
    require: true,
  },
  yestbalance: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  totalincome:{
    type:Number,
    default:0,
    require:true
  },
  totalexpense:{
    type:Number,
    default:0,
    require:true
  }
});

const openbalancemodel = mongoose.model("openingbalance", openbalanceschema);

module.exports = openbalancemodel;
