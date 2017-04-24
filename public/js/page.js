var socket = io('http://localhost:8080');
var pseudo;
var i = 0;

// FUNCTION SEND EMOJI

$('#wrapper-emoji').on('click', 'img', function(){
	var emote = $(this).attr('id');
	$('#textareamsg').val('<img class="emoji" src="static/images/'+emote+'.png">');
	$('#sendmsg').click();
})

// SECTION ANIMATION LOGO BEGINING

$('section#load').delay(3000).hide(0)
$('section#connect').delay(3000).fadeIn(1000);


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

$("#color1").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })

$("#color2").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })

$("#color3").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })

$("#color4").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })

$("#color5").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })

$("#color6").click(function(){
       var previous = $("body").attr("class");
       var color = $(this).attr("id");
       $("body").removeClass(previous).addClass(color);
   })


// FUNCTION LOGIN PSEUDO

$('#sendpseudo').click(function(){
	if ($('#pseudo').val() <= 0){
	}else { 
		pseudo = $('#pseudo').val();
		socket.emit('user', pseudo)
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

socket.on('user', function(data){
	var newconnect = 
	'<p class="newconnect">'+ data + " joined the chat" +'</p>';
	$('#messages').append(newconnect);
})

socket.on('response', function(data){
	$('#messages').scrollTop($('#messages')[0].scrollHeight); // AUTOMATIC SCROLL
});

socket.on('newmessage', function(newmessage){
	var bubble = [
	'<h2>'+newmessage.pseudo+'</h2>'+
	'<li>'+newmessage.message+'</li>'
	].join();
	$('ul').append(bubble);
	$('#messages').scrollTop($('#messages')[0].scrollHeight); // AUTOMATIC SCROLL
})


document.getElementById('sendmsg').addEventListener('click', sendmessage)

// SCRIPT KEYPRESS ENTER

document.addEventListener('keydown', function (e){
	if (e.keyCode === 13 ){
		event.preventDefault();
		if (i == 0){
			$('#sendpseudo').click();
			++i;
		}
		else {
			sendmessage();
		}
	}
})
