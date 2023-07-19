const dailyexpendituremodel = require("../models/dailyexpenditure");
const expensehead = require("../models/expensehead");
const openingbalance = require("../models/openingbalance");

const getdailyexpenditure = async (req, res) => {
  const usermail = req.session.usermail;
  await expensehead.find({ mail: usermail }).then((data) => {
    console.log(data);
    res.render("dailyexpenditure", { data: data });
  });
};

const postdailyexpenditure = async (req, res) => {
  usermail = req.session.usermail;
  name = req.body.name;
  amount = req.body.amount;
  description = req.body.description;
  const date = req.body.date;

  const data = await dailyexpendituremodel({
    name: name,
    mail: usermail,
    amount: amount,
    description: description,
    date: date,
  });

  try {
    await data.save();


    const openingBalance = await openingbalance.findOne({
      mail: usermail,
      date: date,
    });

    if (openingBalance) {
      openingBalance.balance -= parseInt(amount);
      openingBalance.totalexpense += parseInt(amount);
      await openingBalance.save();
    } else {
      const previousDate = new Date(date);
      previousDate.setDate(previousDate.getDate() - 1);
      const formattedDate =
        previousDate.getFullYear() +
        "-" +
        (previousDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        previousDate.getDate().toString().padStart(2, "0");

      console.log(formattedDate);

      const yesterdayBalance = await openingbalance.findOne({
        mail: usermail,
        date: formattedDate,
      });
      console.log(yesterdayBalance);
      const newOpeningBalance = new openingbalance({
        mail: usermail,
        date: date,
        balance: yesterdayBalance ? yesterdayBalance.balance - parseInt(amount) : parseInt(amount),
        yestbalance: yesterdayBalance ? yesterdayBalance.balance :0,
        totalexpense : parseInt(amount)
      });

      await newOpeningBalance.save();
    }

    console.log("daily income data saved");
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
};

module.exports = { getdailyexpenditure, postdailyexpenditure };
