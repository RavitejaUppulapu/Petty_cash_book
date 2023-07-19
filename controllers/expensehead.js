const expenseheadmodel = require("../models/expensehead");

const getexpensehead = async (req, res) => {
  const usermail = req.session.usermail;
  await expenseheadmodel
    .find({ mail: usermail })
    .then((data) => {
      console.log("data from expense head controller");
      res.render("expensehead", { data: data });
    })
    .catch((err) => {
      console.log("err from expense head err", err);
    });
};

const postexpensehead = async (req, res) => {
  usermail = req.session.usermail;
  name = req.body.name;
  description = req.body.description;

  const data = await expenseheadmodel({
    name: name,
    mail: usermail,
    description: description,
  });

  data
    .save()
    .then(() => {
      console.log("expense head data saved");
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getexpensehead, postexpensehead };
