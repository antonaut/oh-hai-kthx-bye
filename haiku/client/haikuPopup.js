/**
 * Created by Fredrik on 2015-04-16.
 */

var getNumberOfLikers = function(haikuId){
    var result = Likes.find({haikuId: haikuId});
    return result.count();
};

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
    "getNumberOfLikers" : function () {
        return getNumberOfLikers(this._id);
    },
    "hasMoreThanOneLiker" : function(){
        return getNumberOfLikers(this._id)>0;
    },
    "getComments" : function(){
        var comments = Comments.find({haikuId: this._id});
        return comments

    }
});

Template.haikuPopup.events({
    "click #likeButton" : function(){
        Meteor.call('addRemoveLike',this._id);
    },

    "click #commentButton" : function(){
            $('#editUserComment').toggle();   
    },

    "click #postHaikuCommentButton" : function(event, template){
        var commentToPost = template.find("#userComment").value;
        var haikuId = this._id;
        Meteor.call('addComment',haikuId,commentToPost);
    }


});