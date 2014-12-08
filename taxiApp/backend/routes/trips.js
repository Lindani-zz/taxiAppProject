exports.show = function (req, res) {
	res.render('trips', {

	});	
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from trips', [], function(err, results) {
        	if (err) return next(err);

        	res.send(results);

    		res.render( 'trips.handlebars', {
    			trips :results
    		});
			
      });
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){

		connection.query('SELECT * FROM trips WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}

			res.render('trips.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		
		console.log("input : 	" + JSON.stringify(input));

		var data = {
            routeID : input.routeId,
            ownerID : input.ownerId,
            capacity : input.capacity,
        };

        		console.log("data : 	" + JSON.stringify(data));


		if (err) 
			return next(err);
		
		connection.query('insert into trips set ?', data, function(err, results) {
        	if (err)
              console.log("Error inserting : %s ",err );
          	res.send(results);
      	});
	});
};

exports.start_trip = function (req, res, next) {
	req.getConnection(function(err, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		
		console.log("input : 	" + JSON.stringify(input));

		var data = {
            routeID : input.routeId,
            ownerID : input.ownerId,
            capacity : input.capacity,
            status : "running",
            geoLocationStart : new Date(),
            dateTimeStart : input.timestamp,
        };

        		console.log("data : 	" + JSON.stringify(data));


		if (err) 
			return next(err);
		
		connection.query('insert into trips set ?', data, function(err, results) {
        	if (err)
              console.log("Error inserting : %s ",err );

          	console.log("=> " + JSON.stringify(results));

          	res.send({
          		trip_id : results.insertId
          	})
      	});
	});
};
exports.end_trip = function (req, res, next) {

	/*
	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection){
    	connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
    		
    		if (err){
              console.log("Error Updating : %s ",err );
    		}
          	res.redirect('/products');
    	});
    });
	*/
  console.log("end_trip");
	req.getConnection(function(err, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		
		console.log("input : 	" + JSON.stringify(input));
		
		var trip_id = input.tripId;

		var data = {
           	routeID : input.routeId,
            ownerID : input.ownerId,
            capacity : input.capacity,
            status : "done",
            geoLocationEnd : new Date(),
            dateTimeEnd : input.timestamp
        };

        		console.log("data : 	" + JSON.stringify(data));


		if (err) 
			return next(err);
		
		connection.query('update trips set ? where id = ?',  [data, trip_id], function(err, results) {
        	if (err)
              console.log("Error inserting : %s ",err );
          	res.send(results);
      	});
	});
};

exports.today_trips = function(req, res, next){
  var id = req.params.user_id;
  req.getConnection(function(err, connection){
    
    var query = "SELECT routeID,ownerID,routeName,capacity * fare AS totalFare FROM trips t, routes r WHERE r.id = t.routeID AND STATUS =  'done'"
    query += " and DATE(dateTimeEnd) = DATE(NOW())";
    query += " and t.ownerID = ?";

    connection.query(query, [id], function(err,rows){
      if(err){
          console.log("Error Selecting : %s ",err );
      }
      res.send(rows);
      //res.render('trips.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
    }); 
  });
}

exports.all_user_trips = function(req, res, next){
  var id = req.params.user_id;
  req.getConnection(function(err, connection){
    
    var query = "SELECT routeID,ownerID,routeName,capacity * fare AS totalFare FROM trips t, routes r WHERE r.id = t.routeID AND STATUS =  'done'"
    query += " and t.ownerID = ?";

    connection.query(query, [id], function(err,rows){
      if(err){
          console.log("Error Selecting : %s ",err );
      }
      res.send(rows);
      //res.render('trips.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
    }); 
  });
}

	