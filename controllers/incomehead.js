const incomeheadmodel = require("../models/incomehead");

const getincomehead = async (req, res) => {
  const usermail = req.session.usermail;
  await incomeheadmodel
    .find({ mail: usermail })
    .then((data) => {
      console.log("data from income head controller");
      res.render("incomehead", { data: data });
    })
    .catch((err) => {
      console.log("err from income head err", err);
    });
};

const postincomehead = async (req, res) => {
  usermail = req.session.usermail;
  name = req.body.name;
  description = req.body.description;

  const data = await incomeheadmodel({
    name: name,
    mail: usermail,
    description: description,
  });

  data
    .save()
    .then(() => {
      console.log("income head data saved");
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getincomehead, postincomehead };
