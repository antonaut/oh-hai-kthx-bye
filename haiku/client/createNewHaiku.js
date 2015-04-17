var imgSearchSpawn = function(event, template) {
    var lastSearchTime = Session.get('lastImageSearch');

    if (new Date() - lastSearchTime > 8000) {
        var words = template.find("#row1").value.split(' ').concat(
            template.find("#row2").value.split(' ')).concat(
            template.find("#row3").value.split(' '));
        console.log(words);
        var needle = words[Math.floor(Math.random() * words.length)];
        console.log('Searching for inspiration. Term: ', needle);
        flickrSearch(needle);
        Session.set('lastImageSearch', new Date());
    }
};

Template.createNewHaiku.events({
    "keyup #row1": imgSearchSpawn,
    "keyup #row2": imgSearchSpawn,
    "keyup #row3": imgSearchSpawn,
    "click #postHaikuBtn": function(event, template) {
        var row1 = template.find("#row1").value;
        var row2 = template.find("#row2").value;
        var row3 = template.find("#row3").value;
        var theFontToUse;

        if (typeof chosenFont === 'undefined') {
            theFontToUse = availableTextFonts[0].filePath;

        } else {
            for (var i = 0; i < availableTextFonts.length; i++) {
                if (availableTextFonts[i].name === chosenFont) {
                    theFontToUse = availableTextFonts[i].filePath;
                    break;
                }
            }
        }
        console.log(theFontToUse);

        var theColorToUse
        if (typeof chosenColor === 'undefined') {
            theColorToUse = availableTextColors[0].code;
        } else {
            for (var j = 0; j < availableTextColors.length; j++) {
                if (availableTextColors[i].name === chosenColor) {
                    theColorToUse = availableTextColors[i].code;
                    break;
                }
            }
        }
        Meteor.call('addHaiku', row1, row2, row3, theFontToUse, theColorToUse, "http://vignette3.wikia.nocookie.net/jadensadventures/images/5/54/Pokemon-Ash-s-Pikachu-Riley-Sir-Aaron-s-Lucarios-pokemon-guys-10262907-563-579.jpg/revision/latest?cb=20120902022940");
    },
    "click #font-chooser li a": function(event) {
        chosenFont = event.target.innerHTML;
    },
    "click #color-chooser li a": function(event) {
        chosenColor = event.target.innerHTML;
    }
});


Template.createNewHaiku.helpers({
    getAvailableFontNames: function() {
        var fontNames = [];
        for (var i = 0; i < availableTextFonts.length; i++) {
            fontNames.push(availableTextFonts[i].name);
        }
        return fontNames;
    },
    getAvailableColorNames: function() {
        var colorNames = [];
        for (var i = 0; i < availableTextColors.length; i++) {
            colorNames.push(availableTextColors[i].name)
        }
        return colorNames;
    }
});