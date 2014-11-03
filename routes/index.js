var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
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
  var isMovile = userAgent(req).isMovile()
  var page = req.params.page;
  var data = {}
    console.log("the page pages request:",page)
    switch(true){
      case(page.toString()=="hojaBalance"):
          if(req.session.user){
            data = {
              user:{
                email:req.session.user.email
              }
            }
           res.render(("%d.jade",page),data);
          }
          else{
           res.redirect('/');
          }

      break;
      default:
        //res.render(("%d.jade",page),data);
        fs.stat('./views/'+page+'.jade',function(err,stats){
          ///media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/angular-webapp/views/
          if(err){
            l(err)
            res.redirect('/');      
          }else{
            if(stats.isFile()){
              res.render(("%d.jade",page))
            }else{
              res.redirect('/');      
            }
          }
        })
    }
})

router.get('/partials/:page',function(req,res){
  var page = req.params.page;
  var data = {}
  var isMovile = userAgent(req).isMovile()

  switch(true){
    case (page=="objectBoardApp"):
      /*Solo se puede acceder a esta pagina si se esta loggeado*/
      if(req.session.user){//si esta loggeado
        if(!isMovile){//esPc
          var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
          data = extend(data,{ancho:ancho,alto:alto})
        }
        
        res.render('partials/'+page,data);
      }else{
        res.redirect('/')
      }
    break;
    default:
      res.render('partials/'+page,data);
  }
  console.log("the page partials request:",page)
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
