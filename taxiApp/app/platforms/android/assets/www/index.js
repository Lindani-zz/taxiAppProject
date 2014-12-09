$(function () {

    var ipAddress = "http://192.168.125.215";
    
    function loginScreen(func){
    	$("body").load("pages/loginScreen.html", func);
    }

    function showUsers(){
        $.getJSON( ipAddress + ":3000/users", function( users ) {
            $( "#contacts" ).html("");
            $.each(users, function(index, user){
                var details = "<a class=\"navigate-right\" id=\"" + user.id + "\" >" + user.firstName +" "+ user.lastName  + "</a>"
                $( "#contacts" ).append("<li class=\"table-view-cell\">" + details + "</li>");
            });
            clickUser();
        });

    }

    function clickUser(userId){

        $("#contacts").on("click", "li", function (evt) {
                        
            var userId = evt.target.id;
            var tripId = null;
            //alert(userId);
            $("body").load("pages/startUpScreen.html", function(){
                $("#start").click(function(){
                    $("body").load("pages/routes.html", function(){
                        loadRoutes(userId);
                    });
                });

                $("#overview").click(function(){
                    $("body").load("pages/overview.html", function(){
                        showOverviewEarnings(userId);
                    });
                });
                 $("#dailyOverview").click(function (){
                    $("body").load("pages/dailyEarnings.html", function(){
                        showDailyEarnings(userId);
                        $(".btn").click(function(){
                            $("body").load("pages/register.html", function ()
                                    {
                                       
                                    });
                        });
                    });

                });
                 
            });
        });
    }

    function loadRoutes(userId){
        $.getJSON(  ipAddress + ":3000/routes/" + userId, function( routes ) {


                $("body").load("pages/routes.html", function(){
                    $(".home").click(function(){
                            $("body").load("pages/startUpScreen.html", function ()
                                    {
                                        
                                    });
                        });
                    $("#routes").html("");
                    $.each(routes, function(index, route){
                        var details = "<a class=\"navigate-right\" id=\"" + route.route_id + "\" >" + route.routeName +" "+ route.fare  + "</a>"
                          $( "#routes" ).append("<li class=\"table-view-cell\">" + details + "</li>");

                          $("#routes").on("click","li", function (routeEvt){
                                var routeId = routeEvt.target.id;   
                                //alert("routes : " + routeId);
                                
                                var route = null;
                                $.each(routes, function(index, theRoute){
                                    if(theRoute.route_id == routeId)
                                        route = theRoute;
                                });
                                loadStartTripScreen(userId, routeId, route);
                            });
                    });
                });
        });
    }

    function loadStartTripScreen(userId, routeId, route, capacity){

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
            //

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

                 $("body").load("pages/tripEnd.html", function(){ 

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
                                        showDailyEarnings(userId);
                                    })
                                .fail(function(err){
                                    alert(JSON.stringify(err));
                                });
                                
                            });
                        
                    });
            });

        });
    }

    function loadOverview(){

    }

    function showDailyEarnings(userId){
        $("body").load("pages/dailyEarnings.html", function(){
        $(".btn").click(function(){
                            $("body").load("pages/startUpScreen.html", function ()
                                    {
                                        alert("whats up");
                                    });
                        });                                                            
            $.getJSON(  ipAddress + ":3000/trips/today/" + userId, function( trips ) {
                //
                $.each(trips, function(index, trip){
                    var routesIdentity = "<a class=\"table-view-cell\" id=\"" +  trip.routeID  + "\" >" + trip.routeName + "</a>";
                    $("#earnings").append("<li class=\"table-view-cell\">" + routesIdentity+ "<span class=\"badge\">R" + trip.totalFare + "</span></li>");
                });
            });
       });
    };

    function showOverviewEarnings(userId){
        $("body").load("pages/overview.html", function(){ 
            $(".btn").click(function(){
                            $("body").load("pages/startUpScreen.html", function ()
                                    {
                                        
                                    });
                        });                                        
            $.getJSON(  ipAddress + ":3000/trips/all/" + userId, function( trips ) {
                //
                $.each(trips, function(index, trip){
                    var routesIdentity = "<a class=\"table-view-cell\" id=\"" +  trip.routeID  + "\" >" + trip.routeName + "</a>";
                    $("#overview").append("<li class=\"table-view-cell\">" + routesIdentity+ "<span class=\"badge\">R" + trip.totalFare + "</span></li>");
                });
            });
       });
    };



    loginScreen(showUsers);
    //showUsers();



});