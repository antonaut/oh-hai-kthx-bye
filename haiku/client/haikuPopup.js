/**
 * Created by Fredrik on 2015-04-16.
 */

Template.haikuPopup.helpers({
    "likedByUser" : function(haikuId) {
        var result = Likes.findOne({userId: Meteor.userId(), haikuId: haikuId});
        return result.count() > 0;
    },
    "colorToUse" : function(haikuId){
        var result = Likes.findOne({userId: Meteor.userId(), haikuId: haikuId});
        var liked=  result.count() > 0;
        return liked ? "blue" :"black";
    }
});

Template.haikuPopup.events({
    "click #likeButton" : function(event){
        var haikuId = event.currentTarget.dataset.id;
        Meteor.call('addRemoveLike',haikuId);
        var cursor = Likes.find({});
        cursor.forEach(function(doc){
            console.log(doc._id);
        });
    },

    "click #commentButton" : function(event){    
            $('#editUserComment').show();
            alert("hej!");      
    }


});