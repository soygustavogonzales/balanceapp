
function UserAgent(){/*atributes*/}

UserAgent.prototype.getUserAgent = function(){
		var userAgent = navigator.userAgent
		var resq=/(msie)|(firefox)|(chrome)|(opera)|(safari)/i.exec(userAgent);
		/* 
			resq sera una matriz que contendra las coincidencias encontradas en la cadena segun el patron
			exec() es un metodo del objeto RegExp (Regular Expresion), En un nivel sintactico y semantico es mas eficaz
		*/
		userDevice = {
			browserName : resq[0],//devuelve una cadena con el nombre del navegador ,version, sistema operativo (nombre generico) del usuario,motor del navegador.
			heightScreen : window.screen.height,
			widthScreen : window.screen.width
		}

		return userDevice;
}
UserAgent.prototype.sendToBackendUserAgent = function(userDevice){
	//this es el objeto al que se hace referencia
	if(userDevice||angular.isObject(userDevice))
		return $.post('/userAgent',userDevice);
	return false
}


balanceApp.provider('pvrUserAgent', [function () {

	this.userDevice = new UserAgent();
	var self = this;
	this.$get = [function() {
		return self.userDevice;
	}];
}])