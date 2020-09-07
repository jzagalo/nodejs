var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var form = require('fs').readFileSync('form.html')


var pages = [
 { id: '1', route: '', output: 'Woohoo!'},
 { id: '2', route: 'about', output: 'A simple routing with Node example'},
 { id: '3', route: 'another-page', output: function() {return "Here\'s " + this.route; }},
];

var mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};


http.createServer(function(req, res){ 
    if(req.method === "GET"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(form);
    }   

    if(req.method === "POST"){
        var postData = '';
        req.on('data', function(chunk){
            postData += chunk;
        }).on('end', function(){
            console.log('User Post:\n' + postData);
            res.end('You Posted:\n' + postData);
        });
    }

}).listen(8080);