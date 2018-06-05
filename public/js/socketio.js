var socket = io();


socket.on('connect', ()=>{
	console.log("connected to server");
})



								//message is the data from 'newMessage'
socket.on('newMessage', function (message) {
	for (var key in message.errors){
		var x = message.errors[key]
		for(var i in x){
			var error = x[i]
document.getElementById('error').innerText += '\n' + error
			console.log(error);
		}
	}
	})
	



socket.on('disconnect', ()=>{
	console.log("Disconnected from server");
})



	// socket.emit('createMessage', {
	// 	from: 'User',
	// 	text: document.forms[1].getElementsByTagName('input')
	// }, function(text){
	// 	console.log(text);
	// })



