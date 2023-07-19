const balance = require("../models/openingbalance");

const monthlydisplay = async (req, res) => {
  const month = req.body.month;
  const mail = req.session.usermail;

  const documents = await balance
    .find({ mail: mail, date: { $regex: `-${month}-` } })
    .sort({ date: 1 });

  let monthString = "";  // Variable to store the month string

  switch (month) {
    case "01":
      monthString = "January";
      break;
    case "02":
      monthString = "February";
      break;
    case "03":
      monthString = "March";
      break;
    case "04":
      monthString = "April";
      break;
    case "05":
      monthString = "May";
      break;
    case "06":
      monthString = "June";
      break;
    case "07":
      monthString = "July";
      break;
    case "08":
      monthString = "August";
      break;
    case "09":
      monthString = "September";
      break;
    case "10":
      monthString = "October";
      break;
    case "11":
      monthString = "November";
      break;
    case "12":
      monthString = "December";
      break;
    default:
      monthString = "Invalid month";
      break;
  }

  res.render("monthlydisplay", { documents: documents, month: monthString , monthnum : month});
};

module.exports = monthlydisplay;
