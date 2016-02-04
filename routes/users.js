var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Users(){
  return knex('users');
}

router.get('/:anything', function(req, res, next) {
  console.log('hitting middleware');
  if (req.cookies.username){
    next();
  } else {
    res.redirect("auth/signin");
  }
});

router.post('/users', function(req, res, next) {
  Users().insert(req.body).then(function(val){
    res.cookie("username", req.body.username);
    res.redirect("/");
  });
});

router.get('/search', function (req, res, next) {
  res.render('search');
});

router.post('/users/login', function(req, res, next) {
    Users().where({username: req.body.username, password: req.body.password}).first().then(function(found){
       if (found){
         res.cookie("username", req.body.username);
         res.redirect("/");
       } else {
         res.redirect("/signin", {error: 'incorrect credentials'});
       }
    })
});

router.post('/users/uName', function(req, res, next){
  Users().where('id', req.body.userId).update('username', req.body.uName).then(function(results){
    res.redirect('/')
  })
})


module.exports = router;
