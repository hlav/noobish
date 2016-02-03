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
    res.render('ventures/index', {ventures: results});
  })
});
router.get('/:id', function(req, res, next) {
  res.render('index', { title: '******this page is the: /ventures/:id page' });
});



module.exports = router;
