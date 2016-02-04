var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function User(){
  return knex('users')
}
function Bins(){
  return knex('bins')
}
function Ventures(){
  return knex('ventures')
}


// router.get('/pic', function(req, res){
//
//
//   res.render('bins/pic', {user: req.cookies.user});
// });
//
//
//
//
// router.post('/pic', function(req, res){
//     // username = req.body.username;
//     // full_name = req.body.full_name;
//     // avatar_url = req.body.avatar_url;
//     // update_account(username, full_name, avatar_url); // TODO: create this function
//     // // TODO: Return something useful or redirect
//     // });
module.exports = router;
