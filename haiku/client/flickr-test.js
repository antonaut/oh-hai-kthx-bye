Meteor.subscribe('flickr');

Template.flickrtest.events({
	'submit': function(event) {

		var needle = event.target.needle.value;
		console.info('searched for: ', needle);
		Meteor.call('flickrSearchPhotos', needle, function(photos) {
			console.info(photos);
			Session.set('flickrResults', photos);
		});
		event.preventDefault();
	}
});

Template.flickrtest.helpers({
	flickrResults: function () {
		return Session.get('flickrResults');
	}
});

// Uses the url api
// https://www.flickr.com/services/api/misc.urls.html
Template.flickrPhoto.helpers({
	url: function(farmID, serverID, id, secret) {
		return 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id +'_' + secret +'.jpg';
	}
});