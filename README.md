# the-mom-bot
Provides encouragement, words of wisdom, and warns about bad word usage to those who follow her.

## Use
Prior to deploying the bot, a `config.js` file must be created in the directory. In this file, insert your bot account's Twitter API keys like this:

```javascript
module.exports = {
	consumer_key:				'...',
	consumer_secret:			'...',
	access_token:				'...',
	access_token_secret:			'...'
}
```

If the source code for your directory is shared or public, this file should be added to your `.gitignore` file. To do this, from your terminal, `cd` into the bot directory and use this command:

```bash
echo config.js >> .gitignore
```