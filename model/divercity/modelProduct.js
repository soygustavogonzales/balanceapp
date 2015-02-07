//console.log(__dirname)//MUY UTIL PARA VER LA RUTA RELATIVA
var connection = require(__dirname+'/divercity.connection.js');
var l = console.log;
var modelProduct = new Object();

modelProduct.savePictureFromNewProductByCod = function(opt){
	if(connection){

		var query = 'UPDATE producto SET fotProd = "'+opt.fotProd + '" WHERE codProd = '+opt.codProd;
		l(query)
		//var query = 'UPDATE producto SET fotProd = "/public/imgs/foto1.jpg" WHERE codProd = 1510201020';
			connection.query(query,function(err,result){
			if(err)	{
				l("error al guardar la imagen en la BD")
				l(err.message);
			}
			else{
				l(result);//arroja un array con las tuplas en formato JSON
				opt.callback(result.insertId);
			}
		})
	}

}

modelProduct.getPictureByCod = function(opt){
	if(connection){
			var query = "SELECT fotProd FROM producto WHERE idProd = "+opt.idProd;
			connection.query(query,function(err,rows){
			if(err)	
				l(err.message);
			else{
				if(rows.length>0)
					opt.callback(rows[0].fotProd);//arroja un array con las tuplas en formato JSON
				else
					opt.callback(null)
			}
		})
	}	
}

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

modelProduct.saveNewProduct = function(opt){
	if(connection){
		var query = 'INSERT INTO producto (idProd,codProd,nomProd,preProd,stoProd,idEst,idNiv) VALUES(null,'+opt.codPro +',"'+opt.nomPro+'",'+opt.prePro+','+opt.stoPro+','+opt.idEst+','+opt.idNiv+')';
		//var query = 'INSERT INTO producto (idProd,codProd,nomProd,preProd,stoProd,idEst,idNiv) VALUES(null,10101010,"osito1",45,4,1,2)';
		connection.query(query,function(err,result){
			if(err){
				l("error en el INSERT")
				l(err.message)
				opt.callback({message:false})
			}
			else{
				l("nuevo producto guardado exitosamente en la BD")
				//l(result)
				opt.callback({message:true,insertId:result.insertId})
			}

		})
	}
}
modelProduct.getProductByCod = function(opt){
	if(connection){
		var query = 'SELECT idProd,nomProd,preProd,stoProd,idEst,idNiv FROM producto WHERE codProd = '+ opt.codPro;
		connection.query(query,function(err,rows){
			if(err){
				l("error selecionando por codPro")
			}else{
				l("se encontro al producto de codigo: "+ opt.codPro)
				opt.callback(rows)
			}
		})
	}
}
module.exports =  modelProduct;