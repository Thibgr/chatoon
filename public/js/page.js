// script for socket client

var socket = io('http://localhost:1337');

socket.on('connect', function(){
	console.log('Nouveau socket !!!')
	console.log(socket.id); ///G5p5...

});

/**
 * Scroll vers le bas de page si l'utilisateur n'est pas remonté pour lire d'anciens messages
 */
function scrollToBottom() {  
  if ($(window).scrollTop() + $(window).height() + 2 * $('#messages li').last().outerHeight() >= $(document).height()) {
    $("html, body, ul").animate({ scrollTop: $(document).height() }, 0);
  }
}


function sendmessage (){
	var input = document.getElementsByTagName('input')[0];

	console.log(input.value)

	if(input.value.length <= 0){
		return alert('please write something')
	}

	socket.emit('message', input.value)
	input.value =''

}

socket.on('response', function(data){
	console.log('Client : Response received:')
	console.log(data);
	scrollToBottom();
});

socket.on('newmessage', function(newmessage){
	console.log('newmessage', newmessage )

	var li = document.createElement('li');
	li.innerHTML = newmessage;
	document.getElementsByTagName('ul')[0].appendChild(li);
	scrollToBottom();

})


document.getElementsByTagName('button')[0].addEventListener('click', sendmessage)

document.addEventListener('keydown', function (e){
	if (e.keyCode == 13 ){
		sendmessage()
	}
})
