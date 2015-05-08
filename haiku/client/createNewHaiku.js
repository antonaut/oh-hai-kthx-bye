
Session.set('haikuImage', {
    id: '16287638134',
    owner: '130080108@N02',
    secret: 'd3ff2ffc58',
    server: '7281',
    farm: 8,
    title: 'Landscape 5 By: Anton Antonov',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
});

var imgSearchSpawn = function(event, template) {
    var lastSearchTime = Session.get('lastImageSearch');

    if (new Date() - lastSearchTime > 5000) {
        var words = template.find("#row1").value.split(' ').concat(
            template.find("#row2").value.split(' ')).concat(
            template.find("#row3").value.split(' '));
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

        var theColorToUse;
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
        var theImageToUse = urlFromFlickrPhoto(Session.get('haikuImage'));
        Meteor.call('addHaiku', row1, row2, row3, theFontToUse, theColorToUse, theImageToUse);
        Session.set("haiku-display","latest");
        Router.go('/');
    },
    "click #font-chooser li a": function(event) {
        chosenFont = event.target.innerHTML;
    },
    "click #color-chooser li a": function(event) {
        chosenColor = event.target.innerHTML;
    },
    "click #refresh-image": function(event) {
        console.log('Refreshing image.');
        Session.set('haikuImage', randomFlickrPhoto());
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
    },
    haikuImage: function() {
        var i = Session.get('haikuImage');
        console.log('Image: ',i);
        return i;
    }
});