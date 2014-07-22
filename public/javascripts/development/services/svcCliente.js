boardApp.service('svcCliente', [function () {
	var fecha = new Date();
	fecha = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear()
	this.clientDatos = {
			rsocial:"McDonals S.A."
			,lema:"Comete el mundo!!"
			,fecha:fecha
	};
	this.contentHtml = "";
	
}])