Meteor.subscribe('haikus');
Meteor.subscribe("likes");
Meteor.subscribe('comments');
Meteor.subscribe('users');

Session.set('appName', 'Haiku 俳句');
Session.set('lastImageSearch', new Date());
document.title = Session.get('appName');



Template.registerHelper("isLoggedIn",function(){
  return Boolean(Meteor.userId());
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

shareConfig = {

};

UserStatus.on("sessionLogout",function(){
	Router.go("/");
});