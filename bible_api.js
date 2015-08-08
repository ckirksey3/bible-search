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
		//remove verse numbers
		var bibleText = result.body.Output.replace(/[0-9]/g, '');
		if(bibleText == "Wrong slection!!! Please try again.") {
			bibleText = "Either I misheard you or that passage does not exist."
		}
		callback(null, bibleText)
	})
}

Bible.testGetPassage = function(test){
	//Mock makeBibleGetRequest
	Bible.prototype.makeBibleGetRequest = function (method, parameters, callback) {
		var result = { body: { Output: "35 Jesus wept" } };
		callback(null, result)
	}

	Bible.prototype.getPassage("John", 11, 35, 35, function logResult(err, result) {
	   	test.equal(err, null, "Request for verse errored");
	   	test.equal(result, " Jesus wept", "Correct verse was not returned");  
    	test.done();
	})
};

Bible.testGetMultipleVerses = function(test){
	//Mock makeBibleGetRequest
	Bible.prototype.makeBibleGetRequest = function (method, parameters, callback) {
		var result = { body: { Output: "35 Jesus wept. 36 Then the Jews said, “See how he loved him!”" } };
		callback(null, result)
	}

	Bible.prototype.getPassage("John", 11, 35, 35, function logResult(err, result) {
	   	test.equal(err, null, "Request for verse errored");
	   	test.equal(result, " Jesus wept.  Then the Jews said, “See how he loved him!”", "Correct verse was not returned");  
    	test.done();
	})
};

module.exports = Bible