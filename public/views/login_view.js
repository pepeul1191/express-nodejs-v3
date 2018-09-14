var LoginView = Backbone.View.extend({
	el: '#login-view',
  initialize: function(){
  },
  events: {
    "click #forgotpassword": "forgotPasswordClick",
		"click #returnlogin": "returnLoginClick",
  },
  forgotPasswordClick: function(){
    $("#login-conatiner").fadeOut(500, "linear",function(){
      $("#fogot-email-conatiner").fadeIn(500);
    });
  },
	returnLoginClick: function(){
		$("#fogot-email-conatiner").fadeOut(500, "linear",function(){
      $("#login-conatiner").fadeIn(500);
    });
	},
});

new LoginView();
