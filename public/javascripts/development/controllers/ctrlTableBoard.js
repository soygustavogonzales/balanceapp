boardApp.controller('ctrlTableBoard',['$scope','svcCliente','$timeout','$http',function ($scope,svcCliente,$timeout,$http){

	$scope.rsocial = svcCliente.clientDatos.rsocial
	$scope.lema = svcCliente.clientDatos.lema
	$scope.fecha = svcCliente.clientDatos.fecha
	$scope.html = svcCliente.contentHtml
	$scope.tablaVentas = [];
	$scope.imageNewArticle = "/images/loader.gif"
	var userDevice = JSON.parse(localStorage.balanceApp)
	$scope.userDevice = userDevice

	//console.log("cargo el controller ctrlPrincipal")

	$scope.sumas = {};
	$scope.buscarFilter = function(){
		$scope.buscar=!$scope.buscar
		$scope.columnsRow = ($scope.columnsRow == 'col-sm-1')?'col-sm-12':'col-sm-1';
	}
	$scope.agregarVenta = function(){
		$scope.tablaVentas.push({
			nombreProducto:$scope.nombreProducto
			,precio:$scope.precio
			,cantidad:$scope.cantidad
			,cliente:$scope.cliente
		})
	}

	$scope.eliminarVenta = function(index){	
		$scope.tablaVentas.splice(index,1)
	}

	$scope.$watch('html',function(){
		if($scope.html)
			console.log($scope.html)
	})

	$scope.toExcel = function(){
		$("#tableExport").btechco_excelexport({
      containerid: "tableExport"
     , datatype: $datatype.Table
   });
	}
	$scope.swipeRight = function($event){
		console.log($event)
	}
	$scope.sendNewArticle = function(){
		//console.log($scope.formNewArticle.nameNewProduct.$modelValue) //captura el valor del campo con name= nameNewProduct
		console.log($scope.formNewArticle)
		$http.post('/product/save',{
			codPro:$scope.formNewArticle.codeNewProduct.$modelValue,
			nomPro:$scope.formNewArticle.nameNewProduct.$modelValue,
			prePro:$scope.formNewArticle.priceNewProduct.$modelValue,
			stoPro:$scope.formNewArticle.stockNewProduct.$modelValue,
			idEst:$scope.formNewArticle.estNewProduct.$modelValue.idEst,
			idNiv:$scope.formNewArticle.levelNewProduct.$modelValue.idNiv
		}).then(function(rpta){
			console.log("datos enviados")
			console.log(rpta)
			if(rpta.data===true){
				svcCliente.sendFile($('.newPicture'),
					'/product/savePicture',function(rpta){
					alert("Nuevo producto guardado exitosamente")
				})
			}else{
				alert("error al completar el envio")
			}
		}, function(data){
			console.log("error durante el envio")
			console.log(data)
		})
					

	}
	$scope.searchProductByCod = function(){
		var codPro = $scope.formSearchProduct.codSearchPro.$modelValue
		$http.post(
			'/product/searchProductByCod',
			{codPro:codPro})
		.then(
			function(rpta){
		 	if(rpta.data){
					var result = rpta.data
						console.log(result)
						$scope.nameSearchPro = result.nomProd;
						$scope.priceSearchPro = result.preProd;
						$scope.stockSearchPro = result.stoProd;
						$scope.estanteSearchPro = result.denEst;
						$scope.levelSearchPro = result.denNiv;
		 	}
				else{
					alert("no se encontro producto con el codigo: "+codPro)
				}
			},
		 function(data){
		 	if(data)
					console.log(data)

		 })
	}
	$scope.chargeEstantes = function(){
		console.log("focus est****")
		$http.get('/product/searchAllEstantes')
		.then(function(rpta){
			//console.log(rpta)
			$scope.estantes = rpta.data
		}, function(data){
			console.log("error al traer estantes")
			console.log(data)
		})
	}
	$scope.chargeCategories = function(){
		console.log("focus cat****")
		$http.get('/product/searchAllCategories')
		.then(function(rpta){
			//console.log(rpta)
			$scope.categories = rpta.data
		}, function(data){
			console.log("error al traer estantes")
			console.log(data)
		})
	}
	$scope.chargeLevels = function(){
		console.log("focus nivel****")
		$http.get('/product/searchAllLevels')
		.then(function(rpta){
			//console.log(rpta)
			$scope.levels = rpta.data
		}, function(data){
			console.log("error al traer estantes")
			console.log(data)
		})
	}
}]);