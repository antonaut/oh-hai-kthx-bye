Meteor.subscribe('flickr');

Session.set('flickrResults', {
	photos: {
		photo: [{
			id: '16287638134',
			owner: '130080108@N02',
			secret: 'd3ff2ffc58',
			server: '7281',
			farm: 8,
			title: 'Landscape 5 By: Anton Antonov',
			ispublic: 1,
			isfriend: 0,
			isfamily: 0
		}],
	},
});

Template.flickrtest.events({
	'submit': function(event) {

		var needle = event.target.needle.value;
		console.info('searched for: ', needle);
		Meteor.call('flickrSearchPhotos', needle, function(error, result) {
			if (error) {
				console.error(error);
				return;
			}
			var photos = result;
			Session.set('flickrResults', photos);
		});
		event.preventDefault();
	}
});

Template.flickrtest.helpers({
	flickrResults: function() {
		var flickrPhotos = Session.get('flickrResults');
		return flickrPhotos['photo'] ? flickrPhotos['photo'] : [];
	}
});

// Uses the url api
// https://www.flickr.com/services/api/misc.urls.html
Template.flickrPhoto.helpers({
	url: function(farmID, serverID, id, secret) {
		return 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg';
	}
});