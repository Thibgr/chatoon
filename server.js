// variables
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


// Connection on a room
io.on('connection', function(socket){ 
    
// new connection
    console.log('New connection in here')
    console.log(socket.id)  
})


server.listen(1337);
console.log('server listening on port 1337')