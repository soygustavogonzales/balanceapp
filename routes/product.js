var express = require('express');
var userAgent = require('../modules/device.js');
var extend = require('extend');
var router = express.Router();
var fs = require('fs');
var modelProduct = require('../model/divercity/modelProduct.js')
var modelEstanteLevel = require('../model/divercity/modelEstanteLevel.js')
var multiparty = require('multiparty');
var l = console.log

 
var savePicture = function(req,res){
	l("upload picture...")
	var form = new multiparty.Form();
	form.parse(req,function(err,fields,files){
		var count = 0;
		if(files)
			for(file in files){
				count++;
				var temPath = files[file][0].path;
				var name = file;
				var typeFile = files[file][0].headers['content-type'];
				var result = typeFile.match(/(jpg)|(png)|(jpeg)/ig);//result is a Array
				if(result.length>0){

						var ext = (result&&result.length>0)?result[0]:'';

						fs.readFile(temPath,function(err,data){
								var path = "./public/images/productos/"+name + '.'+ext;
								fs.writeFile(path,data,function(err){
									if(err){
										l(err)
										res.send(200,false)
									}else{
										res.send(200,true)
										var opt = {
											fotProd:path,
											codProd:name,
											callback:function(rpta){
												l("upload Succes")
											}
										}
										modelProduct.savePictureFromNewProductByCod(opt)
									}
								})
						});
				}else{
					res.send(200,false)
				}
			if(count>0)break;//para que solo recoja a la primera imagen
		}
	})
}

var saveNewProduct = function(req,res){
	if(req.body.codPro&&req.body.nomPro&&req.body.prePro&&req.body.stoPro&&req.body.idEst&&req.body.idNiv){
		var opt = {
			codPro:parseInt(req.body.codPro),
			nomPro:req.body.nomPro.toString(),
			prePro:parseFloat(req.body.prePro),
			stoPro:parseInt(req.body.stoPro),
			idEst:parseInt(req.body.idEst),
			idNiv:parseInt(req.body.idNiv),
			callback : function(rpta){
				//l(rpta)
				if(rpta.message===true){
					l("se guardo :)")
					res.send(200,true)
				}
				else{
					res.send(200,false)
				}

			}

		}
		l(opt)
		modelProduct.saveNewProduct(opt)
	}else
		res.send(200,false)
}
var searchProductByCod_ = function(req,res){
	var opt = {
		codPro:parseInt(req.body.codPro),
		callback:function(rows){
			//l(rows[0])
			if(rows.length>0){
				var data = rows[0]
				modelEstanteLevel.getNameEstanteById({idEst:data.idEst,
					callback:function(estante){
						data.denEst = estante
						modelEstanteLevel.getNameLevelById({idNiv:data.idNiv,
							callback:function(nivel){
								data.denNiv = nivel
								opt = {
									idProd:parseInt(data.idProd),
									callback:function(fotProd){
										if(fotProd)
											data.fotProd = fotProd
										else
											data.fotProd = "./public/images/loader.gif";
										l(data)
										res.json(200,data)
									}
								}
										
								modelProduct.getPictureByCod(opt);

						}})
				}})
			
		}
			else
				res.send(200,false)

		}
	}

	modelProduct.getProductByCod(opt)
}



var searchAllEstantes_ = function(req,res){
	var opt = {
		callback:function(rows){
			if(rows){
			l(rows)
				res.json(200,rows)
			}else{
				res.send(200,false)
			}
		}
	}
		modelEstanteLevel.getAllEstantes(opt)
};

var searchAllLevels_ = function(req,res){
	var opt = {
		callback:function(rows){
			if(rows){
			l(rows)
				res.json(200,rows)
			}else{
				res.send(200,false)
			}
		}
	}
		modelEstanteLevel.getAllLevels(opt)
};

var searchAllCategories_ = function(req,res){
	var opt = {
		callback:function(rows){
			if(rows){
			l(rows)
				res.json(200,rows)
			}else{
				res.send(200,false)
			}
		}
	}
		modelEstanteLevel.getAllCategories(opt)
};

router.post('/save',saveNewProduct);
router.post('/savePicture',savePicture);
router.post('/searchProductByCod',searchProductByCod_);
router.get('/searchAllEstantes',searchAllEstantes_);
router.get('/searchAllLevels',searchAllLevels_);
router.get('/searchAllCategories',searchAllCategories_);

module.exports = router;
