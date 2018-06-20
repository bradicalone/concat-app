var start;

const easeout = progress =>
    Math.pow(--progress, 5) + 1;

var forms = (function(){
	var _this;
	var form = document.getElementsByTagName('form');
	function isEmail(email){
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email)
	}
	for(var i = 0; i < form.length - 1; i++){
		form[i].addEventListener('submit', function(e){
			_this = this;
			e.preventDefault();
		
			var input = this.getElementsByTagName('input');
			
			queryForm();
			function queryForm(){

				var data = {
					errors: [],
					values: [],
					
				}
				if(_this.id === "login"){

					for(let i = 0; i < input.length; i++){
						if(input[i].value == ""){
							
							data.errors.push(input[i].name.toUpperCase() + " " + "field is required.")
						}
						if(input[i].name == 'email'){
							
							if(!isEmail(input[i].value)){
								data.errors.push(input[i].name.toUpperCase() + " " + "is not valid.")
							}
						}
					//Pushes values if all pass
					if(!data.errors.length) data.values.push(input[i].value)
					}
				console.log(data.errors, data.values);
				}

				if(_this.id === "register"){
					// data.file += input[5].value
					for(let i = 0; i < input.length - 1; i++){

						if(input[i].value == ""){
							data.errors.push(input[i].name.toUpperCase() + " " + "field is required.")
						}
						//Email test
						if(input[i].name == 'email'){
							
							if(!isEmail(input[i].value)){
								data.errors.push(input[i].name.toUpperCase() + " " + "is not valid.")
							}
						}
						//Password match
						if(input[i].name == "password" || input[i].name == "password2"){
							if(input[3].value != input[4].value){
							//Check that passwords match
							data.errors.push(input[3].name.toUpperCase() + " " + "doesn't match" + " " + input[4].name.toUpperCase()+".");
							}
						}
						//Pushes values if all pass
						if(!data.errors.length) data.values.push(input[i].value)
					}
				}
			return data
			}	

			//filters out duplicates in errors array
			var data = new queryForm;
			var	errors = data.errors.filter(function(item, index){
				return data.errors.indexOf(item) == index;
			})

			//Checks if array has any errors in it.
			if(data.errors.length){
				
				var error = _this.parentNode.querySelector('.error')
				var currentHeight = error.offsetHeight;
				console.log(currentHeight);
				for(var i = 0; i < data.errors.length; i++){

					//Gets last element 
					var last_error = data.errors.length - 1
					console.log(last_error);
					var div = document.createElement('div')
					div.className += 'error-div'
					var node = document.createTextNode(errors[i])
					div.appendChild(node)
					error.appendChild(div)
					if(i == last_error || i === 2){
						
						var autoHeight = error.style.height = 'auto'
						
						
						var newHeight = window.getComputedStyle(error).height 
						error.style.height = currentHeight  //makes height back to 0
					}
					queryErrors;
					var queryErrors = function(){
						
						errorBtn = _this.parentNode.childNodes[3].querySelectorAll('.clear-error, .clear-error .btn')
						errorDiv = document.querySelectorAll('.error-div')
						
						//Shows button when errors are display
						errorBtn[0].style.display = "flex"
						errorBtn[1].addEventListener('click', function(e){
							var errorDivs = []

							for(var i = 0; i < errorDiv.length; i=i+1){
								errorDivs.push(errorDiv[i])
							}
							requestAnimationFrame(function(timestamp){
								start = performance.now()
								animateErrors(timestamp,e, queryErrors(), errorDivs)
								// removeErrors(timestamp,e, queryErrors(), errorDivs)
							})
						})

						return elemInfo = {
									errorButton: errorBtn[0],
									errorHeight: parseInt(window.getComputedStyle(errorBtn[0]).height),
									newHeight: parseInt(newHeight),
									errorElem: _this.parentNode.childNodes[3]
								}
					}
					requestAnimationFrame(function(timestamp){
						start = performance.now()
						animateErrors(timestamp, e, queryErrors())
					})
					
				}
			}else{
				var formData = new FormData();
				formData.append("value", data.values)
				_this.id == "register" ? formData.append("profileimage", input[5].files[0]) : 'No file field'
				getData(formData)
			}
		}); //submit function
	};
	
})();


var frameId;
function animateErrors(timestamp, e, queryErrors, errorDivs ){
	var elemHeight = queryErrors.errorHeight + queryErrors.newHeight
	var runtime = timestamp - start
	var progress = Math.min(runtime / 300, 1).toFixed(1)

	if(e.target.id ==="register" || e.target.id === "login")  divOpen(progress, queryErrors, elemHeight)
	else if(e.target.id === "register-close" || e.target.id === "login-close")  divClose(progress, queryErrors, errorDivs, elemHeight)

	if(progress < 1){
		frameId = requestAnimationFrame(function(timestamp){
			animateErrors(timestamp, e, queryErrors, errorDivs)
		})
	}else cancelAnimationFrame(frameId)
}

function divOpen(progress, queryErrors, elemHeight){
	
	var height = queryErrors.errorElem.style.height = elemHeight * progress + "px"
	
}

function divClose(progress, queryErrors, errorDivs, elemHeight){
	var height = queryErrors.errorElem.style.height = elemHeight -  ( elemHeight * progress ) + "px"
	console.log(height);
	if(progress == 1) {
		queryErrors.errorButton.style.display = "none"
		for(var i = 0; i < errorDivs.length; i++){
			
			errorDivs[i].remove()
		}
	}
}



function getData(formData){
	console.log(formData);
	$.ajax({
		url: "/",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData,
		success: function(data){
			console.log(data);
		},
		error: function(xhr, textStatus, error){
			console.log(xhr.statusText);
		    console.log(textStatus);
		    console.log(error);
		}
	})
};
