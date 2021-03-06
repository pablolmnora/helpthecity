'use strict';

var express = require('express'),
  glob = require('glob'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  fs = require('fs'),
  modelInjector = require('../app/middlewares/modelInjector');

module.exports = function (app, config) {

  var env, controllers, daos;

  env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';
  // app.use(favicon(config.root + '/public/img/favicon.ico'));

  app.use(logger('dev'));
  app.use(bodyParser.json({
    limit: '3mb'
  }));
  app.use(bodyParser.urlencoded({
    limt: '3mb',
    extended: true
  }));
  app.use(cookieParser('supernova'));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(session({
    secret: 'supernova',
    name: 'htc.sid',
    saveUninitialized: false,
    rolling: true,
    resave: false,
    expires: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }));
  app.use(function (req, res, next) {
    var maria = '192.168.150.64',
      andre = '192.168.150.64',
      pablo = '192.168.150.64',
      proxy_fai = '192.168.255.2',
      ip = req.connection.remoteAddress.split(':'),
      origin = 'http://';
    ip = ip[ip.length - 1];
    console.log(ip);
    if (ip === andre) origin += ip + ':9000';
    else if (ip === maria) origin += ip + ':3000';
    else if (ip === pablo) origin += ip + ':3000';
    else if (ip === proxy_fai) origin += ip + ':3000';

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //  app.use(function (req, res, next) {
  //    var err = new Error('Not Found');
  //    err.status = 404;
  //    next(err);
  //  });
  //  
  //  if (app.get('env') === 'development') {
  //    app.use(function (err, req, res, next) {
  //      res.status(err.status || 500);
  //      res.send(err);
  //    });
  //  }
  //
  //  app.use(function (err, req, res, next) {
  //    res.status(err.status || 500);
  //      res.end('error');
  //  });
};