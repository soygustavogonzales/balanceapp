var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var modelDispatcher = require('../model/divercity/modelDispatcher.js')
var l = console.log

var login = function(req,res){
  
  var saveSession = function(data){
    req.session.user = data
    l("Se guardaron los dayos de session")    
    //l(req.session.user)    
  }

  var userEmail = req.body.email,
  password = req.body.password;
  if(userEmail&&password){
    modelDispatcher.isUserExists({
        email:userEmail,
        callback : function(rpta){
          if(rpta){//rpta==true
            modelDispatcher.getPassword({
              email:userEmail,
              callback:function(rows){
                  if(rows[0].pasDes.toString() == password){
                    saveSession({
                      email:userEmail,
                      password:password
                    })  

                    res.send(200,true)

                  }else{
                    res.send(200,false)
                    
                  }

              }
            })
          }else{
            res.send(200,false)

          }
        }
      })
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
    res.redirect('/')
  })
  
}

router.post('/login',login)
router.get('/logout',logout)


module.exports = router;
