var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


io.on('connection', function(socket) {
	// console.log('Client connected.');
	console.log(socket.id);
	console.log(this);

	socket.on('notifyMessage', function(message) {
		console.log('Message received: ', message);

		//broadcasts messages on all chat windows
		socket.broadcast.emit('message', message);
	});

	socket.on('notifyLogin', function(user) {
		console.log(user + ' just logged in');

		//broadcasts login
		socket.broadcast.emit('login', user);
		

		socket.on('disconnect', function() {
			//creates variable to list the user who logged out
			var disconnectMessage = user + ' just logged out.';

			//broadcasts logout message
			socket.broadcast.emit('message', disconnectMessage);
		});
	});
});

server.listen(8080);