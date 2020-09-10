var WSServer = require('ws').Server;
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('./client.html');


var server = http.createServer("/", function(req, res){     
    res.end(index);
});

var wss = new WSServer({ server });
console.log(wss);
wss.on('connection', function(socket, req) { 
    socket.on('message', function(msg){
        console.log('Recieved: ', msg, '\n', 'From IP: ',  req.socket.remoteAddress);

        if(msg === 'Hello'){
            socket.send("Websockets!");
        }
    });

    socket.on('close', function(code, desc){
        console.log('Disconnect: ' + code + ' - ' + desc);
    });   
     
});

server.listen(3000);