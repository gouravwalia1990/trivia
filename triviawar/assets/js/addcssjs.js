
$(function() {
	$("#header").load("view/my-profile.html");
	$("#quiz-footer").load("view/quiz-page-powers.html");

});

function loadjscssfile(filename, filetype) {
	var fileref;
	if (filetype == "js") {
		fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
	} else if (filetype == "css") {
		fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if ( typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}

}

// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound

var html5_audiotypes = {//define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
	"mp3" : "audio/mpeg",
	"mp4" : "audio/mp4",
	"ogg" : "audio/ogg",
	"wav" : "audio/wav"
};

function createsoundbite(sound) {
	var html5audio = document.createElement('audio');
	if (html5audio.canPlayType) {//check support for HTML5 audio
		for (var i = 0; i < arguments.length; i++) {
			var sourceel = document.createElement('source');
			sourceel.setAttribute('src', arguments[i]);
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
			html5audio.appendChild(sourceel);
		}
		html5audio.load();
		html5audio.playclip = function() {
			html5audio.pause();
			html5audio.currentTime = 0;
			html5audio.play();
		};
		return html5audio;
	} else {
		return {
			playclip : function() {
				throw new Error("Your browser doesn't support HTML5 audio unfortunately");
			}
		};
	}
}

//Initialize two sound clips with 1 fallback file each:

var mouseoversound = createsoundbite("assets/sound-clips/click.ogg", "assets/sound-clips/click.mp3");
var clicksound = createsoundbite("assets/sound-clips/click.ogg", "assets/sound-clips/click.mp3");
var wrongsound = createsoundbite("assets/sound-clips/wrong_answer.mp3", "assets/sound-clips/wrong_answer.ogg");
var correctsound = createsoundbite("assets/sound-clips/correct_answer.mp3", "assets/sound-clips/correct_answer.ogg");
function redirectOnLogin() {

	setTimeout(function() {
		window.location = "view/login.html";
	}, 300);

}

loadjscssfile("assets/css/bootstrap.min.css", "css");

loadjscssfile("http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css", "css");

loadjscssfile("assets/css/style.css", "css");

loadjscssfile("assets/js/bootstrap.js", "js");

loadjscssfile("assets/js/less.js", "js");

loadjscssfile("assets/js/validation.js", "js");

loadjscssfile("assets/js/script.js", "js");

//loadjscssfile("assets/js/howler.min.js", "js");

loadjscssfile("assets/js/spin.js", "js");

loadjscssfile("assets/js/custom-scrollbar-js/jquery.mCustomScrollbar.concat.min.js", "js");

loadjscssfile("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css", "css");

loadjscssfile("assets/css/jquery.mCustomScrollbar.css", "css");

