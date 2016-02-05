var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var fetchASIN = require('../public/js/amazonApi.js')
var fetchItem = require('../public/js/amazonApiItem.js')

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
    res.render('kits/new', {result: result, user: req.cookies.user, ven: req.params.ven_id, bin: req.params.bin_id})
  })
})

router.post('/ventures/:ven_id/bins/:bin_id/kits', function(req, res, next){
  var asin = req.body.asin;
  var binish = req.body.bin
  var brand = req.body.brand1
  if (brand !== undefined){
    var query = req.body.brand1 + req.body.name1
    fetchItem(query, function (itemData) {
      console.log("*****DATA***");
      console.log(itemData);
      var obj = {}
      obj.item = itemData.productName
      obj.url = itemData.url
      obj.asin = itemData.asin
      obj.image = itemData.img
      obj.price = itemData.lowPrice
      obj.bin_id = binish
      Kits().insert(obj).then(function(result){
        res.redirect('/ventures/' + req.params.ven_id + '/bins/' + binish)
      })
    })
  }
  else{
    fetchASIN(asin, function (itemData) {
      console.log("*****DATA***");
      console.log(itemData);
      var obj = {}
      obj.item = itemData.productName
      obj.url = itemData.url
      obj.asin = itemData.asin
      obj.image = itemData.img
      obj.price = itemData.lowPrice
      obj.bin_id = binish
      Kits().insert(obj).then(function(result){
        res.redirect('/ventures/' + req.params.ven_id + '/bins/' + binish)
      })
    })
  }
})


router.get('/ventures/:ven_id/bins/:bin_id/kits/edit', function (req, res, next) {
  Kits().where('bin_id', req.params.bin_id).then(function (result) {
    res.render('kits/edit', {kits: result})
  })
})

router.post('/ventures/:ven_id/bins/:bin_id/kits/:id/delete', function (req, res, next) {
  Kits().where('id', req.params.id).del().then(function (result) {
    res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id+'/kits/edit')
  })
})


module.exports = router;
