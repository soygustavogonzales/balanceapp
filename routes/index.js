var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var l = console.log;
//l(__dirname)
var modelProduct = require('../model/divercity/modelProduct.js')

/* GET home page. */
var home = (function(req,res){
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
      res.render('index',data);
    }
})

var otherPages = function(req,res){

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
        /*Verificamos que la ruta sea la correcta con fs.stat*/
        fs.stat('./views/'+page+'.jade',function(err,stats){
          if(err){
            l(err)
            res.redirect('/');      
          }else{
            if(stats.isFile()){//verificamos que sea un archivo
              res.render(("%d.jade",page))
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

}


var userAgent_ = function(req,res){

  if(req.session.user){
    req.session.user.userAgent = req.body
    res.send(200,true)
  }else{
    res.send(200,false)
  }
}

router.get('/', home);
router.get('/pages/:page',otherPages)
router.get('/partials/:page',partials)
router.post('/userAgent',userAgent_)//lanza error(?) cuando se usa una fuincion con el mismo nombre que la ruta.


module.exports = router;
