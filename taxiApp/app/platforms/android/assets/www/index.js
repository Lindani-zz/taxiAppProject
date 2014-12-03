$(function () 
{
	 $("body").load("pages/loginScreen.html", function () {

        //$.support.cors = true;
        
        //var ipAddress = "http://192.168.127.251";
        var ipAddress = "http://192.168.125.215";

        $.getJSON( ipAddress + ":3000/users", function( data ) {
            $( "#contacts" ).html("");
                    $.each(data, function(index, value){
                        var details = "<a class=\"navigate-right\" id=\"" + value.id + "\" >" + value.firstName +" "+ value.lastName  + "</a>"
                        $( "#contacts" ).append("<li class=\"table-view-cell\">" + details + "</li>");
                    });

                    $("#contacts").on("click", "li", function (evt) {
                        
                        var userId = evt.target.id;

                        $.getJSON(  ipAddress + ":3000/routes/" + userId, function( data ) {;

                                $("body").load("pages/routes.html", function()
                                {
                                    $("#routes").html("");
                                    $.each(data, function(index, value){
                                            var details = "<a class=\"navigate-right\" id=\"" + value.id + "\" >" + value.routeName +" "+ value.fare  + "</a>"
                                          $( "#routes" ).append("<li class=\"table-view-cell\">" + details + "</li>");
                                    });

                                    $("#routes").on("click","li", function (evt)
                                    {   
                                        alert("routes!");
                                        $("body").load("pages/trips.html", function(){});

                                        /*
                                        $.getJSON( "http://192.168.125.215:4000/trips", function( data ) {
                                            $("body").load("pages/trips.html", function()
                                             {
                                                $("#trips").html("");
                                                    $.each(data, function(index, value)
                                                        {
                                                           var details = "<a class=\"navigate-right\" id=\"" + value.id + "\" >" + value.capacity+" "+ value.geoLocationStart  + "</a>"
                                                            $( "#trips" ).append("<li class=\"table-view-cell\">" + details + "</li>"); 
                                                        });
                                            });
                                        });
                                        */
                                    });


                                }); //display the routes from the database

                    });

        });
                    

        })
            .error(function() {
            alert( "error : length" + JSON.stringify (arguments) );
        });
        
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




