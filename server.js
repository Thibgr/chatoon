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
    
// Receiving message
    
    socket.on('mess', function(message){
        console.log('received', message)
        
        io.emit('newmessage', message)
        
        })
})

//Change the url for more security
app.use('/static/css', express.static(__dirname + '/public/css'));
app.use('/static/js', express.static(__dirname + '/public/js'));
app.use('/static/images', express.static(__dirname + '/public/images'));
app.use('/static/fonts', express.static(__dirname + '/public/fonts'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/views/index.html');
});

server.listen(1337);
console.log('server listening on port 1337')