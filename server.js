var config = require('./configure.js'),
    express = require('express'),
    mongoClient = require('./mongotest/test'),
    app = config(express());

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');


app.listen(app.get('port'), function(){
    mongoClient();
    console.log('Server up: http://localhost:' + app.get('port'));
});