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

var cache = {};
function cacheAndDeliver(f, cb){
    if(!cache[f]){
        fs.readFile(f, function(err,data){
            if(!err){
                cache[f] = { content: data };
            }

            cb(err, data);
        });        
        return;
    }
    console.log('loading ' + f + ' from cache');
    cb(null, cache[f].content);
}

http.createServer(function(req, res){    
     var lookup = path.basename(decodeURI(req.url)) || 'index.html';
     var f = './' + lookup;

     fs.exists(f, function(exists){               
        if(exists){
            cacheAndDeliver(f, function(err, data){
                if(err) { 
                    res.writeHead(500);
                    res.end("Server Error!");
                    return;
                }
                var headers = { 'Content-type': mimeTypes[path.extname(lookup)]};
                res.writeHead(200, headers);
                res.end(data);
            });
            return;
        }
        res.writeHead(404); // no such file found
        res.end()
     })
     console.log(cache);
    
}).listen(8080);