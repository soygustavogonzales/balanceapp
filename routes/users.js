var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var modelDispatcher = require('../model/divercity/modelDispatcher.js')

var l = console.log

var login = function(req,res){
  var userEmail = req.body.email,
  password = req.body.password;
  if(userEmail&&password){
    req.session.user = {
      email:userEmail,
      password:password
    }
    l(req.session.user)
    res.send(200,true)    
  }
  else{
    res.send(200,true)
  }

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
