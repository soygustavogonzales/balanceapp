boardApp.service('svcCliente', [function () {
	var fecha = new Date();
	fecha = fecha.getDate()+' / '+fecha.getMonth()+' / '+fecha.getFullYear()
	this.clientDatos = {
			rsocial:"Jugueteria Wong - Divercity"
			,lema:"Un mundo de diversiones en juguetes :)"
			,fecha:fecha
	};
	this.contentHtml = "";
	this.sendFile = function(ele,remote,successFn){
				// Ajax File upload with jQuery and XHR2
				// Sean Clark http://square-bracket.com
				// xhr2 file upload
				// data is optional
				console.log(ele)
				$.fn.upload = function(remote,successFn) {
				    return this.each(function() {
				    	//console.log($(this)[0].files[0])
				        if ($(this)[0].files[0]) {
				            var formData = new FormData();
				            console.log($(this).attr("name"))
				            console.log($(this)[0].files[0])
				            formData.append($(this).attr("name"), $(this)[0].files[0]);
				            formData.append('data-id',"111222")
				            // do the ajax request
				            console.log("formData>>")
				            console.log(formData)
				            $.ajax({
				                url: remote,
				                type: 'POST',
				                data: formData,
				                dataType: "json",
				                cache: false,
				                contentType: false,
				                processData: false,
				                complete: function(res) {
				                    var json;
				                    try {
				                        json = JSON.parse(res.responseText);
				                    } catch (e) {
				                        json = res.responseText;
				                    }
				                				console.log(json)
				                    if (successFn)
				                        successFn(json);
				                }
				            });
				        }
				    });
				};
				ele.upload(remote,successFn)
		};
	
}])