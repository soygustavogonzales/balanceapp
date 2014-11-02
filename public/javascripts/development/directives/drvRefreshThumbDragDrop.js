boardApp.directive('drvRefreshThumbDragDrop', [function(){
	// Runs during compile
	return {
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		//ngModel solo estara disponible si la etiqueta(elemento HTML)
		// que usara esta directiva tiene  la directiva ng-model="loKSea" seteada
		link: function($scope, elem, iAttrs, ngModel) {

					elem[0].addEventListener('drop',function(evt){

														console.log("drop event")
														evt.stopPropagation()
														evt.preventDefault()
														var file  = evt.dataTransfer.files[0];
															if(file.type.match(/image.*/ig)){
																var reader = new FileReader();
																				reader.onload = (function(theFile){
																					return function(e){
																							$scope.imageNewArticle = e.target.result;
																							$scope.$apply()
																							ngModel.$render();
																					}						
																				})(file)
																reader.readAsDataURL(file)
															}
					},false)

					elem[0].addEventListener('dragover',function(evt){
								console.log("drag over")
								evt.stopPropagation()
								evt.preventDefault()
								evt.dataTransfer.dropEffect = 'copy'					
					},false)

		}//.link

		
	};//.return
}]);