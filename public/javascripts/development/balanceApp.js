"use strict";
var balanceApp;

balanceApp = angular.module('balanceApp', []);

balanceApp.value('detalle_ctas',[
	{nro:"10",desc:"efectivo"},
	{nro:"12",desc:"CCCT"},
	{nro:"14",desc:"C.Cob.AlPer.Accio.Y.Ger."},
	{nro:"16",desc:"CCDT"},
	{nro:"20",desc:"Mercaderias"},
	{nro:"21",desc:"Prod.Terminados"},
	{nro:"23",desc:"Prod.Proceso"},
	{nro:"24",desc:"Materia Prima"},
	{nro:"33",desc:"Inm.,Maq.,Equipo"},
	{nro:"39",desc:"Dep.Acumulada"},
	{nro:"40",desc:"Trib x Pagar"},
	{nro:"41",desc:"REmuneraciones por Pagar"},
	{nro:"42",desc:"C.C.D.T."},
	{nro:"45",desc:"Oblig.Financieras"},
	{nro:"46",desc:"C.P.C.T."},
	{nro:"50",desc:"Capital"},
	{nro:"59",desc:"Res.Acum."},
	{nro:"60",desc:"Compras"},
	{nro:"61",desc:"Compras"},
	{nro:"62",desc:"Gtos.de Personal"},
	{nro:"63",desc:"Gtos.Serv.Prestados por Terceros"},
	{nro:"67",desc:"Gtos.Financieros"},
	{nro:"68",desc:"Valuacion y Deterioro de Activos"},
	{nro:"69",desc:"Costos de Ventas"},
	{nro:"70",desc:"Ventas"},
	{nro:"71",desc:"Var.Prod.Almacenada"},
	{nro:"75",desc:"Otros ingresos de gestion"},
	{nro:"77",desc:"Ingresos financieros"},
	{nro:"79",desc:"CCIC y Gtos."},
	{nro:"88",desc:"Impuesto a la Renta"},
	{nro:"92",desc:"Costo de Produccion"},
	{nro:"94",desc:"Gtos.Administrativos"},
	{nro:"95",desc:"Gtos.Ventas"},
	{nro:"97",desc:"Gtos. financieros"}
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


balanceApp.controller('ctrlPrincipal',['$scope','cuentas','$timeout',function ($scope,cuentas,$timeout){

	$scope.rsocial = cuentas.detalles.rsocial
	$scope.subTitulo = cuentas.detalles.subTitulo
	$scope.periodo = cuentas.detalles.periodo
	$scope.cuentas_ = cuentas.detalleCtas;

	$scope.tablaCtas = [];

	$scope.sumas = {
		m:{
			debe:0,
			haber:0
		},
		s:{
			deudor:0,
			acreedor:0
		},
		b:{
			activo:0,
			pasPat:0
		},
		r:{
			perdidas:0,
			ganancias:0
		}
	};

	$scope.agregarCta = function(){
		console.log($scope.debe)
		console.log($scope.haber)
		var cta = $('#cta').val().substring(0,2),
		d = parseInt(($scope.debe==undefined)?0:$scope.debe), h = parseInt(($scope.haber==undefined)?0:$scope.haber),
		res = (parseInt(d) - parseInt(h));
		res = (parseInt(res) > 0)?res:res*(-1);

		$scope.getSaldos = function (){
			return {
				deudor:(d>h)?res:0,
				acreedor:(h>d)?res:0
			}
		}
		$scope.getBalanza = function(){
			
			var activo =  (d>h)?res:0,
			pasPat = (h>d)?res:0;

			switch(parseInt(cta)){
				case 10:
				case 12:
				case 21:
				case 23:
				case 24:
				case 33:
				case 59:
				case 12:
				case 14:
				case 20:
				case 39:
				case 40:
				case 45:
				case 46:
				case 50:
				case 42:
					activo = activo;
					pasPat = pasPat;
					break;
				default:
				console.log("default...");
					activo = pasPat = 0
					break;
			}
			return {
				activo:activo,
				pasPat:pasPat
			}
		}
		$scope.getResultados = function(){

			var perdidas =  (d>h)?res:0,
			ganancias = (h>d)?res:0;

			switch(parseInt(cta)){
				case 10:
				case 12:
				case 21:
				case 23:
				case 24:
				case 33:
				case 59:
				case 12:
				case 14:
				case 20:
				case 39:
				case 40:
				case 45:
				case 46:
				case 50:
				case 42:
					perdidas = ganancias = 0
					break;
				default:
				console.log("default...");
					perdidas = perdidas;
					ganancias = ganancias;
					break;
			}
			return {
				perdidas:perdidas,
				ganancias:ganancias
			}
		}

		$scope.getResBalance = function(){
			var res = $scope.sumas.b.activo  - $scope.sumas.b.pasPat,
			condicion = $scope.sumas.b.activo  < $scope.sumas.b.pasPat,
			activo = (condicion)?res:0,
			pasPat = (!condicion)?res:0;
			return {
				activo:activo,
				pasivo:pasPat
			}
		}
		$scope.getResResultados = function(){
			var res = $scope.sumas.b.perdidas  - $scope.sumas.b.ganancias,
			condicion = $scope.sumas.b.perdidas  < $scope.sumas.b.ganancias,
			perdidas = (condicion)?res:0,
			ganancias = (!condicion)?res:0;
			return {
				perdidas:perdidas,
				ganancias:ganancias
			}
		}
		$scope.tablaCtas.push(	
		{
			nroCta: cta
			,descripcion:$('#cta').val().substring(4)
			,movimientos:{
				debe:d
				,haber:h
			}
			,saldos:{
				deudor:$scope.getSaldos().deudor
				,acreedor:$scope.getSaldos().acreedor
			}
			,balance:{
				activo:$scope.getBalanza().activo
				,pasPat:$scope.getBalanza().pasPat
			}
			,resultados:{
				perdidas:$scope.getResultados().perdidas
				,ganancias:$scope.getResultados().ganancias
			}
		})

		$scope.resEjer = {
				b:{}
			,r:{}
		};


	$scope.sumas.m.debe += parseInt(d)
	$scope.sumas.m.haber += parseInt(h)

	$scope.sumas.s.deudor += parseInt($scope.getSaldos().deudor)
	$scope.sumas.s.acreedor += parseInt($scope.getSaldos().acreedor)

	$scope.sumas.b.activo += parseInt($scope.getBalanza().activo)
	$scope.sumas.b.pasPat += parseInt($scope.getBalanza().pasPat)

	$scope.sumas.r.perdidas += parseInt($scope.getResultados().perdidas)
	$scope.sumas.r.ganancias += parseInt($scope.getResultados().ganancias)

	$scope.resEjer.b.activo = $scope.getResBalance().activo;
	$scope.resEjer.b.pasPat = $scope.getResBalance().pasivo;
	$scope.resEjer.r.perdidas = $scope.getResBalance().perdidas;
	$scope.resEjer.r.ganancias = $scope.getResBalance().ganancias;

	}

	$scope.remove = function(index){	
		$scope.tablaCtas.splice(index,1)
		var debeDeleted = parseInt($scope.tablaCtas[index].movimientos.debe),
		haberDeleted = parseInt($scope.tablaCtas[index].movimientos.haber);

		console.log(index+" : "+debeDeleted+" , "+haberDeleted)

		$scope.sumas.m.debe = 0
		$scope.sumas.m.haber = 0
		if($scope.tablaCtas.length>0){
			
			angular.forEach($scope.tablaCtas, function(val,key){

				if(val!=undefined){
					console.log(val.movimientos.debe)
					console.log(val.movimientos.haber)

					$scope.sumas.m.debe += val.movimientos.debe  
					$scope.sumas.m.haber += val.movimientos.haber
				}

				/*
				*/
			})
		}
			
/*

		$scope.sumas.s.deudor -= ctaDeleted
		$scope.sumas.s.acreedor -= ctaDeleted

		$scope.sumas.b.activo -= ctaDeleted
		$scope.sumas.b.pasPat -= ctaDeleted

		$scope.sumas.r.perdidas -= ctaDeleted
		$scope.sumas.r.ganancias -= ctaDeleted
		*/
	}

	$scope.toExcel = function(){
		$("#tableExport").btechco_excelexport({
      containerid: "tableExport"
     , datatype: $datatype.Table
   });
	}
}]);