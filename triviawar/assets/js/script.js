/*************** check page  ***************/
$(document).ready(function() {

	if (page == "index.html") {

		checkUserSession();

	} else if (page == "verifyEmail.html") {

		checkUserSession();

	} else if (page == "login.html") {

		checkUserSession();

	} else if (page == "signup.html") {

		$("#signupEmail").val(localStorage.getItem("email"));
		checkUserSession();

	} else if (page == "dashboard.html") {

		setTimeout(function() {

			setUserDashboard();

		}, 200);

	}
	

	var currentUser = Parse.User.current();
	if (currentUser) {

		setTimeout(function() {
			setUserProfile();
		}, 200);
	}

});

/****************************** Check User Status ***************************/
function checkUserSession() {

	var currentUser = Parse.User.current();

	if (currentUser) {

		window.location = "view/dashboard.html";

	} else {
		
		Parse.User.logOut();
		
	}
}

/****************************** Check Game Life Line ***************************/
function checkGameLifeLine(str) {

	var currentlives = parseInt($(".currentlives").html());

	var currentUser = Parse.User.current();

	var d = new Date();

	if (currentlives > 0) {

		var User = Parse.Object.extend("User");

		var query = new Parse.Query(User);

		query.equalTo("email", Parse.User.current().get("email"));

		//alert(Parse.User.current().get("resetLifeTimer"));

		query.first({

			success : function(object) {

				var currentlives1;

				if (str == 'decrement') {
					currentlives1 = currentlives - 1;
				} else {
					currentlives1 = currentlives + 1;
				}

				object.set("currentlives", currentlives1);

				if (str == 'decrement' && ((currentlives1 + 1) == 3)) {

					object.set("resetLifeTimer", d);
				}

				object.save();

				if (str == 'decrement') {

					window.location = "view/newGame.html";

				} else {

					dispLifeCounter();

				}

			},
			error : function(error) {

				failResponse(error.message);

			}
		});

	} else {

		failResponse("Your game lifeline is 0");

	}
}

/****************************** set User Dashboard ***************************/
var date1;

function setUserDashboard() {

	var User = Parse.Object.extend("User");

	var query = new Parse.Query(User);

	query.find({
		success : function(results) {

			for (var i in results) {

				if (results[i].get("email") == Parse.User.current().get("email")) {

					if (results[i].get("currentlives") < 3) {

						console.log("resetLifeTimer := " + results[i].get("resetLifeTimer"));

						date1 = new Date(results[i].get("resetLifeTimer"));

						console.log("date1 := " + date1);

						dispLifeCounter();
					}

					$(".currentlives").html(results[i].get("currentlives"));

					break;
				}
			}

		},
		error : function(error) {
			console.log("Query Error := " + error.message);
		}
	});

}

function dispLifeCounter() {

	setTimeout(function() {

		var date2 = new Date();

		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		var difference_ms = date2_ms - date1_ms;

		//take out milliseconds
		difference_ms = difference_ms / 1000;
		var seconds = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var minutes = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var hours = Math.floor(difference_ms % 24);
		var days = Math.floor(difference_ms / 24);

		console.log(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds');

		if ((60 - minutes) <= 0) {

			checkGameLifeLine("increament");

		} else {

			$(".gameLifeLineTime").html(("0" + (59 - minutes)).slice(-2) + " : " + ("0" + (59 - seconds)).slice(-2));
			//console.log(60 - difference_ms);
			dispLifeCounter();
		}

	}, 1000);

}

/****************************** setUserProfile ***************************/
function setUserProfile() {

	var currentUser = Parse.User.current();

	if (currentUser) {

		$(".name").html(Parse.User.current().get("username"));
		$(".email").html(Parse.User.current().get("email"));

	} else {

		failResponse("Your session has been expired. Please start again");

		setTimeout(function() {

			window.location = "view/index.html";

		}, 500);
	}

}

/****************************** logout ***************************/
function logout() {
	Parse.User.logOut();
	window.location = "view/index.html";
}

/****************************** signup ***************************/
function signup() {

	var signupUserName = $("#signupUserName").val();
	var signupPassword = $("#signupPassword").val();
	var signupEmail = $("#signupEmail").val();

	var user = new Parse.User();

	user.set("username", signupUserName.toLowerCase());
	user.set("password", signupPassword.toLowerCase());
	user.set("email", signupEmail.toLowerCase());
	user.set("currentlives", 3);

	$(".signupProgressBar").removeClass("hide");

	user.signUp(null, {
		success : function(user) {

			$(".signupProgressBar").addClass("hide");

			successResponse("signup success");
			
			localStorage.setItem("currentUserId",user.id);

			setTimeout(function() {
				window.location = "view/dashboard.html";
			}, 3000);

		},
		error : function(user, error) {

			$(".signupProgressBar").addClass("hide");
			failResponse(error.message);
		}
	});
}

/****************************** signin ***************************/
function signin() {

	Parse.User.logOut();

	$(".signinProgressBar").removeClass("hide");

	var name = $("#signinUserName").val();
	var pass = $("#signinPassword").val();
	//alert("name :=" + name + "pass:=" + pass);

	Parse.User.logIn(name, pass, {
		success : function(user) {
			
			localStorage.setItem("currentUserId",user.id);
			
			$(".signinProgressBar").addClass("hide");

			successResponse("login success");

			setTimeout(function() {
				window.location = "view/dashboard.html";
			}, 3000);

		},
		error : function(user, error) {
			console.log("LogIn error := " + error.message);
			$(".signinProgressBar").addClass("hide");

			failResponse(error.message);
		}
	});

}

/************************** verify email in database **********************/
function verifyEmail() {

	var email_id = $("#verifyEmail").val();

	var User = Parse.Object.extend("User");

	var query = new Parse.Query(User);

	query.find({
		success : function(results) {

			var emailFlag = false;

			if (results.length > 0) {

				for (var i in results) {

					var email = results[i].get("email");

					if (email_id == email) {

						emailFlag = true;
						break;
					}

				}

			}

			localStorage.setItem("email", email_id);

			if (emailFlag == true) {
				window.location = "view/login.html";
			} else {
				window.location = "view/signup.html";
			}

		},
		error : function(error) {

			alert("Query Error := " + error.message);

		}
	});

}

/***************************************** If Ajax Response Is Success **********************/
function successResponse(msg) {

	$("#responseMessage").html(msg).addClass('text-success');
	$("#responseModal").modal('show');
	setTimeout(function() {
		$("#responseModal").modal('hide');
	}, 3000);
}

/***************************************** If Ajax Response Is Fail **********************/
function failResponse(msg) {

	$("#responseMessage").html(msg).addClass('text-danger');
	$("#responseModal").modal('show');
	setTimeout(function() {
		$("#responseModal").modal('hide');
		$("#responseMessage").removeClass('text-danger');
		$("#responseMessage").removeClass("errorModal");
	}, 3000);

}