// request and cheerio
var request = require('request');
var cheerio = require('cheerio');

// scrape function
var scrape = function(cb) {
	request ('http://www.fark.com', function(err, res, body){
		// create cheerio $ variable
		var $ = cheerio.load(body);

		// empty aricles array
		var articles = [];

		// search for each headline
		$("tr td.headlineText span.headline").each(function(i, element) {
			//save text and link to variables
			// Add the text and href of every link, and save them as properties of the result object
			var title = $(this).children("a").text();
			var link = $(this).children("a").attr("href");

			var articleObject = {
				headline: title,
				link: link
			};

			articles.push(articleObject);
		});

		// callback articles
		cb(articles);
	});
};

module.exports = scrape;