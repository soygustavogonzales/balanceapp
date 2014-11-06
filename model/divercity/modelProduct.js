//console.log(__dirname)//MUY UTIL PARA VER LA RUTA RELATIVA
var connection = require(__dirname+'/divercity.connection.js');
var l = console.log;
var modelProduct = new Object();

modelProduct.getAllProducts = function(callback){
		if(connection){
			connection.query("SELECT * FROM producto",function(err,rows){
			if(err)	
				l(err.message);
			else
				l(rows);//arroja un array con las tuplas en formato JSON
		})
	}
}

module.exports =  modelProduct;