// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Concat', (err, client) => {
	if(err){
	return	console.log('Unable to Connect to MongoDB Server')
	}
	console.log("Connected to MongoDB server");
	const db = client.db('Concat')  // database reference we're looking for

	db.collection('Login').insertOne({
		text: 'test May 16th 2018',
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