var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Bins(){
return knex('bins');
};

function Ventures(){
return knex('ventures');
}

router.get('/:ven_id/bins', function(req, res, next) {
  Bins().where('venture_id', req.params.ven_id).then(function (results) {

  res.render('bins/index', { title: 'WELCOME TO THE BIN INDEX PAGE', ventu_id: req.params.ven_id, bins: results });
  })
});

router.get('/:ven_id/bins/new', function(req, res, next) {
  Ventures().where('id', req.params.ven_id).first().then(function (result) {
  res.render('bins/new', {venture: result, user: req.cookies.user});
  })
});

router.get('/:ven_id/bins/:id', function(req, res, next) {
  Bins().where('id', req.params.id).first().then(function (result) {
  // console.log(result);
  res.render('bins/show', { title: 'WELCOME TO THE BIN SHOW PAGE', bin: result });
  })
});

router.get('/:ven_id/bins/:id/edit', function(req, res, next) {
  Bins().where('id', req.params.id).first().then(function (result) {
  // console.log(result);
  res.render('bins/edit', { title: 'WELCOME TO EDIT PAGE', bin: result });
  })
});



router.post('/:ven_id/bins', function(req, res, next) {
  Bins().insert(req.body).then(function(result){
    res.redirect('/ventures/'+ req.params.ven_id +'/bins');
  });
});


router.post('/:ven_id/bins/:id', function (req, res, next) {
  Bins().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/ventures/:ven_id/bins');
  });
});

router.post('/:ven_id/bins/:id/delete', function (req, res, next) {
  Bins().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/ventures');
  })
})

module.exports = router;
