var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log('new connection on socket')
	console.log(socket.id)

	// socket.on('message', function(data){
	// 	console.log('New event \'test\' receive with value' )
	// 	console.log(data)

	// 	socket.emit( 'response', {
	// 		success: true,
	// 		message: data.msg,
	// 		timestamp_received : data.timestamp,
	// 		timestamp_sent : new Date().getTime(),
	// 		response: 'alla wuakbar'
	// 	})
	// });

	socket.on('message', function(message){
		console.log('received', message)
		
		io.emit('newmessage', message)

	})
});

app.use('/static/css', express.static(__dirname + '/public/css'));
app.use('/static/js', express.static(__dirname + '/public/js'));
app.use('/static/images', express.static(__dirname + '/public/images'));
app.use('/static/fonts', express.static(__dirname + '/public/fonts'));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

server.listen(1337)
console.log('server listening on port 1337')