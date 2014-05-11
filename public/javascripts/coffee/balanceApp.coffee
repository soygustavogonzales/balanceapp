"use strict"
balanceApp = angular.module 'balanceApp',[]
balanceApp.config ($routeProvider)->
	$routeProvider
	.when '/',
		templateUrl:'inicio.jade'
	
##balanceApp.controller 'hola',($scope)->
