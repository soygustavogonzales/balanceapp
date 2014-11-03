balanceApp.controller('ctrlLogin',['pvrUserAgent','$scope','$timeout','svcBalance','$http',function(pvrUserAgent,$scope,$timeout,svcBalance,$http){

	$scope.data = "";

		svcBalance.cargarLoader().then(function(html){
				svcBalance.contentHtml = html.data;
				$('#section1 > .tableCell').html(svcBalance.contentHtml)

		});

	$scope.submitForm = function(){
		$scope.isLoggeoCorrect = false
		$http.post('/users/login',{

			email:$scope.email,
			password:$scope.password

		}).then(function(rpta){
			console.log("loggeo correcto: ")
			console.log(rpta.data)
			$scope.isLoggeoCorrect = rpta.data

		}, function(data){
			console.log("error en loggeo :")
			alert("Usuario o clave incorrectos")
			$scope.isLoggeoCorrect = false
		})

		$scope.$watch('isLoggeoCorrect',function(){

				//console.log("loggeo correcto? :"+(typeof $scope.isLoggeoCorrect))

				if($scope.isLoggeoCorrect&&$scope.isLoggeoCorrect==true){//if loggeo exitoso

					//console.log($scope.email)
					//console.log($scope.password)
					//console.log(balanceApp.userDevice)

					localStorage.balanceApp = JSON.stringify(balanceApp.userDevice)

					if(pvrUserAgent)
						pvrUserAgent.sendToBackendUserAgent(balanceApp.userDevice)
						.done(function(data){
								console.log("exito: "+data)
								location.assign("/pages/hojaBalance")
						})
						.fail(function(data){
								console.log("error :"+ data)
								location.assign("/pages/hojaBalance")
						})
				}//if loggeoCorrect
		})
		

	}


}]);
