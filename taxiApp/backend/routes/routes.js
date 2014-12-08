exports.show = function (req, res) {
	res.render('routes', {

	});	
};

exports.show = function (req, res, next) {
	var user_id = req.params.user_id;
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT routes.id as route_id, users.id as user_id, firstName, routeName, fare FROM users, routes, users_routes where users.id=users_routes.userId and routes.id=users_routes.routeId and users.id = ?', 
				[user_id], function(err, results) {
        	if (err) return next(err);

        	res.send(results);

        	/*
    		res.render( 'routes.handlebars', {
    			routes :results
    		});
			*/
      });
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){

		connection.query('SELECT * FROM routes WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}s

			res.render('routes.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
	};