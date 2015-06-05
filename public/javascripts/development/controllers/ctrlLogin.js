balanceApp.controller('ctrlLogin',['pvrUserAgent','$scope','$timeout','svcBalance','$http',function(pvrUserAgent,$scope,$timeout,svcBalance,$http){

	$scope.data = "";

		svcBalance.cargarLoader().then(function(html){
			/*cargamos el loader(archivo .gif)*/
				svcBalance.contentHtml = html.data;
				$('#section1 > .tableCell').html(svcBalance.contentHtml)

		});

	$scope.submitForm = function(){
			$scope.isLoggeoCorrect = false
		if($scope.email == "admin@gmail.com" && $scope.password == "12345"){
			$scope.isLoggeoCorrect = true
		}

		$scope.$watch('isLoggeoCorrect',function(){

				if($scope.isLoggeoCorrect&&$scope.isLoggeoCorrect==true){//if loggeo exitoso

					localStorage.balanceApp = JSON.stringify(balanceApp.userDevice)



					/*Scrolleamos la vista hacia abajo (pasamos del login -> hojaBalance)*/						
					$.fn.fullpage.moveTo(2);//seccion 2
					var timer = $timeout(function(){
						
						svcBalance.cargarTable().then(function(html){
							svcBalance.contentHtml = html.data;

							$('#section1 > .tableCell').html(svcBalance.contentHtml)/*cargamos el objeto objectBoardApp.jade*/
						});
						
					},2500)
				}//if loggeoCorrect
		})
		

	}


}]);
