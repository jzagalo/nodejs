var express = require('express'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    multer = require('multer'),
    moment = require('moment');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': true }));
    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).any());
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, './public')))    

    if('development' === app.get('env')){
        app.use(errorHandler());
    }

    app.set('view engine', 'handlebars');
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        //partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp){
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);    
    
    return app;
}

