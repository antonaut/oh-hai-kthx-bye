Meteor.subscribe('tasks');

Session.set('appName', 'Haiku 俳句');
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

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});