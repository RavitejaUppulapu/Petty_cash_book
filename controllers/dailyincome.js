const dailyincomemodel = require("../models/dailyincome");
const incomehead = require("../models/incomehead");
const openingbalance = require("../models/openingbalance");

const getdailyincome = async (req, res) => {
  const usermail = req.session.usermail;
  const data = await incomehead.find({ mail: usermail });
  res.render("dailyincome", { data: data });
};

const postdailyincome = async (req, res) => {
  const usermail = req.session.usermail;
  const name = req.body.name;
  const amount = req.body.amount;
  const description = req.body.description;
  const date = req.body.date;

  const data = new dailyincomemodel({
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
      openingBalance.balance += parseInt(amount);
      openingBalance.totalincome += parseInt(amount);

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


      console.log(usermail, formattedDate)
      const yesterdayBalance = await openingbalance.findOne({
        mail: usermail,
        date: formattedDate,
      });
      const newOpeningBalance = new openingbalance({
        mail: usermail,
        date: date,
        balance: yesterdayBalance ? yesterdayBalance.balance + parseInt(amount) : parseInt(amount),
        yestbalance: yesterdayBalance ? yesterdayBalance.balance :0,
        totalincome : parseInt(amount)
      });

      await newOpeningBalance.save();
    }
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
};

module.exports = { getdailyincome, postdailyincome };
