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

Template.createNewHaiku.events({
    "click #postHaikuBtn" : function(event, template){
        var row1 = template.find("#row1").value;
        var row2 = template.find("#row2").value;
        var row3 = template.find("#row3").value;
        var theFontToUse;

        if (typeof chosenFont === 'undefined') {
            theFontToUse = availableTextFonts[0].filePath;

        }
        else{
            for(var i=0;i<availableTextFonts.length;i++){
                if(availableTextFonts[i].name===chosenFont){
                    theFontToUse = availableTextFonts[i].filePath;
                    break;
                }
            }
        }
        console.log(theFontToUse);

        var theColorToUse
        if (typeof chosenColor === 'undefined') {
            theColorToUse = availableTextColors[0].code;
        }
        else{
            for(var j=0;j<availableTextColors.length;j++){
                if(availableTextColors[i].name===chosenColor){
                    theColorToUse = availableTextColors[i].code;
                    break;
                }
            }
        }
        Meteor.call('addHaiku',row1,row2,row3,theFontToUse,theColorToUse,"http://vignette3.wikia.nocookie.net/jadensadventures/images/5/54/Pokemon-Ash-s-Pikachu-Riley-Sir-Aaron-s-Lucarios-pokemon-guys-10262907-563-579.jpg/revision/latest?cb=20120902022940");
    },
    "click #font-chooser li a" : function(event){
        chosenFont = event.target.innerHTML;
    },
    "click #color-chooser li a" : function(event){
        chosenColor = event.target.innerHTML;
    }
});


Template.createNewHaiku.helpers({
    getAvailableFontNames:function(){
        var fontNames = [];
        for(var i=0;i<availableTextFonts.length;i++){
            fontNames.push(availableTextFonts[i].name);
        }
        return fontNames;
    },
    getAvailableColorNames: function () {
        var colorNames = [];
        for(var i=0;i<availableTextColors.length;i++){
            colorNames.push(availableTextColors[i].name)
        }
        return colorNames;
    }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});