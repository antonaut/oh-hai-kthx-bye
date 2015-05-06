Template.nav.helpers({
    appname: function() {
 	   return Session.get('appName');
    }
});

Template.nav.events({
    "click #most-liked-haikus" : function(){
        console.log("most-liked-haikus");
        Session.set("haiku-display","most-liked");
        var location = Iron.Location.get().pathname;
        $("#searchString").val("");
        if(location !== "/"){
            Router.go("/");
        }
    },
    "click #app-icon" : function(){
        console.log("#app-icon");
        Session.set("haiku-display","latest");
    },
    "click #searchBtn" : function(event,template){
        var searchString = template.find("#searchString").value;
        Session.set("searchTerm",searchString);
    }
});