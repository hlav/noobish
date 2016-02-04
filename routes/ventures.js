var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

// in app.js this is: app.use('/ventures', ventures);


function Ventures(){
return knex('ventures');
}
/* GET home page. */
router.get('/', function(req, res, next) {
  Ventures().then(function (results) {
    res.render('ventures/index', {ventures: results, user: req.cookies.user});
  })
});
router.get('/:id', function(req, res, next) {
  Ventures().where('id', req.params.id).first().then(function (result) {
  res.render('ventures/show', { venture: result, title: 'show an individual venture (e.g., fishing)', user: req.cookies.user });
});
});



module.exports = router;
