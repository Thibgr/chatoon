// PUBLIC VAR

var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


// CONNECTION ON CHAT
io.on('connection', function(socket, pseudo){ 
    
    socket.on('user', function (data){
        	console.log(data);
        	io.emit('user', data);
})

    socket.on('mess', function(data){
        console.log(data);
        io.emit('newmessage', {
        	pseudo: data.pseudo,
        	message: data.message
        }) 
    })  
})

// SECURITY SCRIPT 

app.use('/static/css', express.static(__dirname + '/public/css'));
app.use('/static/js', express.static(__dirname + '/public/js'));
app.use('/static/images', express.static(__dirname + '/public/images'));
app.use('/static/fonts', express.static(__dirname + '/public/fonts'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

// PORT 
server.listen(8080)
console.log('Server listening on port 1337')