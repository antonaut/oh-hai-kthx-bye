/**
 * Created by Fredrik on 2015-04-16.
 */

Template.haikuPopup.helpers({
    "colorToUse" : function(haikuId) {
        var result = Likes.findOne({userId: Meteor.userId(), haikuId: haikuId});
        if (!result) {
            return "black";
        }
        return "red";

        /*console.log(result);
        var liked = result.count() > 0;
        return liked ? "blue" : "black";*/
    },
    "getNumberOfLikers" : function (haikuId) {
        var result = Likes.find({haikuId: haikuId});
        return result.count();
    }
});

Template.haikuPopup.events({
    "click #likeButton" : function(event){
        var haikuId = event.currentTarget.dataset.id;
        Meteor.call('addRemoveLike',haikuId);
    },

    "click #commentButton" : function(event){
        $('#editUserComment').show();

    }


});