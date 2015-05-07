Meteor.methods({
  addHaiku: function(poemRow1, poemRow2, poemRow3, textFont, textColor, imageSrc) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (!(typeof poemRow1 === "string" && typeof poemRow2 === "string" && typeof poemRow3 === "string" && typeof imageSrc === "string")) {
      throw new Meteor.Error("incorrect-input")
    }

    //Checks that the color is allowed
    var colorAllowed = false;
    for (var indexColor in availableTextColors) {
      if (availableTextColors[indexColor].code === textColor) {
        colorAllowed = true;
      }
    }

    if (!colorAllowed) {
      throw new Meteor.Error("incorrect-input");
    }

    //Checks that the font is allowed
    var fontAllowed = false;
    for (var indexFont = 0; indexFont < availableTextFonts.length; indexFont++) {
      if (availableTextFonts[indexFont].filePath === textFont) {
        fontAllowed = true;
      }
    }
    if (!fontAllowed) {
      throw new Meteor.Error("incorrect-input");
    } else {
      //Insert into collection
      Haikus.insert({
        poemRow1: poemRow1,
        poemRow2: poemRow2,
        poemRow3: poemRow3,
        textFont: textFont,
        textColor: textColor,
        imageSrc: imageSrc,
        createdAt: new Date(),
        shares: 0,
        likes: 0,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    }
  },
  deleteHaiku: function(haikuId) {
    var haiku = Haikus.findOne(haikuId);
    if (haiku.owner !== Meteor.userId() || !Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Likes.remove({haikuId: haikuId});
      Comments.remove({haikuId: haikuId});
      Haikus.remove({_id: haikuId});
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

      if (existingLikes) {
        Likes.remove(likeInfo);
      } else {
        Likes.insert(likeInfo);
      }
    }
  },
  addComment: function(haikuId, text) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }
    else {
      if (!(typeof text === "string")) {
        throw new Meteor.Error("incorrect-input");
      }
      else {
        Comments.insert({
          userId: Meteor.userId(),
          username: Meteor.user().username,
          haikuId: haikuId,
          text: text
        });
      }
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
  },
  userDescription: function(userDescriptionInput){
    if(!Meteor.user()){
        throw new Meteor.Error("not-authorized");
    }
    Users.update(
        {_id: Meteor.userId()},
        {userDescription: userDescriptionInput}
      );
  }


});