$(function() {
	Parse.initialize("YKhgseVvbcmoXniYoMbUp32y9aZONzwuOxFqSdDF", "RYW7xS5OxeB2XvNy8q39fMWmOxHg0Msm2eAKcHRm");
});

//check page name
var path = window.location.pathname;
var page = path.split("/").pop();

/*************** Redirect  ***************/
function redirectTo(form, pageID) {

	var pageValid = $("#" + pageID).valid();

	//alert("pageID :=" + pageID + "pageValid := " + pageValid);
	if (pageValid) {

		switch(pageID) {

		case "signupForm":
			signup();
			break;

		case "signinForm":
			signin();
			break;

		case "emailForm":
			verifyEmail();
			break;

		default:
			//checkUserType();
			break;

		}

		return false;
	}

}

function redirectTo2(redirectString) {

	setTimeout(function() {

		switch(redirectString) {

		case "login":
			window.location = "view/login.html";
			break;

		case "verifyemail":
			window.location = "view/verifyEmail.html";
			break;

		case "signup":
			window.location = "view/signup.html";
			break;

		case "pasword-recovery":
			window.location = "view/password-recovery.html";
			break;

		case "dashboard":
			window.location = "view/dashboard.html";
			break;

		case "index":
			window.location = "view/index.html";
			break;

		case "spin":
			window.location = "view/spin.html";
			break;

		case "newGame":
			checkGameLifeLine("decrement");
			break;

		}

	}, 300);

}

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

			setUserProfile();

			setUserDashboard();

		}, 50);

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

				//alert("d :="+d);

				object.set("resetLifeTimer", d);

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

						date1 = new Date(results[i].get("resetLifeTimer"));

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

		var timeDiff = date2.getTime() - date1.getTime();

		var diffDays = (timeDiff / 60000).toString();

		if ((60 - ( (parseFloat(diffDays)).toFixed(2)) ).toFixed(2) <= 0) {

			checkGameLifeLine("increament");

		} else {

			$(".gameLifeLineTime").html((60 - ( (parseFloat(diffDays)).toFixed(2)) ).toFixed(2));
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