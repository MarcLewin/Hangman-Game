// GLOBAL VARIABLES
// =============================================================================================================


var guessedLetters = [];

var heroes = ["ayn rand", "steven pressfield", "yuval noah harari", "oscar wilde", "marcel proust", 
"james joyce", "ernest hemingway", "anne rice", "peter thiel"];

var arr = heroes[Math.floor(Math.random() * heroes.length)];

// creating new array at arr.length
var empty = new Array(arr.length);

var numGuessRm = arr.length + 6;

var wrongGuess = 6;

var continueGame = true;




// FUNCTIONS
// ===================================================================================

// this for loop adds an underline to each letter of the heroe name or places a space if there is a space
for (var i = 0; i < arr.length; i++) {
	if (arr[i].indexOf(' ') >= 0) {
		empty[i] = "\u00A0";
	} 
	else {
	empty[i] = ' _ ';
	}	
}

function winCounter() {
	// Code for localStorage/sessionStorage
    if(typeof(Storage) !== "undefined") {
		// storing session storage at wincount
        if (sessionStorage.wincount) {
            sessionStorage.wincount = Number(sessionStorage.wincount)+1;
            wins = sessionStorage.wincount;
        } else {
            sessionStorage.wincount = 1;
            wins = 0;
        }
        document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
    } else {
        document.getElementById("wins").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function lossCounter() {
	// Code for localStorage/sessionStorage
    if(typeof(Storage) !== "undefined") {
		// storing session storage at losscount
        if (sessionStorage.losscount) {
            sessionStorage.losscount = Number(sessionStorage.losscount)+1;
            losses = sessionStorage.losscount;
        } else {
            sessionStorage.losscount = 1;
            losses = 0;
        }
        document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
    } else {
        document.getElementById("losses").innerHTML = "Sorry, your browser does not support web storage...";
    }
}


function include(arr, obj) {

		if (guessedLetters.indexOf(obj) > -1 && numGuessRm >= 1) {
			wrongGuess--;
			document.getElementById('status').innerHTML = 'That Letter was guessed, you have ' + wrongGuess + ' wrong guess\' remaining';
		} 
		else if (arr.indexOf(obj) === -1 && guessedLetters.indexOf(obj) === -1 && numGuessRm >= 1 && arr.split(" ").toString() != empty.join()) {
			wrongGuess--;
			document.getElementById('status').innerHTML = 'Try Again, you have ' + wrongGuess + ' wrong guess\' remaining';
		} 
		else {
			document.getElementById('status').innerHTML = 'Good Guess';
		}
		if (obj) {
			guessedLetters.push(obj);
		}
		for(var i = 0; i < arr.length; i++) {
			if (arr.split("")[i] === obj) { 
			    empty.splice(i, 1, obj);
			}
		}
}

function arraysEqual(arr1, arr2) {

	if (arr1.replace(" ", "") == arr2.join("").replace("\u00A0", "")) {
		winCounter();
		location.reload();
		return continueGame = true;
		
	} 
	else if (wrongGuess === 0) {
		lossCounter();
		location.reload();
		return continueGame = true;
		
	} 
}

	document.getElementById('word').innerHTML = empty.join(' ');
	document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');

	if (typeof(sessionStorage.wincount) == "undefined") {
		document.getElementById('wins').innerHTML = 'Wins: ' + 0;
	}
	else {
		document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
	}
	if (typeof(sessionStorage.losscount) == "undefined") {
		document.getElementById('losses').innerHTML = 'Losses: ' + 0;
	}
	else {
	 	 document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
	}
	
// ==========================================================================================


document.onkeyup = function(event) {

var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	
		 if (numGuessRm > 0) {
			numGuessRm --;
			include(arr, userGuess);
			arraysEqual(arr, empty);
		} 
	
		document.getElementById('word').innerHTML = empty.join(' ');
		document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');				
}