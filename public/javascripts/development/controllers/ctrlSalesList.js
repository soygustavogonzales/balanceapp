boardApp.controller('ctrlSalesList', ['$scope', function($scope){
	$scope.tablaVentas = [
		{
			nombreProducto:'Ibuprofeno 500 mg',
			precio:'15.50',
			cantidad:'2',
			hora:'18:15',
			vendedor:'Carlos Alcantara'
		},
		{
			nombreProducto:'Salbutamol 100mg',
			precio:'15.50',
			cantidad:'2',
			hora:'15:11',
			vendedor:'Fiorella Conrad'
		},
			{
			nombreProducto:'Condones Durex',
			precio:'15.50',
			cantidad:'2',
			hora:'13:20',
			vendedor:'Damian Estabridis'
		},
	]
}])