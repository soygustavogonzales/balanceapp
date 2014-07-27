var process = function(req){
	//if(req)
		var l = console.log;

		var Device = function(req){
			var status = true
			switch(true){
				case (!Object.prototype.toString.call(req)=="[object Object]"):
					status = false
					l(new Error("OOPS!! UserAgent: Object req is undefined"))
				break;
				case (!Object.prototype.toString.call(req.headers)=="[object Object]"):
					status = false
					l(new Error("OOPS!! UserAgent: Object req.headers is undefined"))
				break;
				case (!Object.prototype.toString.call(req.headers['user-agent'])=="[object String]"):
					status = false
					l(new Error("OOPS!! UserAgent: String req.headers[user-agent] is undefined"))
				break;
			}
			if(status)
				this.userAgent = req.headers['user-agent'];
		}

		Device.prototype.getBrowser = function(){

			var resq=/(msie)|(firefox)|(chrome)|(opera)|(safari)/i.exec(this.userAgent);//resq sera una matriz que contendra las coincidencias encontradas en la cadena segun el patron
			if(resq)
				return (resq[0]);
			else
				return false;

		}

		Device.prototype.isMovile = function(){
			
			var resq=/(linux)|(macintosh)|(windows)/i.exec(this.userAgent);//resq sera una matriz que contendra las coincidencias encontradas en la cadena segun el patron

			if(resq){
				switch(resq[0].toLowerCase()){
					case "linux":
						var resq1=/(android)/i.exec(this.userAgent);
						if(resq1)
							return true
						else
						return false
					break;
				}
			}
			else{
				return true
			}
		}

		Device.prototype.isPc = function(){
			return !this.isMovile();
		}
		/* exec() es un metodo del objeto RegExp (Regular Expresion), En un nivel sintactico y semantico es mas eficaz
		*/

		var device = new Device(req)
		return device
}		

		module.exports = process
