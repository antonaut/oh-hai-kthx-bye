# Project proposal

# Introduction

*OH-HAI-KTHX-BYE - a haiku application*

We'd like to build a haiku application using the Meteor
http://meteor.com environment for development.

Our main data type will be a Haiku which a User can create and vote
upon. The Haikus will have images related to them.

## Views
Our application will consist of at least the following views.
Please note that these are subject to change.

- FrontPage, contains a list of haikus displayed according to some filter
- PageHeader, shows a login form and a logo
- ComposeHaiku, shows a form in a fashionable way where the User can
make a new haiku.
- Haiku, views a haiku with its attached Flickr image and some voting
  controls + score
- UserProfile, lets the user edit/delete her previous haikus as well
  as change her settings.

## External API
We are using the Flickr API - https://www.flickr.com/services/api/flickr.photos.search.html for fetching images related to the
words entered in the haikus. The flickr API key and secret should be stored in a file called 'meteor-settings.json'
which should look like this:

>	{
		"flickr_api_key": "API_KEY",
		"flickr_api_secret": "SECRET"
	}

Meteor can then be launched with `meteor --settings ../meteor-settings.json` for loading the key and secret.

