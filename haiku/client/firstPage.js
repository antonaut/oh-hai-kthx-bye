/**
 * Created by Fredrik on 2015-04-16.
 */
 var mostLikedHaikus = function(){

    var likes = Likes.find().fetch();
    var likesByHaiku = _.groupBy(_.pluck(likes, 'haikuId'));

    var arrayOfHaikus = [];
    var haikusWithLikes = {};
    _.each(_.values(likesByHaiku), function (haikus) {
        arrayOfHaikus.push([haikus[0], haikus.length]);
        haikusWithLikes[haikus[0]] = true;
    });

    arrayOfHaikus.sort(function (a, b) {
        return b[1] - a[1];
    });

    var numberOfHaikusToAdd = Math.min(arrayOfHaikus.length, maxHaikusToShowOnEachPage);

    var haikusToDisplay = [];
    for (var i = 0; i < numberOfHaikusToAdd; i++) {
        var currHaiku = Haikus.findOne({_id: arrayOfHaikus[i][0]});
        currHaiku["toTheLeft"] = i % 2 === 0;
        currHaiku["imagesSecond"] = i % 4 >= 2;
        haikusToDisplay.push(currHaiku);
    }

    if (arrayOfHaikus.length < maxHaikusToShowOnEachPage) {
        Haikus.find().forEach(function (haiku) {
            if (!haikusWithLikes[haiku._id]) {
                var lengthOfHaikuList = haikusToDisplay.length;
                haiku["toTheLeft"] = lengthOfHaikuList % 2 === 0;
                haiku["imagesSecond"] = lengthOfHaikuList % 4 >= 2;
                haikusToDisplay.push(haiku);
            }
        });
    }

    return haikusToDisplay;
};

var latestHaikus = function() {
    return Haikus.find({}, {sort: {createdAt: -1}, limit: maxHaikusToShowOnEachPage}).map(function (document, index) {
        document.toTheLeft = index % 2 === 0;
        document.imagesSecond = index % 4 >= 2;
        return document;
    });
};


Template.firstPage.helpers({
    getPopupTemplate: function(){
        return
    },
    getHaikus :function(){
        var haikuToDisplay = Session.get("haiku-display")
        if(haikuToDisplay === 'most-liked'){
            return mostLikedHaikus();
        }
        else{
            return latestHaikus();
        }
    },
    textAboutHaikuDisplayed : function(){
        var haikuDisplayed = Session.get("haiku-display");
        if(haikuDisplayed === 'most-liked'){
            return "most liked haikus..."
        }
        else{
            return "latest haikus..."
        }
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