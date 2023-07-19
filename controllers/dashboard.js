const usermodel = require("../models/user");

const dashboard = async (req, res) => {
  const usermail = req.session.usermail;
  await usermodel
    .findOne({ mail: usermail })
    .then((data) => {
      res.render("dashboard", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dashboard;
