var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Bins(){
return knex('bins');
};

function Kits(){
return knex('kits');
};

router.get('/ventures/:ven_id/bins/:bin_id/kits/new', function(req, res, next){
  Bins().where('id', req.params.bin_id).first().then(function(result){
    res.render('kits/new', {title: result.title, user: req.cookies.user})
  })
})

module.exports = router;
