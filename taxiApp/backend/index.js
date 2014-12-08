'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    users = require('./routes/users'),
    routes = require('./routes/routes'),
    trips = require ('./routes/trips');
    


var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'taxi',
      password: 'password',
      port: 3306,
      database: 'taxiApp'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//setup the handlers
/*
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

*/
app.get('/users', users.show);
app.get('/users/register', users.registerScreen);
app.post('/users/register/add', users.register);
app.get('/users/delete/:id', users.delete);
app.get('/users/edit/:id', users.get);
app.post('/users/update/:id', users.update);

app.post('/trips/add', trips.add);

app.post('/trips/start', trips.start_trip);
app.post('/trips/end', trips.end_trip);
app.get('/trips/today/:user_id', trips.today_trips);
app.get('/trips/all/:user_id', trips.all_user_trips);


app.get('/routes/:user_id', routes.show);


//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');

});
