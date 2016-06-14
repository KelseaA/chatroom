$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var userName = prompt('What is your name?');

    socket.emit('notifyLogin', userName);


    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var clientLogin = function(userName){
        messages.append('<div>' + userName + ' just logged in!</div>');
    }

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = userName + ': ' + input.val();

        addMessage(message);
        socket.emit('notifyMessage', message);
        input.val('');
    });

    socket.on('message', addMessage);
    socket.on('login', clientLogin);
});
