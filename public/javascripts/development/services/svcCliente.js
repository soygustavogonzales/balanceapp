boardApp.service('svcCliente', [function () {
	var fecha = new Date();
	fecha = fecha.getDate()+' / '+fecha.getMonth()+' / '+fecha.getFullYear()
	this.clientDatos = {
			rsocial:"Jugueteria Wong - Divercity"
			,lema:"Un mundo de diversiones en juguetes :)"
			,fecha:fecha
	};
	this.contentHtml = "";
	
}])