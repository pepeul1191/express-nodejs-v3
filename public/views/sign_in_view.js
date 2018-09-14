var SignInView = Backbone.View.extend({
	el: '#sign-in-container',
	initialize: function(){
  },
  events: {
    "click #btnCreateUser": "createUser",
  },
  createUser: function(){
		alert("createUser");
	},
});
