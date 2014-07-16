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
	 res.render(("%d.jade",page),{
  	pretty:true
  });
})

router.get('/partials/:page',function(req,res){
	var page = req.params.page;
	console.log("the page : "+page)
	console.log(__dirname+'/'+page+'.jade')

/*
	res.render((__dirname+'/%d.jade',page),{
		pretty:true
	})
*/
	res.render(__dirname+'../views/partials/'+page+'.jade')
})


module.exports = router;
