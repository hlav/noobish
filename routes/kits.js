var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Bins(){
return knex('bins');
};

function Ventures() {
  return knex('ventures');
};

function Kits(){
return knex('kits');
};

router.get('/ventures/:ven_id/bins/:bin_id/kits/new', function(req, res, next){
  Bins().where('id', req.params.bin_id).first().then(function(result){
    res.render('kits/new', {title: result.title, user: req.cookies.user})
  })
})

router.get('/ventures/:ven_id/bins/:bin_id/kits/edit', function (req, res, next) {
    Kits().where('bin_id', req.params.bin_id).then(function (result) {
      res.render('kits/edit', {kits: result})
  })
})

router.post('/ventures/:ven_id/bins/:bin_id/kits/:id/delete', function (req, res, next) {
  // Ventures().where('id', req.params.ven_id).first().then(function (payload) {
  //   Bins().where('id', req.params.bin_id).first().then(function (results) {
      Kits().where('id', req.params.id).del().then(function (result) {
        // res.redirect('/ventures/'+bins.venture_id+'/bins/'+kit.bin_id+'/kits/edit');
        // res.redirect('/ventures/#{bin.venture_id}/bins/#{kit.bin_id}/kits/edit')
        res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id+'/kits/edit')
      })
  //   })
  // })
})



module.exports = router;
