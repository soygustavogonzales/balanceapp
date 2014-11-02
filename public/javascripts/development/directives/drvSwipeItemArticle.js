boardApp.directive('drvSwipeItemArticle', ['$swipe', function($swipe){
	// Runs during compile
	return {
		restric:'A',
		link: function($scope, ele, attrs, controller) {

			var startX;
			var counter = null;
			var factor = 2;
			ele.eliminado = false
			$swipe.bind(ele,{

				'start':function(coords){
					//console.log(attrs)
						startX = coords.x;
						pointX = coords.y;
						counter = 0;
				},
				'move':function(coords){
					counter++;
					//console.log(coords.x+' : '+coords.y)
					ele.css({
						'margin-left': counter+'em',
						'opacity': (counter/factor)/10//
					});
					if(counter>(factor*10)){
							ele.css('display','none')
							$scope.eliminarVenta(parseInt(attrs.index))
							ele.eliminado = true
					}
				},
				'end':function(coords){
						console.log("end swipe")
						if(!ele.eliminado){
							console.log('counter -> '+counter)
							ele.css({
								'margin-left': '0',
								'opacity': '1'
							});
						}
						counter = 0;
						//console.log(coords.x)
				},
				'cancel':function(coords){
						console.log("cancel swipe")
				}
			});
		}
	};
}]);