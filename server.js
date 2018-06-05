const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const hbs = require('hbs');
const ejs = require('ejs');
const fs = require('fs');
const multer  = require('multer')
const webp = require('webp-converter');
const port = process.env.PORT || 8081;  // heroku sets a port called PORT or if it doesn't work uses port 3000
const path = require('path')
const os = require("os");
const sessions = require("express-session");
const passport = require("passport");
const expressValidator = require("express-validator")
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const mongoose = require("mongoose");
const mongo = require("./database/mongo-connect.js");
// const {generateMessage} = require('./routes/users.js');
var app = express();
app.io = require('socket.io')();
var users = require('./routes/users')(app.io);

// const concat = require('./public/concat.js');
// fs.readFile('public/form.html', function(err, data){
// 	if(err){
// 		console.log("readfile error: "+ err)
// 	}
// 	console.log("the data: " + data)
// })


console.log("Directory name : "+ path.dirname(__dirname + '/public'))
console.log("Path extension: " + path.extname("server.js"))


	/*<=========OSX module for info about computer==========>*/
		var interfaces = os.networkInterfaces();
		for(i in interfaces){
			// console.log(interfaces[i])
		}
		console.log(Object.keys(interfaces) )
		var addresses = [];
		for (var k in interfaces) {
		    for (var k2 in interfaces[k]) {
		        var address = interfaces[k][k2];
		        if (address.family === 'IPv4' && !address.internal) {
		            addresses.push(address.address);
		        }
		    }
		}

// console.log(addresses); 


let p = __dirname + '/webp-start'
// console.log(p)
// function getDirectories(p) {
//   return fs.readdir(p).filter(function (file) {
//   	console.log(file)
//     return fs.statSync(p+'/'+file).isDirectory();
//   });
  
// }
		/*<========== Read Directory =============>*/
	// console.log(user[id])
	// var buf = new Buffer(12); // number of bytes or number of characters allowed in a file
	// fs.readdir(p, function(err, files){
	// if(err){
	// 	console.log(err)
	// }
	// 	files.forEach(function(file, i){
	// 		console.log(file)
	// 		if(i==4){
	// 		 	console.log("The fourth file: " +file) 

				/*<==========Deletes Files =============>*/
 				// fs.unlink(p+'/'+ file, function(err,){
				// 	if(err){
 				// 		return	console.log(err)
 				// 	}
 				// 		console.log(file +" " + i)
	
 				// 	fs.stat(p+'/'+ file, function (err, stats) {
	    // 					if (err) {
 	   //     					return console.error(err);
 	   // 						}
	   // 						console.log(stats.isFile())
				// 		})
				// 	})  /*<========== End of Deletes Files =============>*/

				/*<==========Open File & Read File =============>*/
	// 			fs.open(p+'/'+file, "r", function(err, readfile){
	// 			if(err){
	// 					return	console.log(err)
	// 				}
	// 					console.log("File opened successfully!");
	// 					console.log(readfile)
 //   					fs.read(readfile, buf, 0, buf.length, 0,  function(err, data){
 //   							if(err){
	// 							return	console.log(err)
	// 						}
	// 						console.log("contents of file: "+ data)
	// 						console.log("buffer: " + buf); // the buf is the file to actually read the info
	// 						console.log("buffer length: "+ buf.length)
 //   					})
	// 			})
	// 		}//end of if statement				
	// 	}) // end of forEach
	// });


app.use(express.static(__dirname +'/public'));


//Socket IO
var server = http.createServer(app);
app.io.attach(server);

hbs.registerPartials(__dirname + '/views/partials')

// webp.webpmux_add("webp-start/meta.webp","webp-finished/meta.webp","xmp",function(status)
//   {
//   	console.log(status)
//   	//if exicuted successfully status will be '100' 
//   	//if exicuted unsuccessfully status will be '101' 
//   	console.log(status);
//   });
// const add = multer({dest: './public/user-img'})
// app.post('/', add.single('profileimage'), (req, res) =>{
// 	console.log(req.body.name);
// });

//Multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now())
  }
})

//Handle Sessions
app.use(sessions({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport, authentication system
app.use(passport.initialize());
app.use(passport.session());


//Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split("."),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		}
	}
}));




app.use(require('connect-flash')());
app.use(function (req, res, next) {
	res.locals.messsages = require('express-messages')(req, res);
	next();
});

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname +'/public'));
app.use('/', users);

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });






// app.get('/', (req, res)=>{
// 	res.sendFile('index.html')
// });

// app.get('/concat', (req, res) =>{
// 	res.sendFile(__dirname + '/public/form.html');
// });


 
var upload = multer({ storage: storage }).array('image');
// var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
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
	// if(!req.body) return res.sendStatus(400);
	// 	else if(pattern.test(req.body.text)) console.log("use regular characters");
			
		
	// var text = req.body;
	// var remove = arr.push({
	// 	text: text
	// });
	// console.log('The text: ',text)
		
})

server.listen(port, () => {  
  console.log('Server is up on ' + port)
});