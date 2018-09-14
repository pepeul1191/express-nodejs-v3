var loginRouter = Backbone.Router.extend({
  initialize: function() {
    new LoginView();
  },
  routes: {
    "": "index",
    "sign_in" : "signIn",
    "forgot_password": "forgotPassword",
    "*actions" : "default",
  },
  index: function(){
    if($("#forgot-password-container").is(':visible')){
      $("#forgot-password-container").fadeOut(500, "linear",function(){
        $("#login-container").fadeIn(500);
      });
    }else if($("#sign-in-container").is(':visible')){
      $("#sign-in-container").fadeOut(500, "linear",function(){
        $("#login-container").fadeIn(500);
      });
    }else{
      $("#login-container").fadeIn(1000);
    }
  },
  forgotPassword: function(){
    if($("#login-container").is(':visible')){
      $("#login-container").fadeOut(500, "linear",function(){
        $("#forgot-password-container").fadeIn(500);
      });
    }else if($("#sign-in-container").is(':visible')){
      $("#sign-in-container").fadeOut(500, "linear",function(){
        $("#forgot-password-container").fadeIn(500);
      });
    }else{
      $("#forgot-password-container").fadeIn(1000);
    }
  },
  signIn: function(){
    if($("#login-container").is(':visible')){
      $("#login-container").fadeOut(500, "linear",function(){
        $("#sign-in-container").fadeIn(500);
      });
    }else if($("#forgot-password-container").is(':visible')){
      $("#forgot-password-container").fadeOut(500, "linear",function(){
        $("#sign-in-container").fadeIn(500);
      });
    }else{
      $("#sign-in-container").fadeIn(1000);
    }
  },
  default: function() {
    window.location.href = BASE_URL + "error/access/404";
  },
});

$(document).ready(function(){
  router = new loginRouter();
  Backbone.history.start();
})
