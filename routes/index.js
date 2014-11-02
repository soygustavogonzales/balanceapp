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

  if(req.session.user){
    console.log("ya existe session de: "+ req.session.user.email)
    /*
    */
      if(!isMovile&&req.session.user.userAgent&&req.session.user.userAgent.widthScreen&&req.session.user.userAgent.heightScreen){
          var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
          data = extend(data,{
                    ancho:ancho,
                    alto:alto
                  })
      }
        data = extend(data,{
           user:{
                  email:req.session.user.email
                },
        })
    res.redirect('/pages/hojaBalance')
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
      if(req.session.user)
        data = {
            user:{
              email:req.session.user.email
            }
          }
    }
	 res.render(("%d.jade",page),data);
   /*
  if(req.session.user){
  }else{
    res.redirect('/')
  }
   */
})

router.get('/partials/:page',function(req,res){
  var page = req.params.page;
  var data = {pretty:true}
  var isMovile = userAgent(req).isMovile()

  switch(true){
    case (page=="objectBoardApp"):
      if(req.session.user)
        if(!isMovile){
          var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
          data = extend(data,{ancho:ancho,alto:alto})
        }
    break;
  }
  console.log("the page partials request:",page)
   res.render('partials/'+page,data);
   /*
  if(req.session.user){
  }else{
   res.redirect('/')
  }
   */
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
  req.session.destroy(function(){
    console.log("session destruida!!")
    session = false;
    //res.send(200,'<a href="/">volver al index</a>')
    res.redirect('/')
  })
  //if(!session)
})

router.post('/userAgent',function(req,res){
  console.log(req.body)
  if(req.session.user)
    req.session.user.userAgent = req.body
  res.send(200,true)
})

module.exports = router;
