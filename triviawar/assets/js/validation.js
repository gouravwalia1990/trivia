(
	(function($, D) {
		'use strict';
		var JQUERY4U = {};

		JQUERY4U.UTIL = {

			setupFormValidation : function() {

				$("#signupForm").validate({

					rules : {
						signupUserName : {
							required : true,
							minlength : 6,
							maxlength : 20
						},
						signupPassword : {
							required : true,
							minlength : 6,
							maxlength : 20
						},
						signupConfirmPassword : {
							required : true,
							equalTo : "#signupPassword"
						}
					},
					messages : {
						signupUserName : {
							required : "Username is required field",
							minlength : "Username minimum 6 characters required",
							maxlength : "Username maximum 20 characters allowed"
						},
						signupPassword : {
							required : "Password is required",
							minlength : "Password must be at least 6 characters",
							maxlength : "Password maximum 20 characters allowed"
						},
						signupConfirmPassword : {
							required : "Confirm Password is required",
							equalTo : "Password and confirm password does not match"
						}
					},
					submitHandler : function(form) {
						form.submit();
					}
				});
				
				
				$("#emailForm").validate({

					rules : {
						verifyEmail : {
							required : true
						}
					},
					messages : {
						verifyEmail : {
							required : "Email is required "
						}
					},
					submitHandler : function(form) {
						form.submit();
					}
				});
				
				$("#emailrecoveryForm").validate({

					rules : {
						verifyEmail : {
							required : true
						}
					},
					messages : {
						verifyEmail : {
							required : "Email is required "
						}
					},
					submitHandler : function(form) {
						form.submit();
					}
				});
				$("#signinForm").validate({

					rules : {
						signinUserName : {
							required : true
						},
						signinPassword : {
							required : true,
							minlength : 6,
							maxlength : 20
						}
					},
					messages : {
						signinUserName : {
							required : "Username is required field"
						},
						signinPassword : {
							required : "Password is required",
							minlength : "Password must be at least 6 characters",
							maxlength : "Password maximum 20 characters allowed"
						}
					},
					submitHandler : function(form) {
						form.submit();
					}
				});
				
				

			}
		};

		$(D).ready(function() {
			JQUERY4U.UTIL.setupFormValidation();
		});

})(jQuery, document));

