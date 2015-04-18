Meteor.startup(function() {
});


Meteor.publish("haikus", function() {
	return Haikus.find({});
});
Meteor.publish("comments", function() {
	return Comments.find();
});
Meteor.publish("likes", function() {
	return Likes.find();
});

Meteor.publish('flickr', function(){
	return Flickr.find();
});