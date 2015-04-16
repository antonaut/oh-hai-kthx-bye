/**
 * Created by Fredrik on 2015-04-16.
 */
Template.firstPage.helpers({
    latestHaikus: function() {
        var haikus = Haikus.find({},{sort:{createdAt:-1},limit:100}).map(function(document, index){
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
    getPopupTemplate: function(){
        return
    },
    appname: function() {
        return Session.get('appName');
    }
});

Template.firstPage.events({
    "click .haikuDiv" : function(event){
        var id = event.currentTarget.id;
        var haikuData = Haikus.findOne({_id:id});
        Modal.show('haikuPopup',haikuData);
    }
});