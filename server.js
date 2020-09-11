var http = require('http');
var clientHtml = require('fs').readFileSync('./client.html');

var plainHttpServer = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(clientHtml);
}).listen(3000);

var io = require('socket.io').listen(plainHttpServer);
io.sockets.on('connection', function(socket){
    socket.on('message', function(msg){
        if(msg === "Hello"){
            socket.send('socket.io!');
        }
    })
})