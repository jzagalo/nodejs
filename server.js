var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var util = require('util');
var querystring = require('querystring');
var form = require('fs').readFileSync('form.html');
var maxData = 2 * 1024* 1024;

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
            if(postData.length > maxData){
                postData = '';
                this.destroy();
                res.writeHead(413); // Request Entity Too Large
                res.end("Too Large");
            }
        }).on('end', function(){
            if(!postData){ res.end(); return; } // Prevents Empty Post
            // Requests from crashing the server
            var postDataObject = querystring.parse(postData);            
            console.log('User Post:\n' + postData);
            res.end('You Posted:\n' + util.inspect(postDataObject));
        });
    }

}).listen(8080);