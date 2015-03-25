Meteor.methods({
  addHaiku: function(text, textFont, textColor, imageSrc) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    //Checks that the color is allowed
    var colorAllowed = false;
    for (var indexColor in availableTextColors) {
      if (availableTextColors[indexColor][code] === textColor) {
        colorAllowed = true;
      }
    }
    if (!colorAllowed) {
      throw new Meteor.Error("incorrect-input");
    } else {
      //Checks that the font is allowed
      var fontAllowed = false;
      for (var indexFont in availableTextFonts) {
        if (availableTextFonts[indexFont][name] === textFont) {
          fontAllowed = true;
        }
      }
      if (!fontAllowed) {
        throw new Meteor.Error("incorrect-input");
      } else {
        //Insert into collection
        Haikus.insert({
          text: text,
          textFont: textFont,
          textColor: textColor,
          imageSrc: imageSrc,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      }
    }
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
    } else {
      var likeInfo = {
        userId: Meteor.userId(),
        haikuId: haikuId
      };
      var existingLikes = Likes.findOne(likeInfo);
      if (existingLikes !== null) {
        Likes.remove(likeInfo);
      } else {
        Likes.insert(likeInfo);
      }
    }
  },
  addComment: function(haikuId, text) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Comments.insert({
        userId: Meteor.userId(),
        haikuId: haikuId,
        text: text
      });
    }
  },
  removeComment: function(commentId) {
    var comment = Haikus.findOne({
      _id: commentId
    });
    var commentingUserId = comment["user"];

    if (commentingUserId !== Meteor.userId() || !Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Comments.remove({
        _id: commentId
      });
    }
  }
});