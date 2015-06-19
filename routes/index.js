
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function(req, res) {
	
	console.log("main route requested");

	var data = {
		status: 'OK',
		message: 'Welcome to the itpeeps-map v1 API'
	}

	// respond back with the data
	res.json(data);
}

/**
 * POST '/api/create'
 * Receives a POST request of the new user and location, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.create = function(req,res){

	console.log(req.body);

	// pull out the name and location
	var name = req.body.name;
	var location = req.body.location;
}

/**
 * GET '/api/get'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */

exports.getAll = function(req,res){

  	var jsonData = {
  		status: 'OK',
  		people: data
  	}	

  	res.json(jsonData);
}

/**
 * POST '/api/update/:id'
 * Receives a POST request with data of the user to update, updates db, responds back
 * @param  {String} req.param('id'). The userId to update
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.update = function(req,res){

	var requestedId = req.param('id');

	// pull out the name and location
	var name = req.body.name;
	var location = req.body.location;

}

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the user to delete
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

exports.remove = function(req,res){

	var requestedId = req.param('id');
}