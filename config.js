/*exports.database = {
	type: 'mongodb',
	hostname: 'localhost',
	port: 27017,
	database: 'scrumblr'
};
*/

var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv()


var argv = require('yargs')
        .usage('Usage: $0 [--port INTEGER [8080]] [--baseurl STRING ["/"]] [--redis STRING:INT [127.0.0.1:6379]] [--gaEnabled] [--gaAccount STRING [UA-2069672-4]]')
        .argv;

exports.server = {
	port: argv.port || 8080,
	baseurl: argv.baseurl || '/'
};

exports.googleanalytics = {
	enabled: argv['gaEnabled'] || false,
	account: argv['gaAccount'] || "UA-2069672-4"
};

var vcap_services = process.env.VCAP_SERVICES;
var rediscloud_service = JSON.parse(vcap_services)["rediscloud"][0]
var credentials = rediscloud_service.credentials;

var redisURL = 'redis://:' + credentials.password + '@' + credentials.hostname + ':' + credentials.port

console.log(redisURL)
exports.database = {
	type: 'redis',
	prefix: '#scrumblr#',
	redis: argv.redis || redisURL || 'redis://127.0.0.1:6379'
};

