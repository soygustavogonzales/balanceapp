connection = require('./model/divercity/divercity.connection.js');

var modelArticle = new Object();

modelArticle.getArticles = function(callback){
		if(connection){
			connection.query("SELECT * FROM ARTICLES ORDER BY id",function(err,rows){
			if(err)	{console.log(err.message);}
			else callback(null,rows);
		})
	}
}