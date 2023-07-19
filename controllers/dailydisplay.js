const dailyincome = require("../models/dailyincome");
const dailyexpenditure = require("../models/dailyexpenditure");
const openingbalance = require("../models/openingbalance");

const dailydisplay = async (req, res) => {
  const usermail = req.session.usermail;
  const date = req.body.date;

  try {
    const income = await dailyincome.find({ mail: usermail, date: date });
    console.log("income:", income);

    const expense = await dailyexpenditure.find({ mail: usermail, date: date });
    console.log("expense:", expense);

    const balance = await openingbalance.findOne({
      mail: usermail,
      date: date,
    });
    console.log("balance:", balance);
    if (balance) {
      res.render("dailydisplay", {
        income: income,
        expense: expense,
        balance: balance,
        date: date,
      });
    } else {
      res.render("datanotfound");
    }
  } catch (error) {
    console.error(error);
    // Handle the error and send an appropriate response
    res.status(500).send("Error occurred while fetching data");
  }
};

module.exports = dailydisplay;
