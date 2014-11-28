$(function () 
{
	 $("body").load("pages/loginScreen.html", function () {

        $.support.cors = true;
        
        $.getJSON( "http://192.168.125.215:4000/routes", function( data ) {
            $(".result").text( data[0].routeName );
            //alert( "Load was performed. " + data.length );
        }).error(function() {
            alert( "error : length" + JSON.stringify (arguments) );
            });

        $(".ola").click(function(){
            $.get( "users", function( data ) {
                                    $( "#contacts" ).html("");
                    $.each(data, function(index, value){
                        var details = "<a class=\"navigate-right\">" + value.firstName +" "+ value.lastName  + "</a>"
                        $( "#contacts" ).append("<li class=\"table-view-cell\">" + details + "</li>");
                    });
                    //alert( "Load was performed. " + data.length );
                });
        });// get users

        
        $("#register").click(function(){
        	//check details
        	// check if username is bruno & password is 12345
        	//alert("aol!");
        	
            $("body").load("pages/register.html", function (){
		          alert('currentPage');
		          //return false;
            });

      	});

	    $('#login').click(function(){
	    	var x = document.getElementById("demo");

			function getLocation() {
		      if (navigator.geolocation) {
        	       navigator.geolocation.getCurrentPosition(showPosition);
                } else {
        	       x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

			function showPosition(position) {
    		  x.innerHTML = "Latitude: " + position.coords.latitude + 
   			  "<br>Longitude: " + position.coords.longitude; 
            }

		    $('body').load("pages/driverLocation.html")  	
		}); 
	          
    });

});




