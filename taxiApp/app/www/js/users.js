exports.show = function (req, res) {
	res.render('users', {

	});	
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from users', [], function(err, results) {
        	if (err) return next(err);
        	res.send(results);

    		/*res.render( 'users.handlebars', {
    			users :results
    		});*/
      });
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){

		connection.query('SELECT * FROM users WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}

			res.render('userEdit.handlebars',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
	};

exports.registerScreen = function (req, res) {
	res.render('register');
}

exports.register = function(req, res, next) {
	
	req.getConnection(function(err, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
            firstName : input.firstName,
            lastName : input.lastName,
           	isOwner  : "0",
           	address1 :input.address1,
           	address2 :input.address2,
           	address3  :input.address3,
           	postCode : input.postCode,
           	userName : input.userName,
           	password: input.password,


        };
        
        console.log("data : " + JSON.stringify(data));

		if (err) 
			return next(err);
		
		connection.query('insert into users set ?', data, function(err, results) {
        	if (err)
              console.log("Error inserting : %s ",err );
         
          	res.redirect('/users');
      	});
	});
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){

		connection.query('DELETE FROM users WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
				}
				res.send(results);
			//res.redirect('/users');
			});
		 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function(err, connection){
    	connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows){
    		
    		if (err){
              console.log("Error Updating : %s ",err );
    		}
          	res.redirect('/users');
    	});
    });

};
