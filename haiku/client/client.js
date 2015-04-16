Meteor.subscribe('haikus');
Meteor.subscribe("likes");
Meteor.subscribe('comments');

Session.set('appName', 'Haiku 俳句');
document.title = Session.get('appName');



Template.registerHelper("isLoggedIn",function(){
  return Boolean(Meteor.userId());
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});