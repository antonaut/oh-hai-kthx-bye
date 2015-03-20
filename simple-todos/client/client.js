
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