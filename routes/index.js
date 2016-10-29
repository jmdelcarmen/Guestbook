'use strict';
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();


var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

///////////////////////////////////////////////////////////
////////////////////////HOME PAGE//////////////////////////
///////////////////////////////////////////////////////////
router.route('/').get((req, res) => {
  res.render('index');
}).post((req, res) => {
//Home page post///
});

///////////////////////////////////////////////////////////
/////////////////////////LOGIN////////////////////////////
///////////////////////////////////////////////////////////
router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/guestbook');
  });


module.exports = router;
