# Netlify Plugin Build Logger
Just simple plugin that can send build sucess and failure events to a logging service. Currently it is only setup to send to DataDog.

### Why? ###
Netlify only has option to output build events to webhooks. Many services need to have a structured request to log them correctly. Case and point for Datadog, which expects a certain strucutre of the data.

### How do I get set up? ###

#### Local ####
To test this locally you can add this plugin to your app via npm, then run npm install. You will then need to add the following config variables to your netlify.toml to replciate environment variables:

DATADOG_API_KEY="XXXXX" (your datadog ap key)
ENVIRONMENT="dev" (takes any string)
LOGGER_TYPE="datadog" (console/datadog)

To test you can run `netlify build` and it will try build your app. This should trigger a log on failure or success.

#### On Netlify ####
You will have to look for the Netlify plugin here: https://app.netlify.com/teams/altitude-ads/plugins. Once thats installed all you need to do is add the environment variables mentioned above, and you are good to go. 
