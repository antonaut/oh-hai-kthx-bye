Template.userProfile.events({
    "blur #userDescriptionInput": function(template) {
        var userDescriptionInput = $('#userDescriptionInput').val();
        /*Meteor.call('userDescription', this._id, userDescriptionInput);*/
        $('#inputDescription').hide();
        $('#userDescriptionText').html(userDescriptionInput);
        console.log(userDescriptionInput);
    },
    
    "click #userDescriptionText": function() {
        $('#inputDescription').show();
        console.log($('#inputDescription').length);
    }
});