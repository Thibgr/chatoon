// PUBLIC VAR

var socket = io('http://localhost:8080');
var pseudo;

// FUNCTION SEND EMOJI

$('#wrapper-emoji').on('click', 'img', function(){
	var emote = $(this).attr('id');
	$('#textareamsg').val('<img class="emoji" src="static/images/'+emote+'.png">');
	$('#sendmsg').click();
})

// SECTION ANIMATION LOGO BEGINING

$('section#load').delay(3000).hide(0);
$('section#connect').delay(3000).show(0);


// FUNCTION MENU BURGER

$('a').bind('click', function(event){
  event.preventDefault();
 $(this).toggleClass('is-closed');
});

$('#menulogo').click(function(){
	$('section#menu').toggle(function(){
		if ($(this).is(':visible')) {}
        else if ($(this).is(':hidden')) {}
	});
});

// FUNCTION CHANGE COLOR THEME

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


// FUNCTION LOGIN PSEUDO

$('#sendpseudo').click(function(){
	if ($('#pseudo').val() <= 0){
	}else { 
		pseudo = $('#pseudo').val();
		$('section#connect').hide();
		$('section#chatcontainer').show();
	}
})

// SCRIPT FOR SOCKET
// SEND MESSAGE

socket.on('connect', function(){
});

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
	$('#messages').scrollTop($('#messages')[0].scrollHeight); // AUTOMATIC SCROLL
});

socket.on('newmessage', function(newmessage){
	var bubble = [
	'<h2>'+newmessage.pseudo+'</h2>'+
	'<li >'+newmessage.message+'</li>'
	].join();
	$('ul').append(bubble);
	$('#messages').scrollTop($('#messages')[0].scrollHeight); // AUTOMATIC SCROLL
})


document.getElementById('sendmsg').addEventListener('click', sendmessage)

// SCRIPT KEYPRESS ENTER

document.addEventListener('keydown', function (e){
	if (e.keyCode === 13 ){
		event.preventDefault();
		sendmessage();
		$('#sendpseudo').click();
	}
})
