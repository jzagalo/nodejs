var http = require('http');
var path = require('path');
var connect = require('connect');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var util = require('util');
var querystring = require('querystring');
var form = require('fs').readFileSync('form.html');
var maxData = 2 * 1024 * 1024;

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

http.createServer(function(request, response){
    if(request.method === "POST") {
        var incoming = formidable({ multiples: true, uploadDir: 'uploads' }); 

        incoming.on('fileBegin', function(field, file){
            if(file.name){
                file.path += '-' + file.name
                console.log(file.path);
            }
        })
        .on('file', function(field, file){
            if(! file.size)  return;            
            response.write(file.name + ' received\n');
        }).on('field', function(field, value){
            response.write(field + ' : ' + value + '\n' );
        }).on('end', function(){
            response.end('All files received');
        });

        incoming.parse(request);
    }

    if(request.method === "GET") {        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(form)
    }
}).listen(8080);