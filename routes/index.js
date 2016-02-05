var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Ventures(){
return knex('ventures');
};

/* GET home page. */
//
// router.get('/ventures/auth/signin', function(req, res, next) {
//   res.render('auth/signin');
// });

router.get('/', function(req, res, next) {
  Ventures().then(function (results) {

    res.render('ventures/index', {ventures: results, user: req.cookies.user});
  })
});


module.exports = router;
