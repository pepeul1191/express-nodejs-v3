var ForgotPasswordView = Backbone.View.extend({
	el: '#forgot-password-container',
  initialize: function(){
  },
  events: {
    "click #btnResendEmail": "resendEmail",
  },
  resendEmail: function(){
		alert("resendEmail");
	},
});
