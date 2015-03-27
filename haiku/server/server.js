Meteor.startup(function() {
    Haikus.remove({});
    Haikus.insert({
        poemRow1: "A summer river being crossed",
        poemRow2: "how pleasing",
        poemRow3: "with sandals in my hands!",
        textFont: "Times New Roman",
        textColor: "#0000FF",
        imageSrc: "http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg",
        createdAt: new Date(),
        owner: "sdsdf234f23efeg",
        username: "sdfsdsf"
    });
    Haikus.insert({
        poemRow1: "A summer river being crossed",
        poemRow2: "how pleasing",
        poemRow3: "with sandals in my hands!",
        textFont: "Times New Roman",
        textColor: "#0000FF",
        imageSrc: "http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg",
        createdAt: new Date(),
        owner: "sdsdf234f23efeg",
        username: "sdfsdsf"
    });
    Haikus.insert({
        poemRow1: "A summer river being crossed",
        poemRow2: "how pleasing",
        poemRow3: "with sandals in my hands!",
        textFont: "Times New Roman",
        textColor: "#0000FF",
        imageSrc: "http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg",
        createdAt: new Date(),
        owner: "sdsdf234f23efeg",
        username: "sdfsdsf"
    });
    Haikus.insert({
        poemRow1: "A summer river being crossed",
        poemRow2: "how pleasing",
        poemRow3: "with sandals in my hands!",
        textFont: "Times New Roman",
        textColor: "#0000FF",
        imageSrc: "http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg",
        createdAt: new Date(),
        owner: "sdsdf234f23efeg",
        username: "sdfsdsf"
    });
});

Meteor.publish("haikus", function() {
  return Haikus.find({
  });
});
Meteor.publish("comments", function(){
    return Comments.find();
});
Meteor.publish("likes", function(){
    return Likes.find();
});
