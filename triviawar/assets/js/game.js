/*************** check page  ***************/
$(document).ready(function() {
	if (page == "newGame.html") {

		var currentUser = Parse.User.current();

		if (!currentUser) {
			window.location = "view/index.html";
		}

	} else if (page == "spin.html") {

		var currentUser = Parse.User.current();

		if (!currentUser) {

			window.location = "view/index.html";

		} else {

			spin();

		}

	}

});

/****************** Spin game round ********************/
function spin() {
	
	$(".username").html(Parse.User.current().get("username"));
	
}

/****************** Start new game ***************/
function playGame() {

	var gameMode = $("#gameMode").val();
	var gameOpponent = $("#gameOpponent").val();
	var gamePlayersLimit = 0;
	var gameId;

	if (gameMode == 'classic') {

		if (gameMode == 'friends') {

			gamePlayersLimit = 2;

		} else {

			gamePlayersLimit = 2;

		}

	} else {

		if (gameMode == 'friends') {

			gamePlayersLimit = 10;

		} else {

			gamePlayersLimit = 10;

		}

	}

	var Game = Parse.Object.extend("Game");
	var newGame = new Game();

	newGame.set("gameMode", gameMode);
	newGame.set("gameOpponent", gameOpponent);
	newGame.set("gameStatus", 'start');
	newGame.set("gamePlayersLimit", gamePlayersLimit);
	newGame.set("playersCount", 1);

	if (gameMode) {

		newGame.save({
			success : function(object) {

				gameId = object.id;

				var User = Parse.Object.extend("User");

				var query = new Parse.Query(User);

				query.equalTo("email", Parse.User.current().get("email"));

				query.first({

					success : function(object) {

						console.log(JSON.stringify(object));

						var GamePlayers = Parse.Object.extend("GamePlayers");

						var newPlayers = new GamePlayers();

						newPlayers.set("playerId", object.id);
						newPlayers.set("gameId", gameId);
						
						localStorage.setItem("currentGame",gameId);
						
						newPlayers.set("playerType", "owner");
						newPlayers.set("gameScore", 0);
						newPlayers.set("gameRound", 1);
						newPlayers.set("gameStatus", "new game");

						console.log("newPlayers :=" + JSON.stringify(newPlayers));

						newPlayers.save({
							success : function() {
								window.location = "view/spin.html";
							},
							error : function(error) {
								alert("error");
								failResponse(error.message);
							}
						});

					},
					error : function(error) {

						failResponse(error.message);

					}
				});

			},
			error : function(error) {
				failResponse(error.message);
			}
		});
	}

}

/*
 * http://abpmajha.abplive.in/videos/2015/08/13/article684102.ece/nana-patekar#.Vc8Ja9Slyko
 * /
 */