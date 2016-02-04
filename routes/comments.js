var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Ventures(){
return knex('ventures');
}

function Comments(){
return knex('comments');
}

function Bins(){
return knex('bins');
};
function Users(){
return knex('users');
};

// app.use('/ventures', comments);

// router.get('/:ven_id/bins/:bin_id/comments', function (req, res, next) {
//   Ventures().where('id', req.params.ven_id).first().then(function(result){
//     Bins().where('id', req.params.bin_id).first().then(function(resultB){
//       knex('comments')
//   .join('users', 'comments.user_id', '=', 'users.id')
//   .select().then(function (resultJ) {
//     res.render('comments/index', {venture: result, bin: resultB, joins: resultJ});
// })
// })
// });
// });

router.get('/:ven_id/bins/:bin_id/comments/new', function (req, res, next) {
  Users().where('id', req.cookies.user).first().then(function (result) {
    console.log(result);
    var local = {venture_id: req.params.ven_id,
      bin_id: req.params.bin_id};
        console.log(local);
      res.render('comments/new', {local: local, user: result});
    })
  })

// router.post('/:ven_id/bins/:bin_id/comments', function(req, res, next) {
//
//   Comments().insert(req.body).then(function(result){
//     res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id);
//   });
// });
//
// router.post('/:ven_id/bins/:bin_id/comments/:id', function (req, res, next) {
//   Comments().where('id', req.params.id).update(req.body)
//   .then(function(result){
//     res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id);
//   });
// });
//
// router.post('/:ven_id/bins/:bin_id/comments/:id/delete', function (req, res, next) {
//   Comments().where('id', req.params.id).del()
//   .then(function (result) {
//     res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id);
//   })
// })



module.exports = router;
