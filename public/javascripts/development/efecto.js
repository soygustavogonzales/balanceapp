     ;jQuery(document).ready(function() {


						 
	      $('#fullpage').fullpage({
	                anchors: ['1','2'],
	    	          	scrollingSpeed: 1000,
	    	          	keyboardScrolling:false,//para que no se pueda hacer scroll con el teclado
	                autoScrolling:true,
	                resize:false,
	                navigation:false
	       });
	      /*Para que no se pueda hacer scroll con el mouse*/
	      $.fn.fullpage.setAllowScrolling(false);
	      
    });

