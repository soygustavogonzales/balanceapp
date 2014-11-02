boardApp.directive('drvRefreshThumb', [function(){
	// Runs during compile
	return {
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		link: function($scope, elem, iAttrs, ngModel) {
				elem.bind('change',function(){

					var file = elem[0].files[0]
					console.log(file)
					if(file.type.match(/image.*/ig)){

						var reader = new FileReader();
										reader.onload = (function(theFile){
											return function(e){
												console.log(e.target.result)
												$scope.imageNewArticle = e.target.result;
												$scope.$apply()
												ngModel.$render();
											}						
										})(file)
						reader.readAsDataURL(file)

					}else{
						alert("Solo puede seleccionar imagenes(.jpg , .png)")
					}

				})
		}
	};
}]);