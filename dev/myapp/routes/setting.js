const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

/* url for requiring user access token */
const google_reqToken_url = require('../app_modules/cpgoogle/google_auth')();
// const dropbox_reqToken_url = require('../app_modules/cpdropbox/dropbox_auth')();
// const box_reqToken_url = require('../app_modules/cpbox/box_auth')();



/* GET dynamic pages */
router.get('/page-setting-drive', function(req, res, next) {
  if (!req.isAuthenticated())
    res.redirect('/login');
  else
    return next();
}, function(req, res, next) {
  res.render('page-setting-drive',{
    google_url: google_reqToken_url
    // ,dropbox_url: dropbox_reqToken_url,
    // box_url: box_reqToken_url
  });
});




module.exports = router;
