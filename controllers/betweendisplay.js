const openingbalance = require("../models/openingbalance");

const betweendisplay = async (req, res) => {
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const usermail = req.session.usermail;
  console.log(startdate,enddate,usermail)
  try {
    const betweendata = await openingbalance.find({
      mail: usermail,
      date: { $gte: startdate, $lte: enddate },
    });
    console.log(betweendata);
    res.render("betweendisplay", { data: betweendata,startdate:startdate,enddate:enddate });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = betweendisplay;