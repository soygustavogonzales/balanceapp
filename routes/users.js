var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var l = console.log

var login = function(req,res){
  var userEmail = req.body.email,
  password = req.body.password;

  if(userEmail == "root@gmail.com" && password == "12345"){
    console.log("loggeo correcto de: "+ userEmail)

    req.session.user = {
      email:userEmail,
      password:password,
      status:true
    }

    res.send(200,true)

  }
  res.send(200,false)
}

var logout = function(req,res){
  var session = true;
  req.session.destroy(function(){
    console.log("session destruida!!")
    session = false;
    //res.send(200,'<a href="/">volver al index</a>')
    res.redirect('/')
  })
  //if(!session)
  
}

router.post('/login',login)
router.get('/logout',logout)


module.exports = router;
