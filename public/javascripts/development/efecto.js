     ;jQuery(document).ready(function() {

							$("#menu").click(function() {
						  	$("#left-content").toggle("slow");
						   return false;
						 });
						 
	      $('#fullpage').fullpage({
	                anchors: ['1','2'],
	    	          	scrollingSpeed: 1000,
	                autoScrolling:true,
	                resize:false,
	                navigation:false
	       });

    });

