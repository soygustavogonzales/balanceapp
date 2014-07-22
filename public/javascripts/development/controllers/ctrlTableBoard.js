boardApp.controller('ctrlTableBoard',['$scope','svcCliente','$timeout',function ($scope,svcCliente,$timeout){

	$scope.rsocial = svcCliente.clientDatos.rsocial
	$scope.lema = svcCliente.clientDatos.lema
	$scope.fecha = svcCliente.clientDatos.fecha
	$scope.html = svcCliente.contentHtml
	$scope.tablaVentas = [];
	var userDevice = JSON.parse(localStorage.balanceApp)
	$scope.userDevice = userDevice

	console.log("cargo el controller ctrlPrincipal")

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
	
}]);