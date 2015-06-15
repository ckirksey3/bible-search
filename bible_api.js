var Bible = function() {
	unirest = require('unirest')
	bibleApiBaseUrl = "https://ajith-holy-bible.p.mashape.com"
}

Bible.prototype.makeBibleGetRequest = function (method, parameters, callback) {
	unirest.get(bibleApiBaseUrl + "/" + method)
	.header("X-Mashape-Key", "93O1KXOHn0mshXUKCGb7ZBUnskj0p1RC5ecjsnonegr5j8IxHb")
	.header("Accept", "application/json")
	.query(parameters)
	.end(function (result) {
	  console.log(result.status, result.headers, result.body)
	  callback(null, result)
	})
}

Bible.prototype.getPassage = function (book, chapter, startVerse, endVerse, callback) {
	var method = "GetFromTwoVerses"
	var parameters = {
		Book: book,
		chapter: chapter,
		VerseFrom: startVerse,
		VerseTo: endVerse
	}
	this.makeBibleGetRequest("GetFromTwoVerses", parameters, function parseResponse(error, result) {
		console.log("getPass returned")
		callback(null, result.body.Output)
	})
}

module.exports = Bible