"use strict";
var balanceApp;

balanceApp = angular.module('balanceApp', []);

balanceApp.value('detalle_ctas',[
	{nro:"10",desc:"efectivo"},
	{nro:"94",desc:"Gts.Admin."},
	{nro:"59",desc:"Res.Acum."},
	{nro:"79",desc:"CICC y G"},
	{nro:"45",desc:"Oblig.Financieras"},
	{nro:"14",desc:"C.Cob.AlPer.Accio.Y.Ger."},
	{nro:"77",desc:"Ingresos financieros"},
	{nro:"75",desc:"Otros ingresos de gestion"}
])

balanceApp.factory('cuentas', ['detalle_ctas',function (detalle_ctas) {
	return {
		detalles:{
			rsocial:"Empresa Comercial Chernobyl S.A."
			,subTitulo:"Balanza de Comprobacion"
			,periodo:"Del 1 de Enero al 31 de Dic del año 1"
		}
		,detalleCtas:detalle_ctas
	};
}])


balanceApp.service('svsEffects', [function () {
	this.effectLeft = function(){
		$("#menu").sidr({//activo el contenido responsive lateral movible
			source:'#left-content'
			,renaming:false
		})
	}
}])
		
balanceApp.controller('ctrlCLeft', ['$scope','cuentas','svsEffects','$timeout', function ($scope,cuentas,svsEffects,$timeout) {//contentLeft oontroller
	$scope.rsocial = cuentas.detalles.rsocial
	$scope.subTitulo = cuentas.detalles.subTitulo
	$scope.periodo = cuentas.detalles.periodo
	$scope.cuentas_ = cuentas.detalleCtas;
	  $scope.colors = [
    {name:'black', shade:'dark'},
    {name:'white', shade:'light'},
    {name:'red', shade:'dark'},
    {name:'blue', shade:'dark'},
    {name:'yellow', shade:'light'}
  ];
  $timeout(function(){
  	svsEffects.effectLeft()
  },0)
  $scope.update = function(){
  	console.log($scope.cta.nro+" : "+$scope.cta.desc);
  	console.log($scope.cta__);
  }
			//svsEffects.effectLeft()
  
  
  	
}])

balanceApp.controller('ctrlCuentas', ['$scope','cuentas', function ($scope,cuentas) {
	$scope.rsocial = cuentas.detalles.rsocial
	$scope.subTitulo = cuentas.detalles.subTitulo
	$scope.periodo = cuentas.detalles.periodo
	$scope.cuentas_ = cuentas.detalleCtas
	console.log($scope.cuentas_);
	  $scope.update = function(){
  	console.log($scope.cta.nro+" : "+$scope.cta.desc);
  	console.log($scope.cta__);
  }
}])