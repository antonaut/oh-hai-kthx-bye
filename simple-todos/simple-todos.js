var Tasks = new Mongo.Collection("tasks");
var logRes = function(error, result) {
  if (error) {
    console.error(error.message);
  }
  if (result) {
    console.info(result);
  }
};

if (Meteor.isClient) {

  Meteor.subscribe('tasks');
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.set('appName', 'Simple-Todos');
  document.title = Session.get('appName');
  var incompleteCount = function() {
    return Tasks.find({
      checked: {
        $ne: true
      }
    }).count();
  };
  var totalCount = function() {
    return Tasks.find({}).count();
  };

  Template.body.helpers({
    tasks: function() {
      return Tasks.find({});
    },
    appname: function() {
      return Session.get('appName');
    },
    incompleteCount: incompleteCount,
    totalCount: totalCount,
    doneCount: function() {
      return totalCount() - incompleteCount();
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Meteor.call('addTask', text, logRes);

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // Set the checked property to the opposite of its current value
      Meteor.call('setChecked', this._id, !this.checked, logRes);
    },
    "click .delete": function() {
      Meteor.call('deleteTask', this._id, logRes);
    },
    "click .toggle-private": function() {
      Meteor.call("setPrivate", this._id, !this.private);
    }
  });

  Template.task.helpers({
    isOwner: function() {
      return this.owner === Meteor.userId();
    }
  });

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function() {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
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
}

Meteor.methods({
  addTask: function(text) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function(taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId() || !Meteor.user()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    } else {
      Tasks.remove(taskId);
    }
  },
  setChecked: function(taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId() || !Meteor.user()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    } else {
      Tasks.update(taskId, {
        $set: {
          checked: setChecked
        }
      });
    }
  },
  setPrivate: function(taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }
});