var bibleApi = require('./bible_api.js')
var bibleApiInstance = new bibleApi()
bibleApiInstance.getPassage('Luke', '1', '5', '8', function logResult(err, result) {
	console.log(result)
})