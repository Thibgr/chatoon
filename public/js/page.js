// script for socket client

var socket = io('http://localhost:1337');

socket.on('connect', function(){
});


$('a').bind('click', function(event){
  event.preventDefault();
 $(this).toggleClass('is-closed');
});


$('section#load').delay(3000).hide(0);
$('section#connect').delay(3000).show(0);


/**
 * Scroll vers le bas de page si l'utilisateur n'est pas remonté pour lire d'anciens messages
 */

function scrollToBottom() {  
  if ($(window).scrollTop() + $(window).height() + 2 * $('#messages li').last().outerHeight() >= $(document).height()) {
    $("html, body, ul").animate({ scrollTop: $(document).height() }, 0);
  }
}


// var pseudo = prompt('Quel est votre pseudo ?');
// socket.emit('newuser', pseudo);

$('#sendpseudo').click(function(){
	if ($('#pseudo').val() <= 0){
	}else {
		$('section#connect').hide();
		$('section#chatcontainer').show();
	}
})





// Send message 
function sendmessage (){
	var input = document.getElementsByTagName('textarea')[0];

	console.log(input.value)

	if(input.value.length <= 0){
		alert('please write something')
	}else {
		socket.emit('mess', input.value)
	}
	$('textarea').val('').focus();

}

socket.on('response', function(data){
	scrollToBottom();
});

socket.on('newmessage', function(newmessage){
	var li = document.createElement('li');
	li.innerHTML = newmessage;
	document.getElementsByTagName('ul')[0].appendChild(li);
	scrollToBottom();

})


document.getElementById('sendmsg').addEventListener('click', sendmessage)

document.addEventListener('keydown', function (e){
	if (e.keyCode == 13 ){
		sendmessage()
	}
})








