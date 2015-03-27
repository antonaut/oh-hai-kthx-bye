Meteor.subscribe('haikus');
Meteor.subscribe("likes");
Meteor.subscribe('comments');

Session.set('appName', 'Haiku 俳句');
document.title = Session.get('appName');
var incompleteCount = function() {
  return Haikus.find({
    checked: {
      $ne: true
    }
  }).count();
};
var totalCount = function() {
  return Haikus.find({}).count();
};

Template.firstPage.helpers({
  latestHaikus: function() {
    var haikus = Haikus.find({}).map(function(document, index){
          document.toTheLeft = index%2===0;
          document.imagesSecond = index%4>=2;
          return document;
      });

      return haikus;
  },

  mostLikedHaikus: function () {
    /* TODO
    Translate to MongoDB (SQL not tested)
     SELECT *
     FROM Haikus
     WHERE haikuid IN (
         SELECT haikuId
         FROM (
             SELECT haikuId,COUNT(*) AS count
             FROM Likes
             GROUP BY haikuId
             SORT BY count
             LIMIT 100
         )
     )
      */
      //Starting to try:
      Likes.aggregate([
          {$group : {haikuId:"$haiku", count:{$sum:1}},$sort:{count:-1},$limit:100}
      ]);
  },
  appname: function() {
    return Session.get('appName');
  }
});

Template.body.events({
  /*"submit .new-task": function(event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;

    Meteor.call('addHaiku', text, logRes);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }*/
});

Template.task.events({
  /*"click .toggle-checked": function() {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this._id, !this.checked, logRes);
  },
  "click .delete": function() {
    Meteor.call('deleteHaiku', this._id, logRes);
  },
  "click .toggle-private": function() {
    Meteor.call("setPrivate", this._id, !this.private);
  }*/
});

Template.task.helpers({
  isOwner: function() {
    return this.owner === Meteor.userId();
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});