flickrSearch = function(needle) {
	console.info('searched for: ', needle);
	Meteor.call('flickrSearchPhotos', needle, function(error, result) {
		if (error) {
			console.error(error);
			return;
		}
		var photos = result;
		console.log('Set new photos', photos);
		Session.set('flickrResults', photos);
	});
};