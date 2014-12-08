$.getJSON( ipAddress + ":3000/users", function( users ) {
                $( "#contacts" ).html("");
                $.each(users, function(index, user){
                    var details = "<a class=\"navigate-right\" id=\"" + user.id + "\" >" + user.firstName +" "+ user.lastName  + "</a>"
                    $( "#contacts" ).append("<li class=\"table-view-cell\">" + details + "</li>");
                });

                    $("#contacts").on("click", "li", function (evt) {
                        
                        var userId = evt.target.id;
                        var tripId = null;

                        $.getJSON(  ipAddress + ":3000/routes/" + userId, function( routes ) {

                                $("body").load("pages/routes.html", function()
                                {

                                    $("#routes").html("");
                                    $.each(routes, function(index, route){
                                        //alert(route.route_id);
                                        var details = "<a class=\"navigate-right\" id=\"" + route.route_id + "\" >" + route.routeName +" "+ route.fare  + "</a>"
                                          $( "#routes" ).append("<li class=\"table-view-cell\">" + details + "</li>");

                                    });

                                    $("#routes").on("click","li", function (routeEvt)
                                    {
                                        var routeId = routeEvt.target.id;   
                                        //alert("routes : " + routeId);
                                        
                                        var route = null;
                                        $.each(routes, function(index, theRoute){
                                            if(theRoute.route_id == routeId)
                                                route = theRoute;
                                        });
                                        
                                        $("body").load("pages/trips.html", function(){
                                            
                                            $("#capacity").bind("propertychange change click keyup input paste", function(){

                                                if($("#capacity").val() <= 0)
                                                {
                                                    $(".btn").attr("disabled", true);
                                                }
                                                else{
                                                    $(".btn").removeAttr("disabled");
                                                }

                                            });


                                            $(".btn").click(function(){
                                                var capacity = parseInt($("#capacity").val());
                                                $.post( ipAddress + ":3000/trips/start", 
                                                {   ownerId : userId, 
                                                    routeId : routeId, 
                                                    capacity : capacity }, 
                                                function(createdTrip) {
                                                    tripId = createdTrip.trip_id;
                                                }).fail(function(err){
                                                    alert(JSON.stringify(err));
                                                });

                                                 $("body").load("pages/tripEnd.html", function()
                                                    {   
                                                        var totalFare  = "<a class=\"table-view-cell\" id=\"" + " "+ "\" >" + " Total Fare Per Trip "+"</a>";
                                                        var passengers = "<a class=\"table-view-cell\" id=\"" + " "+ "\" >" + " Passengers " + " " +"</a>";
                                                        var routesIdentity = "<a class=\"table-view-cell\" id=\"" + " "+ "\" >" + " Route "  +"</a>";
                                                        $("#tripEnd").append("<li class=\"table-view-cell\">" + passengers + "<span class=\"badge\">" + capacity +"</span></li>");
                                                        $("#tripEnd").append("<li class=\"table-view-cell\">" + totalFare + "<span class=\"badge\">" + "R"+route.fare*capacity +"</span></li>");
                                                        $("#tripEnd").append("<li class=\"table-view-cell\">" + routesIdentity+ "<span class=\"badge\">" + routeId +"</span></li>");
                                                        
                                                        $(".btn").click(function ()
                                                            {

                                                                $.post( ipAddress + ":3000/trips/end",
                                                                {   
                                                                    ownerId : userId, 
                                                                    routeId : routeId, 
                                                                    capacity : capacity,
                                                                    tripId : tripId 

                                                                }, function(trips) {
                                                                        tripId = trips.trip_id;
                                                                    })
                                                                .fail(function(err){
                                                                    alert(JSON.stringify(err));
                                                                });
                                                            });
                                                        
                                                    });
                                            }); 

                                        });
                                        

                                        
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