balanceApp.factory('svcBalance', ['empresa','$http',function (empresa,$http) {

	return {
		detalles:{
			
		}
		,contentHtml:""
		,detalleCtas:empresa
		,cargarLoader: function(){
			return $http.get('/partials/loader')
		}
		,cargarTable:function(){
			return $http.get('/partials/objectBoardApp')
		}
	}

}])