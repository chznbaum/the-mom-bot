console.log('Mom Bot is waking up.');
var Twit = require('twit');
var config = require('./config');
var bad_words = ['apple', 'banana', 'bread'];
var unfollow_words = ['go away', 'leave me alone', 'I hate you'];
var T = new Twit(config);
var stream = T.stream('user'); // Setting up a user stream
stream.on('tweet', tweetEvent); // Anytime a tweet enters the stream, run tweetEvent
stream.on('follow', followed); // Anytime a user follows Mom Bot, run followed
console.log('The user stream is open.');
function tweetEvent(eventMsg) {
	var from = eventMsg.user.screen_name;
	var text = eventMsg.text;
	var reply_to = eventMsg.in_reply_to_screen_name;
	if (from !== 'the_mother_bot') {
		console.log('Mom Bot read a tweet from ' + from + '. The tweet says: ' + text);
		var tweet_array = text.split(' ');
		console.log('The tweet in array form is: ' + tweet_array);
		for (var i = 0; i < tweet_array.length; i++) {
			if (bad_words.indexOf(tweet_array[i]) != -1) {
				console.log('This tweet contains a bad word! The word is ' + tweet_array[i] + '. Mom Bot\'s not mad; she\'s just disappointed.');
				tweetIt('@' + from + ' ' + 'You\'re an adult, but do you really want to keep that tweet? You can delete it if you don\'t want a future boss to see.');
			}
		}
		if (reply_to !== null && reply_to === 'the_mother_bot') {
			console.log('Mother Bot got an @reply that says: ' + text);
			for (var j = 0; j < unfollow_words.length; j++) {
				console.log(text);
				console.log(unfollow_words[j]);
				console.log(text.indexOf(unfollow_words[j]));
				if (text.indexOf(unfollow_words[j]) != -1) {
					console.log(from + ' wants to be unfollowed.');
					tweetIt('@' + from + ' Ok Sweetie, Mom Bot will give you space. Follow me again if you want to talk.');
					T.post('friendships/destroy', { screen_name: from }, function(err, data, response) {
						if (err) {
							console.log('Something went wrong! I can\'t unfollow ' + from + ' .');
							tweetIt('@' + from + ' Something\'s wrong with Mom\'s computer. Ask @otherconsolelog to help me unfollow you, please.');
						} else {
							console.log('Mom Bot unfollowed ' + from + '.');
						}
					});
				}
			}
		}
	}
}
function followed(eventMsg) {
	var name = eventMsg.source.name;
	var follower_screen_name = eventMsg.source.screen_name;
	var thankYous = [
	'Thank you for keeping in touch with Mom, Sweetie.'
	];
	var thankYouNumber = Math.floor(Math.random()*thankYous.length);
	if (follower_screen_name !== 'the_mother_bot') {
		console.log('Mom Bot was followed by ' + follower_screen_name + '.');
		tweetIt('@' + follower_screen_name + ' ' + thankYous[thankYouNumber]);
		T.post('friendships/create', { screen_name: follower_screen_name }, function(err, data, response) {
			if (err) {
				console.log('Something went wrong! I can\'t follow ' + follower_screen_name + ' back.');
			} else {
				console.log('Mom Bot followed ' + follower_screen_name + '.');
			}
		});
	}
}
function tweetIt(txt) {
	var tweet = {
		status: txt
	}
	T.post('statuses/update', tweet, tweeted);
	function tweeted(err, data, response) {
		if (err) {
			console.log('Something went wrong! Check this error for Mom Bot to see why my tweet didn\'t send: ');
			console.log(err);
		} else {
			console.log('I sent a message! It says: ' + tweet.status);
		}
	}
}