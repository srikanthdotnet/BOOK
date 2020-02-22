//create one folder in command prompt =>go to cmd=>and do the process one by one.
//npm init
//npm install --save express
//npm install --save mssql
//npm install --save body-parser

//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "sa1",
    server: "DESKTOP-AB1GO3B",
    database: "MIDLAND"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){
 	
	sql.connect(dbConfig, function (err) {
		if (err) {   
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, resp) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					console.log(resp);
					res.send(resp);
				}
			});
		}
	});	
}
app.get("/api/user", function(req , res){
console.log("select called");
	var query = "select * from sr123";
	executeQuery (res, query);
});

//POST API
 app.post("/api/userinsert", function(req , res){
console.log(req.body);
	//var query = "INSERT INTO sr123 (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
	//executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){

	var query = "UPDATE sr123 SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/userdelete/:id", function(req , res){
	var query = "DELETE FROM sr123 WHERE Id=" + req.params.id;
	executeQuery (res, query);
});


 