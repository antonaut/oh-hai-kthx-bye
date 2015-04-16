Meteor.subscribe('flickr');

var url = function(farm, server, id, secret, size) {
	if (!size) {
		size = '';
	}
	return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
};

Session.set('flickrResults', {
	photos: {
		photo: [/*{
			id: '16287638134',
			owner: '130080108@N02',
			secret: 'd3ff2ffc58',
			server: '7281',
			farm: 8,
			title: 'Landscape 5 By: Anton Antonov',
			ispublic: 1,
			isfriend: 0,
			isfamily: 0
		}*/],
	},
});


Template.flickrtest.events({
	'submit': function(event) {
		var needle = event.target.needle.value;
		flickrSearch(needle);
		event.preventDefault();
	}
});

Template.inspirationPhotos.helpers({
	flickrPhotos: function() {
		var flickrPhotos = Session.get('flickrResults');
		console.log('CALLED! photos: ', flickrPhotos);
		if (flickrPhotos.photos && flickrPhotos.photos.photo) {
			return flickrPhotos.photos.photo;
		} else {
			return [];
		}
	},
	// Uses the url api
	// https://www.flickr.com/services/api/misc.urls.html
});

Template.flickrLargeSquare.helpers({
	url: function(farm, server, id, secret) {
		return url(farm, server, id, secret, '_q');
	}
});

Template.flickrSquare.helpers({
	url: function(farm, server, id, secret) {
		return url(farm, server, id, secret, '_s');
	}
});

