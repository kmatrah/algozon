const algoliasearch = require('algoliasearch');

module.exports = algoliasearch(process.env.APP_ID, process.env.API_KEY);