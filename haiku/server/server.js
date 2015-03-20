Meteor.startup(function() {
  // code to run on server at startup
  var ntasks = Tasks.find().count();
  if (ntasks == 0) {
    Tasks.insert({
      text: "Hello world!",
      createdAt: new Date()
    });
  }
});

Meteor.publish("tasks", function() {
  return Tasks.find({
    $or: [{
      private: {
        $ne: true
      }
    }, {
      owner: this.userId
    }]
  });
});