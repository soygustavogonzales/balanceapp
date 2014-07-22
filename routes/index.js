var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{
  	pretty:true
  });
});

router.get('/pages/:page',function(req,res){
	var page = req.params.page;
		console.log("the page pages request:",page)
	 res.render(("%d.jade",page),{
  	pretty:true
  });
})

router.get('/partials/:page',function(req,res){
	var page = req.params.page;
  var data = {pretty:true}
  switch(true){
    case (page=="objectBoardApp"):
      if(req.session.user&&req.session.user.status)
        var ancho = req.session.user.userAgent.widthScreen,alto = req.session.user.userAgent.heightScreen;
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

router.post('/userAgent',function(req,res){
  console.log(req.body)
  if(req.session.user&&req.session.user.status)
    req.session.user.userAgent = req.body
  res.send(200,true)
})

module.exports = router;
