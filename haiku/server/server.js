Meteor.startup(function() {
    Meteor.call('addHaiku',"hejhej","Times New Roman","#0000FF","isdfsd.jpg");
});

Meteor.publish("haikus", function() {
  return Haikus.find({
  });
});
Meteor.publish("comments", function(){
    return Comments.find();
});
Meteor.publish("likes", function(){
    return Likes.find();
});
