var express = require('express');
var router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');

// This app has no "home" page, but your projects should 😀
router.get('/', function (req, res, next) {
fetch(`https://besttime.app/api/v1/keys/pri_0911a667a651411380c07cb2e1a74161`, {
  method: 'GET'
}).then(res => res.text()).then(function(data) { console.log(data); });

  res.redirect('/movies');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/movies',
    failureRedirect: '/movies'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    console.log('logged out!')
    res.redirect('/movies');
  });
});

module.exports = router;
