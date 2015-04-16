Meteor.subscribe('haikus');
Meteor.subscribe("likes");
Meteor.subscribe('comments');

Session.set('appName', 'Haiku 俳句');
document.title = Session.get('appName');

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});