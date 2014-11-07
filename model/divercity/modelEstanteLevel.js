//console.log(__dirname)//MUY UTIL PARA VER LA RUTA RELATIVA
var connection = require(__dirname+'/divercity.connection.js');
var l = console.log;
var modelEstanteLevel = new Object();

modelEstanteLevel.getNameEstanteById = function(opt){
		if(connection){
			var query = 'SELECT denEst FROM estante WHERE idEst = '+opt.idEst;
			connection.query(query,function(err,rows){
				if(err){
					l("err en estante")
					l(err.message);
				}
				else{
					opt.callback(rows[0].denEst);//arroja un array con las tuplas en formato JSON
				}
			})
	}
}
modelEstanteLevel.getNameLevelById = function(opt){
		if(connection){
			var query = 'SELECT denNiv FROM nivel WHERE idNiv = '+opt.idNiv;
			connection.query(query,function(err,rows){
			if(err)	{
				l("err en nivel")
				l(err.message);
			}
			else{
				opt.callback(rows[0].denNiv);//arroja un array con las tuplas en formato JSON
			}
		})
	}
}

modelEstanteLevel.getAllEstantes = function(opt){
	if(connection){
			var query = 'SELECT idEst,denEst FROM estante';
			connection.query(query,function(err,rows){
			if(err)	{
				l("err al obtener todos los estatantes")
				l(err.message);
			}
			else{
				opt.callback(rows);//arroja un array con las tuplas en formato JSON
			}
		})
	}
}

modelEstanteLevel.getAllLevels = function(opt){
	if(connection){
			var query = 'SELECT idNiv,denNiv FROM nivel';
			connection.query(query,function(err,rows){
			if(err)	{
				l("err al obtener todos los niveles")
				l(err.message);
			}
			else{
				opt.callback(rows);//arroja un array con las tuplas en formato JSON
			}
		})
	}
}

modelEstanteLevel.getAllCategories = function(opt){
	if(connection){
			var query = 'SELECT idCat,denCat FROM categoria';
			connection.query(query,function(err,rows){
			if(err)	{
				l("err al obtener todos las categoriaa")
				l(err.message);
			}
			else{
				opt.callback(rows);//arroja un array con las tuplas en formato JSON
			}
		})
	}
}
module.exports =  modelEstanteLevel;