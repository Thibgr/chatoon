// script for socket client

var socket = io('http://localhost:1337');

socket.on('connect', function(){
});


$('a').bind('click', function(event){
  event.preventDefault();
 $(this).toggleClass('is-closed');
});


$('#emot1').click(function(){
	var emot =
})

$('section#load').delay(3000).hide(0);
$('section#connect').delay(3000).show(0);


$('#menulogo').click(function(){
	$('section#menu').toggle(function(){
		if ($(this).is(':visible')) {}
        else if ($(this).is(':hidden')) {}
	});
});

$('#color1').click(function(){
	$('body').css("background-color", "skyblue")
})
$('#color2').click(function(){
	$('body').css("background-color", "yellow")
})
$('#color3').click(function(){
	$('body').css("background-color", "grey")
})
$('#color4').click(function(){
	$('body').css("background-color", "red")
})
$('#color5').click(function(){
	$('body').css("background-color", "black")
})
$('#color6').click(function(){
	$('body').css("background-color", "deeppink")
})

/**
 * Scroll vers le bas de page si l'utilisateur n'est pas remonté pour lire d'anciens messages
 */

function scrollToBottom() {  
  if ($(window).scrollTop() + $(window).height() + 2 * $('#messages li').last().outerHeight() >= $(document).height()) {
    $("html, body, ul").animate({ scrollTop: $(document).height() }, 0);
  }
}

var pseudo;

// var pseudo = prompt('Quel est votre pseudo ?');
// socket.emit('newuser', pseudo);

$('#sendpseudo').click(function(){
	if ($('#pseudo').val() <= 0){
	}else { 
		pseudo = $('#pseudo').val();
		$('section#connect').hide();
		$('section#chatcontainer').show();
	}
})

// Send message 
function sendmessage (){
	var input = document.getElementsByTagName('textarea')[0];

	if(input.value.length <= 0){
		alert('please write something')
	}else {
		socket.emit('mess', {
			pseudo: pseudo,
			message: input.value
		})
	}
	$('textarea').val('').focus();

}

socket.on('response', function(data){
	scrollToBottom();
});

socket.on('newmessage', function(newmessage){
	var bubble = [
	'<h2>'+newmessage.pseudo+'</h2>'+
	'<li>'+newmessage.message+'</li>'
	].join();
	$('ul').append(bubble);
	scrollToBottom();
})


document.getElementById('sendmsg').addEventListener('click', sendmessage)

document.addEventListener('keydown', function (e){
	if (e.keyCode === 13 ){
		event.preventDefault();
		sendmessage();
		$('#sendpseudo').click();
	}
})





