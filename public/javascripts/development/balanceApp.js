"use strict";
var balanceApp;

balanceApp = angular.module('balanceApp', []);

balanceApp.value('empresa',[])

balanceApp.factory('svcBalance', ['empresa','$http',function (empresa,$http) {

	return {
		detalles:{
			rsocial:"Empresa Comercial Chernobyl S.A."
			,subTitulo:"Balanza de Comprobacion"
			,periodo:"Del 1 de Enero al 31 de Dic del año 1"
		}
		,detalleCtas:empresa
		,cargarTable:function(){
			$http.get('/partials/hojaBalance').then(function(data){
				console.log(data.data)
			},function(err){
				console.log(err.data)
			})
		}
	}

}])

balanceApp.controller('ctrlLogin',['$scope','svcBalance',function($scope,svcBalance){
	$scope.submitForm = function(){
		console.log($scope.email)
		console.log($scope.password)
		svcBalance.cargarTable();
	}
}]);



balanceApp.controller('ctrlPrincipal',['$scope','svcBalance','$timeout',function ($scope,svcBalance,$timeout){

	$scope.rsocial = svcBalance.detalles.rsocial
	$scope.subTitulo = svcBalance.detalles.subTitulo
	$scope.periodo = svcBalance.detalles.periodo

	$scope.tablaCtas = [];

	$scope.sumas = {};

	$scope.agregarCta = function(){
		
	}

	$scope.remove = function(index){	
		
	}
			

	$scope.toExcel = function(){
		$("#tableExport").btechco_excelexport({
      containerid: "tableExport"
     , datatype: $datatype.Table
   });
	}
}]);