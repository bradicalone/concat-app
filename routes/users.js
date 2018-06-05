var express = require('express');
var router = express.Router();
const http = require('http');
const multer  = require('multer');
const addImage = multer({dest: './public/user-img'})
var app = express();


/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('index.html')
});

router.get('/concat', (req, res) =>{
	// res.sendFile(__dirname + '/views/form.html');
	res.render('form.html')
});

// router.get('/register', (req, res) =>{
// 	// res.sendFile(__dirname + '/views/form.html');
// 	res.render('index.html')
// });

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        
	router.post('/', addImage.single('profileimage'), (req, res) =>{



	let name = req.body.name
	let email = req.body.email
	let username = req.body.username
	let password = req.body.password
	let password2 = req.body.password2

	if(req.file){
		console.log("uploading file....");
		var profileimage = req.file.filename
		// res.end('all done')
	}else{
		console.log('no file uploaded');
		var profileimage = 'img/two.png'
	}

	// Form Validator 
	//name is the field name, then the message for it. 
	//notEmpty() checks if field is empty
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Password2 field is required').equals(req.body.password);

	// Check Errors
	let errors = req.validationErrors()
	
	if(errors){
		console.log(errors);
		socket.emit('newMessage',{
			errors: errors
		})
	
	}else {
		res.render('../public/form.html')
	}

});
   });
    return router;
};


module.exports.router = router;
// module.exports = {
// 	router,
// 	generateMessage
// }





