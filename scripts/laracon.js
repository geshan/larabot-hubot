//  Description:
//   Hubot - Larabot get tweet about Laracon EU
//
// Commands:
//   hubot tell me about laracon eu - returns a random latest tweet about laracon eu
//
// Examples:
// nancy tell me about laracon eu

var request = require('superagent');
require('superagent-jsonapify')(request);

function fetchRandomTweet(msg)
{
    request
    .get('https://extraction.import.io/query/extractor/39ec04b7-c3ef-4025-8510-a27b6ae7093d?_apikey=89ed8eed276e43f7b2c3c3912e77970dbec9d38a7da7c6237e6a60c73d28e3fde90ba4eae62a288874d47608a4ac7a2a7f6119f62d1d284a62ac9dde1789030939ada41027182b6228fb5eff5728f6a0&url=https%3A%2F%2Ftwitter.com%2Fsearch%3Fq%3D%2523LaraconEU')
    .then(function(res){
        var tweets = res.body.extractorData.data[0].group;
        var min = 0;
        var max = 38;
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        var tweet = tweets[randomNumber];

        msg.send('@' + msg.message.user.name + ' ' + tweet.author_name[0].text + '(@' + tweet.author_handle[0].text + ')' + ' tweeted "' + tweet.tweet[0].text + '"');
    }).catch(function(e){
        msg.send('@' + msg.message.user.name + ' ' + 'sorry I could not fetch information/tweet about laracon eu');
    });
}

module.exports = function(robot) {
  robot.respond(/tell me about laracon eu/i, fetchRandomTweet);
}
