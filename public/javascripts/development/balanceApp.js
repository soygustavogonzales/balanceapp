"use strict";
var balanceApp;

balanceApp = angular.module('balanceApp', []);

balanceApp.controller('ctrlCLeft', ['$scope','cuentas', function ($scope,cuentas) {//contentLeft oontroller
	$("#menu").sidr({//activo el contenido responsive lateral movible
		source:'#left-content'
		,renaming:false
	})
	$scope.rsocial = cuentas.detalles.rsocial
	console.log($scope.rsocial);
	$scope.subTitulo = cuentas.detalles.subTitulo
	console.log($scope.subTitulo);
	$scope.periodo = cuentas.detalles.periodo
	console.log($scope.periodo);
}])
balanceApp.controller('ctrlCuentas', ['$scope','cuentas', function ($scope,cuentas) {
	$scope.rsocial = cuentas.detalles.rsocial
	$scope.subTitulo = cuentas.detalles.subTitulo
	$scope.periodo = cuentas.detalles.periodo
}])
balanceApp.factory('cuentas', [function () {
	return {
		detalles:{
			rsocial:"Empresa Comercial Chernobyl S.A."
			,subTitulo:"Balanza de Comprobacion"
			,periodo:"Del 1 de Enero al 31 de Dic del año 1"
		}
		,cuentas:[
		]
	};
}])