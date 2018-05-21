// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


var config = {
      "USER"    : "admin",           
      "PASS"    : "123Bradical123",
      "HOST"    : "ec2-35-162-164-234.us-west-2.compute.amazonaws.com",  
      "PORT"    : "27017", 
      "DATABASE" : "Concat"
    };

var dbPath  = "mongodb://"+config.USER + ":"+
    config.PASS + "@"+
    config.HOST + ":"+
    config.PORT + "/"+
    config.DATABASE;

console.log(dbPath);

MongoClient.connect(dbPath, (err, client) => {

	

   
// var mongo = MongoClient.connect('mongodb://admin:123Bradical123@ec2-35-162-164-234.us-west-2.compute.amazonaws.com/Concat', (err, client) => {
	if(err){
	return	console.log('Unable to Connect to MongoDB Server')
	}
	console.log("Connected to MongoDB server");
	const db = client.db('Concat')  // database reference we're looking for

	db.collection('Login').insertOne({
		text: 'test May 20th 2018',
		completed: false
	}, (err, result)=>{
		if (err){
			console.log("Unable to insert");
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
		console.log(result.ops[0]._id.getTimestamp()); //gets time of id added to database
	})

	client.close(); //closes connection to server
});




/* Connect to MongoDB from terminal by just running this file:  nodemon mongo-connect.js */