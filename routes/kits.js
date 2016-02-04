var express = require('express');
var router = express.Router();
var knex = require('../db/knex')


router.get('/new', function(req, res, next){
  res.render('kits/new')
})

module.exports = router;
