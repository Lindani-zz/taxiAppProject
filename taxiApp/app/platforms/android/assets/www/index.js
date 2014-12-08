$(function () {

    var ipAddress = "http://192.168.125.215";

	 $("body").load("pages/startUpScreen.html", function () {

        //$.support.cors = true;
        
        //var ipAddress = "http://192.168.127.251";

        $("#contacts").click(function ()
            {
                $("body").load("pages/startUpScreen.html", function ()
                {
                   alert("jkjdj");
                });
            });

        });


});