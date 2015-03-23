Meteor.methods({
  addHaiku: function(text,imageSrc) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Haikus.insert({
      text: text,
      imageSrc: imageSrc,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteHaiku: function(haikuId) {
    var haiku = Haikus.findOne(haikuId);
    if (haiku.owner !== Meteor.userId() || !Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Haikus.remove(haikuId);
    }
  },
  addRemoveLike: function(haikuId) {
      if (!Meteor.user()) {
          throw new Meteor.Error("not-authorized");
      }
      else {
          var likeInfo = {
              userId: Meteor.userId(),
              haikuId: haikuId
          };
          var existingLikes = Likes.findOne(likeInfo);
          if (existingLikes !== null) {
              Likes.remove(likeInfo);
          }
          else {
              Likes.insert(likeInfo);
          }
      }
  },
  addComment: function(haikuId,text){
      if (!Meteor.user()) {
          throw new Meteor.Error("not-authorized");
      }
      else{
          Comments.insert({
              userId: Meteor.userId(),
              haikuId: haikuId,
              text: text
          });
      }
  },
  removeComment: function(commentid)  {
      var comment = Haikus.findOne(commentid);
      var commentingUserId= comment["user"];

      if (commentingUserId !== Meteor.userId() || !Meteor.user()){
          throw new Meteor.Error("not-authorized");
      }
      else{
          Comments.remove({userId:commentid});
      }
  }
});