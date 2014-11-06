//console.log(__dirname)//MUY UTIL PARA VER LA RUTA RELATIVA
var connection = require(__dirname+'/divercity.connection.js');
var l = console.log;
var modelDispatcher = new Object();

modelDispatcher.getAllDispatchers = function(opt){
		if(connection){
			connection.query("SELECT * FROM despachador",function(err,rows){
				if(err)	
					l(err.message);
				else
					opt.callback(rows);//arroja un array con las tuplas en formato JSON
			})
		}
}


modelDispatcher.getPassword = function(opt){
	if(connection){
		var email = opt.email;
		var query = ('SELECT pasDes FROM despachador WHERE UPPER(corDes) = UPPER("'+email+'")');
			connection.query(query,function(err,rows){
				if(err){
					l(err.message);
				}
				else {
					//l(rows);
					opt.callback(rows);
				}
			})
	
	}
}

modelDispatcher.isUserExists = function(opt){
	if(connection){
		//l(connection.escape(opt.email))
		var email = opt.email;
		var query = ('SELECT idDes FROM despachador WHERE UPPER(corDes) = UPPER("'+email+'")');
			connection.query(query,function(err,rows){
				if(err){
					l(err.message);
					opt.callback(false)
					throw err
				}
				else {
					//l(rows)
					if(rows.length>0)
						opt.callback(true);
					else
						opt.callback(false);
				}	
			})
	}
}


module.exports =  modelDispatcher;