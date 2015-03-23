Meteor.startup(function() {
});

Meteor.publish("haikus", function() {
  return Haikus.find({
  });
});