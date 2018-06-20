const express = require('express');
const router = express.Router();
const mongoose = require('../models/user');
const http = require('http');
const multer  = require('multer');
const addImage = multer({dest: './public/user-img'})
var {User} = require('../models/user');
var {createUser} = require('../models/user');
var app = express();

//Multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage }).array('image');


/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('index.html')
});


router.get('/concat', (req, res) =>{
	// res.sendFile(__dirname + '/views/form.html');

	res.render('form.html')
	
});


app.post('/concat',(req, res) => {
		
	upload(req, res, (err)=> {
		let text = req.body;
		if(err){
			console.log('Upload failed: ', err)
		}
		console.log("Upload successfully: ", req.files)
		console.log("Text: ", text)
		// res.send(req.file)
	})
})
	        
		router.post('/', addImage.single('profileimage'), (req, res) =>{

			console.log("values: ",req.body.value.split(','));
			var value = req.body.value.split(',')
			console.log(req.file);
			if(req.file || req.body){

				console.log("uploading file....");

				var newUser = new User({
					name:  value[0],
					email: value[1],
					username:  value[2],
					password: value[3],
					profileimage: req.file.filename
				});
			
				createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user)
				});

				
				
			}else{
				console.log('no file uploaded');
				var profileimage = 'img/two.png'
			}
				// res.location('/concat');
				// res.redirect('/concat');
					res.send(req.file)
			// let errors = req.validationErrors()
			
			// if(errors){
			
		
				
			// }else {
			// 	res.render('../public/form.html')
			// }

		});


module.exports.router = router;
// module.exports = {
// 	router,
// 	generateMessage
// }





