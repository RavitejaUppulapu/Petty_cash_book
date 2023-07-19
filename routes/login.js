//importing required packages and modules
const express = require('express');
const app = express();
const route = express.Router();
const session= require('express-session')


const { login, loginverify, logout } = require('../controllers/login');
const { signup, signupverify } = require('../controllers/signup');


const isAuth = (req, res, next) => {
  if (req.session && req.session.isAuth) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

//login routes
route.get('/login',isAuth,login)
route.post('/login', isAuth, loginverify)
route.get('/logout',logout)


//signin routes
route.get('/signup',isAuth,signup)
route.post('/signup', isAuth, signupverify)


module.exports = route;