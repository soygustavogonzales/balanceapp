var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var l = console.log

/* GET home page. */
router.get('/', function(req, res) {

  var isMovile = userAgent(req).isMovile()
  data = {
    pretty:true,
    isMovile:isMovile
  }

  if(req.session.user&&req.session.user.status){
    console.log("ya existe session de: "+ req.session.user.email)
    var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
        data = extend(data,{
                  user:{
                    email:req.session.user.email
                  },
                  ancho:ancho,
                  alto:alto
                })
    res.render('hojaBalance',data)
  }
  else{
    console.log("sesion nueva")
    res.render('index',data);
  }
});

router.get('/pages/:page',function(req,res){
	var page = req.params.page;
  var data = {}
		console.log("the page pages request:",page)
    if(page=="hojaBalance"){
      if(req.session.user&&req.session.user.status)
        data = {
            user:{
              email:req.session.user.email
            }
          }
    }
	 res.render(("%d.jade",page),data);
})

router.get('/partials/:page',function(req,res){
	var page = req.params.page;
  var data = {pretty:true}
  switch(true){
    case (page=="objectBoardApp"):
      if(req.session.user&&req.session.user.status)
        var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
        //alto = (alto<600)?parseInt(alto)+100:alto;
        data = {ancho:ancho,alto:alto}
    break;
  }
	console.log("the page partials request:",page)
	res.render('partials/'+page,data);
})

router.post('/users/login',function(req,res){
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

})

router.get('/users/logout',function(req,res){
  var session = true;
  req.session.user.status = false;
  req.session.destroy(function(){
    console.log("session destruida!!")
    session = false;
    //res.send(200,'<a href="/">volver al index</a>')
    res.render('index')
  })
  //if(!session)
})

router.post('/userAgent',function(req,res){
  console.log(req.body)
  if(req.session.user&&req.session.user.status)
    req.session.user.userAgent = req.body
  res.send(200,true)
})

module.exports = router;
