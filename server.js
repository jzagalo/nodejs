var config = require('./configure.js'),
    express = require('express');
var app = config(express());

app.set('port', process.env.PORT || 3000);
app.set('view', __dirname + '/views');

app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});