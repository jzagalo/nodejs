var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var pages = [
 { id: '1', route: '', output: 'Woohoo!'},
 { id: '2', route: 'about', output: 'A simple routing with Node example'},
 { id: '3', route: 'another-page', output: function() {return "Here\'s " +this.route;}},
];

var mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};

http.createServer(function(req, res){    
     var lookup = path.basename(decodeURI(req.url)) || 'index.html';
     var f = './' + lookup;

     fs.exists(f, function(exists){
         console.log(exists ? lookup + " is there" : lookup + " doesn't exsit");
     })
    
}).listen(8080);