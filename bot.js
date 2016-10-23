console.log('The bot is starting...');
var Twit = require('twit'); // Include Twit Package
var config = require('./config'); // Include authentication credentials
var bot_name = 'Mom Bot';
var bot_screen_name = 'the_mother_bot';
var bot_owner_name = 'otherconsolelog';
var disappointed_bot_list = [ // What Bot will say when user tweets a bad word
	bot_name + "'s not mad; she's just disappointed. 😞 Would you like to delete that tweet?",
	"You're an adult, but do you really want to keep that tweet? 🤔 You can delete it if you don't want a future boss to see.",
	"Do you kiss your Mother Bot with that mouth? 😠 You can always delete that tweet if you think it was foolish.",
	"Sweetie, your tweet had a bad word! 😲 Are you sure that's what you want people to see? You can delete it if not."
];
var thank_you_list = [ // What Bot will say when user follows Bot
	"Thank you for keeping in touch with " + bot_name + ", Sweetie. 😘",
	"Don't tell your brother, but of course you're my favorite, Sweetie. 😍"
];
var unfollow_bot_list = [ // What Bot will say when Bot unfollows user
	"Ok Sweetie, " + bot_name + " will give you space. Follow me again if you want to talk. 😥",
	bot_name + " always loves you, but I\'ll leave you alone. Follow me again if you want to talk. 😥",
	"Ok Sweetie, " + bot_name + " will miss you, but I'm glad you're having a good time. 😥"
];
var feel_better_bot_list = [ // What Bot will say when user tweets about sadness
	"I'm happy simply because you exist. Just thought you should know that. 😘",
	"You are the light of my world and the first thing I think about every day. 😘",
	"Always remember that you are needed and there is work to be done. 😉",
	"Keep in mind that this, too, will pass. In the meantime, I am here for you in whatever way you need. 🤗"
];
var proud_bot_list = [ // What Bot will say when user tweets about something great/to be proud of
	"I'm so proud of you. And even if you weren't so fantastic, I'd still be proud. 😆",
	"I believe in you, Sweetie. 😘",
	"You are one of the best gifts I've ever gotten. I am so proud and humbled. 😊",
	"I feel so proud when I'm with you. 😊",
	"You have some real gifts! 😆",
	"It is so cool to watch you grow up. 😆",
	"You make me so happy just by being you. 😊",
	"I love you so much!😘",
	"You were born to do this! 😆"
];
var unfollow_words_list = [ // Words user can include to request Bot to unfollow the user
	"all your fault",
	"dont care",
	"dont have to",
	"dont need you",
	"go away",
	"hate you",
	"leave me alone",
	"not my mom",
	"not my real mom",
	"run away"
];
var sad_words_list = [ // Words user can include to request cheering up
	"blue",
	"blah",
	"crestfallen",
	"dejected",
	"depressed",
	"desolate",
	"despair",
	"despairing",
	"disconsolate",
	"dismal",
	"doleful",
	"down",
	"forlorn",
	"gloomy",
	"glum",
	"heartbroken",
	"inconsolable",
	"lonely",
	"melancholy",
	"miserable",
	"mournful",
	"sad",
	"sorrow",
	"sorrowful",
	"unhappy",
	"woebegone",
	"wretched"
];
var proud_words_list = [ // Words user can include to express happiness/pride
	"accomplished",
	"accomplishment",
	"amazing",
	"awesome",
	"cheering",
	"content",
	"delighted",
	"glad",
	"glorious",
	"good",
	"grand",
	"gratified",
	"gratifying",
	"happy",
	"heartwarming",
	"inspiring",
	"joyful",
	"magnificent",
	"memorable",
	"notable",
	"overjoyed",
	"pleased",
	"pleasing",
	"proud",
	"resplendent",
	"satisfied",
	"satisfying",
	"splendid",
	"succeeded",
	"success",
	"thrilled"
];
var bad_words_list = require('badwords/array'); // Include Bad Words package
for (k = 0; k < bad_words_list.length; k++) {
	bad_words_list[k] = bad_words_list[k].toLowerCase(); // Transform Bad Words list to all lowercase
}
var T = new Twit(config);
var stream = T.stream('user'); // Setting up a user stream
stream.on('tweet', tweetEvent); // Anytime a tweet enters the stream, run tweetEvent
stream.on('follow', followed); // Anytime a user follows Bot, run followed
console.log('Entering the stream.');
function tweetEvent(eventMsg) { // Function to run on each tweet in the stream
	var from = eventMsg.user.screen_name; // Who sent the tweet
	var text = eventMsg.text; // Message of the tweet
	var reply_to = eventMsg.in_reply_to_screen_name; // Who tweet was @reply to
	if (from !== bot_screen_name) { // If Bot didn't send the tweet
		console.log('Bot received a tweet.');
		text = text.replace(/[^a-zA-Z\s]/gi, "").toLowerCase(); // Remove non-letter characters and transform to lowercase
		var tweet_array = text.split(' '); // Create an array of each word in the tweet
		for (var i = 0; i < tweet_array.length; i++) { // For each word in the tweet
			if (bad_words_list.indexOf(tweet_array[i]) != -1) { // If the word is included in bad words list
				var disappointed_text = randomSaying(disappointed_bot_list);
				console.log('That tweet had a bad word!');
				tweetIt('@' + from + ' ' + disappointed_text); // Bot tweets her disappointment
			}
		}
		if (reply_to !== null && reply_to === bot_screen_name) { // If the tweet was @reply to Bot
			for (var j = 0; j < unfollow_words_list.length; j++) { // For each word in the unfollow list
				if (text.indexOf(unfollow_words_list[j]) != -1) { // If an unfollow word is in the tweet
					var unfollow_text = randomSaying(unfollow_bot_list);
					console.log('Someone wanted to unfollow.');
					tweetIt('@' + from + ' ' + unfollow_text); // Tweet an unfollow response
					T.post('friendships/destroy', { screen_name: from }, function(err, data, response) { // Unfollow the user
						if (err) { // If error results
							console.log(err); // Print error to the console
							tweetIt('@' + from + ' Something\'s wrong with ' + bot_name + '\'s computer. Ask @' + bot_owner_name + ' to help me unfollow you, please.'); // Tweet a request for user to contact Bot Owner
						}
					});
				}
			}
			for (var l = 0; l < tweet_array.length; l++) { // For each word in the tweet
				if ('stop'.indexOf(tweet_array[l]) != -1) { // If 'stop' is in the tweet
					console.log('Someone\'s having a problem.');
					tweetIt('@' + from + ' ' + bot_name + ' seems to be upsetting you. Please ask @' + bot_owner_name + ' for help.'); // Tweet a request for user to contact Bot Owner
				} else if (sad_words_list.indexOf(tweet_array[l]) != -1) { // If a sad word is in the tweet
					var feel_better_text = randomSaying(feel_better_bot_list);
					console.log('Someone needs cheering up.');
					tweetIt('@' + from + ' ' + feel_better_text); // Tweet to cheer the user up
				} else if (proud_words_list.indexOf(tweet_array[l]) != -1) { // If a proud word is in the tweet
					var proud_text = randomSaying(proud_bot_list);
					console.log('Someone did something awesome.');
					tweetIt('@' + from + ' ' + proud_text); // Tweet to be proud of the user
				}
			}
		}
	}
}
function followed(eventMsg) { // Function to run on follow event
	console.log('Someone followed the bot.');
	var name = eventMsg.source.name; // Who followed
	var follower_screen_name = eventMsg.source.screen_name; // Follower's screen name
	if (follower_screen_name !== bot_screen_name) { // If follower is not Bot
		var thank_you = randomSaying(thank_you_list)
		tweetIt('@' + follower_screen_name + ' ' + thank_you); // Tweet a thank you expression
		T.post('friendships/create', { screen_name: follower_screen_name }, function(err, data, response) { // Follow the user back
			if (err) { // If error results
				console.log(err); // Print error to the console
			}
		});
	}
}
function tweetIt(txt) { // Function to send tweets
	var tweet = { // Message of tweet to send out
		status: txt
	}
	T.post('statuses/update', tweet, tweeted); // Send the tweet, then run tweeted function
	function tweeted(err, data, response) { // Function to run after sending a tweet.
		if (err) { // If error results
			console.log(err); // Print error to the console
		}
	}
}
function randomSaying(sayingList) { // Function to randomize the expression to use
	var saying_number = Math.floor(Math.random()*sayingList.length); // Give a random number within number of available responses
	var saying = sayingList[saying_number]; // Grab expression matching that number
	return saying; // Return the expression
}