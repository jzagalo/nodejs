
var express = require('express'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ 'extended': true }));
    app.use(bodyParser({ uploadDir: path.join(__dirname, 'public/upload/temp')}))
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, './public')))

    if('development' === app.get('env')){
        app.use(errorHandler());
    }

    return app;
}

