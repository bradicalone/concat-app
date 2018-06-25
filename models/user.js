 var mongoose = require('mongoose');

 mongoose.Promise = global.Promise;
 
 // mongoose.connect('mongodb://localhost:27017/Concat');
 if(mongoose.connection.readyState == 2){
 	console.log("Connected to MongoDB server")
 };


var User = mongoose.model('User', {
  username: {
    type: String,
    index: true
  },
  password: {
  	type: String
  },
  email: {
  	type: String
  },
  name: {
  	type: String
  },
  profileimage: {
  	type: String
  }
});


var createUser = (newUser, callback) =>{
	newUser.save(callback)
}
// module.exports = {mongoose};
module.exports = {User, createUser}  

// MongoClient.connect('mongodb://localhost:27017/Concat', (err, client) => {
// 	if(err){
// 	return	console.log('Unable to Connect to MongoDB Server')
// 	}
// 	console.log("Connected to MongoDB server");
// 	const db = client.db('Concat')  // database reference we're looking for

// 	db.collection('Login').insertOne({
// 		text: 'Test Test',
// 		completed: false
// 	}, (err, result)=>{
// 		if (err){
// 			console.log("Unable to insert");
// 		}
// 		console.log(JSON.stringify(result.ops, undefined, 2));
// 		console.log(result.ops[0]._id.getTimestamp()); //gets time of id added to database
// 	})


// 	db.collection('Login').find({
// 		text: 'test jun 11th 2018',
// 		_id: new ObjectID('5afcaf7f1f892f6145925062')
// 	}).toArray().then( (docs) =>{  //anything in .find()  will query the database
// 		console.log(JSON.stringify(docs, undefined, 2));
// 	}, ()=>{
// 		console.log("unable to fetch info");
// 	});

// 	client.close(); //closes connection to server
// });

