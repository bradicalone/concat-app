const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const multer  = require('multer')
const webp = require('webp-converter');
const port = process.env.PORT || 8081;  // heroku sets a port called PORT or if it doesn't work uses port 3000
const path = require('path')
const os = require("os");
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
		// var interfaces = os.networkInterfaces();
		// for(i in interfaces){
		// 	console.log(interfaces[i])
		// }
		// console.log(Object.keys(interfaces) )
		// var addresses = [];
		// for (var k in interfaces) {
		//     for (var k2 in interfaces[k]) {
		//         var address = interfaces[k][k2];
		//         if (address.family === 'IPv4' && !address.internal) {
		//             addresses.push(address.address);
		//         }
		//     }
		// }

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



var app = express();
hbs.registerPartials(__dirname + '/views/partials')

// webp.webpmux_add("webp-start/meta.webp","webp-finished/meta.webp","xmp",function(status)
//   {
//   	console.log(status)
//   	//if exicuted successfully status will be '100' 
//   	//if exicuted unsuccessfully status will be '101' 
//   	console.log(status);
//   });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now())
  }
})

let arr = [];

app.set('view engine', 'hbs');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname +'/public'));


app.get('/', (req, res)=>{
	res.sendFile('index.html')
});

app.get('/concat', (req, res) =>{
	res.sendFile(__dirname + '/public/form.html');
});


 
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

app.listen(port, () => {  
  console.log('Server is up on ' + port)
});