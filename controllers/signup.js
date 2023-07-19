const usermodel = require('../models/user')

const signup = (req, res) => {
    res.render('signup');
}

const signupverify = async (req, res) => {
    console.log(req.body)
    const data = usermodel({
        name: req.body.name,
        mail: req.body.email,
        password: req.body.password
    }
    )
    await data.save()
        .then(() => {
            console.log("Data saved form signup");
        })
        .catch((error) => {
            console.log("Error:", error);
        });

    res.render('login');

}

module.exports = { signup, signupverify };