# Mom Bot
A Twitter Bot, [Mom Bot](https://twitter.com/the_mother_bot), that provides encouragement and warns about bad word usage to those who follow her.

## Installation
To install this project to make your own Twitter Bot:

1. Click the "Fork" button to create your own repository.
2. From your forked repository, clone or download the the repository to your local system.
3. Go to [Twitter](https://twitter.com) and create a separate Twitter account for your bot. You will need to include a mobile phone number on this account, but you can remove the number after completing these installation steps.
4. Go to [Twitter Dev](https://dev.twitter.com) and click on "Manage Your Apps" (in the footer). Sign in as your bot and click "Create New App".
5. Enter a name and description for your bot, as well as a website, which can be a link to your bot repository on GitHub. Read the Twitter Developer Agreement and check it off, then click "Create your Twitter application".
6. When your Twitter app pulls up, switch to the "Keys and Access Tokens" tab. Make note of the Consumer Key (API Key) and Consumer Secret (API Secret). Under "Your Access Token", click to generate your Access Token and Access Token Secret. If your bot is ever compromised, you will want to regenerate these keys as well as the Consumer Key and Secret.
7. Create a `config.js` file in the root of this project's directory. Insert your bot account's Twitter API keys like this:
   ```javascript
   module.exports = {
   	consumer_key:				'...',
   	consumer_secret:			'...',
   	access_token:				'...',
   	access_token_secret:		'...'
   }
   ```
8. Because the `config.js` file has your authentication keys within it, make sure it is in your `.gitignore` file. This can be done from your terminal like this:
   ```bash
   echo config.js >> .gitignore
   ```
9. In the `bot.js` file, change the `bot_name` variable value to your bot's name (like Mom Bot), the `bot_screen_name` variable value to your bot's Twitter handle, and the `bot_owner_name` variable value to your own primary Twitter handle.
10. Create a [Heroku](https://heroku.com) account if you don't already have one. In your dashboard, create a new app, calling it whatever you like.
11. In your terminal, download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) if you haven't already. Log in to your account by entering:
   ```bash
   heroku login
   ```
into your terminal and following the prompts.
12. Connect your directory with your Heroku app:
   ```bash
   git init
   heroku git:remote -a YOUR-APP-NAME
   ```
13. Deploy your application to Heroku:
   ```bash
   git add .
   git commit -am "add project files"
   git push heroku master
   ```


## Use

### Using the Existing Bot
To use the existing bot, a user can simply follow [Mom Bot](https://twitter.com/the_mother_bot) on Twitter. Mom Bot will respond to the follow request and follow the user back.

From there, Mom Bot will scan tweets in the stream for use of bad words. If a tweet contains a bad word, Mom Bot will respond with an @reply to the tweeter.

Mom Bot will also scan for @replies directed at Mom Bot. If a user tweets an @reply that includes a sad word, Mom Bot will tweet an @reply to the user to cheer them up. If a user tweets an @reply that includes a proud or happy word, Mom Bot will tweet an @reply to the user to express her pride in the user.