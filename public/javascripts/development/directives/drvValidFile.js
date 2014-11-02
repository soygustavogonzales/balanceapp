boardApp.directive('drvValidFile', [function(){
	// Runs during compile
	return {
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		link: function($scope, elem, iAttrs, ngModel) {
				elem.bind('change',function(){

					$scope.$apply(function(){
						ngModel.$setViewValue(elem.val());
						ngModel.$render()
					})

				})
		}
	};
}]);