var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');
var l = console.log;
var read = fs.readFileSync;
//l(__dirname)
var modelProduct = require('../model/divercity/modelProduct.js')

/* GET home page. */
var home = function(req,res){
    var isMovile = userAgent(req).isMovile()
    data = {
      pretty:true,
      isMovile:isMovile
    }
    if(req.session.user){
      console.log("ya existe session de: "+ req.session.user.email)
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
      //res.render('index',data);
      //var users = ['geddy', 'neil', 'alex'];
      //console.log(ejs)
      //console.log(ejs.compile('<%= users %>')({users:users}))
      //console.log(ejs.compile(read('./views/web/index.ejs','utf-8'))())
      res.send(ejs.compile(read('./views/web/index.ejs','utf-8'))())
    }
}

var otherPages = function(req,res){

  var isMovile = userAgent(req).isMovile()
  var page = req.params.page;
  var data = {}
    console.log("the page pages request:",page)
    switch(true){
      case(page.toString()=="hojaBalance"):
            data = {
              user:{
                email:"admin@gmail.com"
              }
            }
            console.log(data)
           res.render(("%d.jade",page),data);
      break;
      default:
        /*Verificamos que la ruta sea la correcta con fs.stat*/
        fs.stat('./views/'+page+'.jade',function(err,stats){

          if(err){
            l(err)
            res.redirect('/');      
          }else{
            if(stats.isFile()){//verificamos que sea un archivo
              console.log(page)
              data = {
                user:{
                  email:"admin@gmail.com"
                }
              }
              res.render(("%d.jade",page),data)
            }else{
              res.redirect('/');      
            }
          }
        })
    }

}

var partials = function(req,res){

  var page = req.params.page;
  var data = {}
  var isMovile = userAgent(req).isMovile()
  data = {
    user:{
      email:"admin@gmail.com"
    }
  } 

  switch(true){
    case (page=="objectBoardApp"):
      /*Solo se puede acceder a esta pagina si se esta loggeado*/
        res.render('partials/'+page,data);
    break;
    default:
      res.render('partials/'+page,data);
  }
  console.log("the page partials request:",page)

}


var userAgent_ = function(req,res){

  if(req.session.user){
    req.session.user.userAgent = req.body
    res.send(200,true)
  }else{
    res.send(200,false)
  }
}

var login = function(req,res){
 res.send(ejs.compile(read('./views/web/login.ejs','utf-8'))())
}
router.get('/', home);
router.get('/login',login);
router.get('/pages/:page',otherPages)
router.get('/partials/:page',partials)
router.post('/userAgent',userAgent_)//lanza error(?) cuando se usa una fuincion con el mismo nombre que la ruta.


module.exports = router;
