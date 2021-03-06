'use strict';

var express = require('express'),
	config = require('./config/config'),
	db = require('./app/models'),
	app = express();

require('./config/express')(app, config);
require('./config/passport')(app, config);

// Load server essential functionalities
require('./app/daos')(app, config);
require('./app/services')(app, config);
require('./app/controllers')(app, config);
require('./app/routes')(app, config);

db.sequelize
	.sync() // use {force: true} as parameter when changing something into database tables.
	.then(function () {
		app.listen(config.port, function () {	
			console.log('Server started on ip: ' + this.address().address + ' port: ' + this.address().port);
		});
	}).catch(function (e) {
		throw new Error(e);
	});