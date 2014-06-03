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
	console.log(req.params.page);
	var page_ = req.params.page
	res.render('/partials/%d',page_)
})

module.exports = router;
