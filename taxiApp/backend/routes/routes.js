exports.show = function (req, res) {
	res.render('routes', {

	});	
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from routes', [], function(err, results) {
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
			}

			res.render('routes.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
	};