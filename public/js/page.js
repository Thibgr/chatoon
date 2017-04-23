// script for socket client

var socket = io('http://localhost:1337');

socket.on('connect', function(){
});


$('a').bind('click', function(event){
  event.preventDefault();
 $(this).toggleClass('is-closed');
});


$('#wrapper-emoji').on('click', 'img', function(){
	var emote = $(this).attr('id');
	$('#textareamsg').val('<img class="emoji" src="static/images/'+emote+'.png">');
	$('#sendmsg').click();
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
	$('li').removeClass('grey red green blue yellow pink')
	$('li').addClass('pink')
	$('body').css("background-color", "#CC00BA")
	// $('li').css("background-color", "#FF5AF0")
})
$('#color2').click(function(){
	$('body').css("background-color", "#4DC5CC")
	$('li').css("background-color", "#ACFBFF")

})
$('#color3').click(function(){
	$('body').css("background-color", "#46CC4C")
	$('li').css("background-color", "#A4FFA8")
})
$('#color4').click(function(){
	$('body').css("background-color", "#FFF341")
	$('li').css("background-color", "#FFF88D")
})
$('#color5').click(function(){
	$('body').css("background-color", "#7F210A")
	$('li').css("background-color", "#FF8061")
})
$('#color6').click(function(){
	$('body').css("background-color", "#575757")
	$('li').css("background-color", "#C7C7C7")
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





