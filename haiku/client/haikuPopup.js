/**
 * Created by Fredrik on 2015-04-16.
 */

function getNumberOfLikers(haikuId){
    var result = Likes.find({haikuId: haikuId});
    return result.count();
}

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
        return getNumberOfLikers(haikuId);
    },
    "hasMoreThanOneLiker" : function(haikuId){
        return getNumberOfLikers(haikuId)>0;
    }
});

Template.haikuPopup.events({
    "click #likeButton" : function(event){
        var haikuId = event.currentTarget.dataset.id;
        Meteor.call('addRemoveLike',haikuId);
    },

    "click #commentButton" : function(){
            $('#editUserComment').toggle();   
    },

    "click #postHaikuCommentButton" : function(event, template){
        var commentToPost = template.find("#userComment").value;
        var haikuId = event.currentTarget.dataset.id;
        Meteor.call('addComment',haikuId,commentToPost);
    }


});