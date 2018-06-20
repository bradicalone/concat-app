    
    let pf = document.querySelectorAll('.pf');
	let wrapper = document.getElementById('wrapper');
	let _left;
	let _top;
	let start_nav;
	for(let i of pf){
		Object.assign(i.style, {
			left: '1000px'
		})
	};

	const easeOut = progress =>
    Math.pow(--progress, 5) + 1;

window.onload = function(){
	start = performance.now()
	function shiftLetters(){

		let dist = -1000;
		let dur = 500;

		const logoAnimate = (timestamp) =>{
				
			var runtime = timestamp - start

			var progress = Math.min(runtime / dur, 1)

			const position = progress * dist;
			iteration(runtime, position)
			if(runtime < 500){
				requestAnimationFrame(logoAnimate)
			}
		}
			requestAnimationFrame(logoAnimate)
	};


	function iteration(runtime,position){

		for(let i = 0; i < pf.length; i++){
			(function(i){ 
				setTimeout( () => {
					pf[i].style.transform = `translate3d(${position}px,0,0)`
					//last letter finishing transform
					const last_letter = pf[6].style.transform
					const translateX = last_letter.replace(/^([\w]*)\(-|px([,\s\d\w]*)\)/ig, "")

					if(translateX == 1000){
						
						_left = window.getComputedStyle(wrapper).getPropertyValue('left');
						_top = window.getComputedStyle(wrapper).getPropertyValue('top');
						setTimeout( () =>{
							requestAnimationFrame(function(timestamp){
								start = timestamp || performance.now();
								wrapper.style.top = _top; //keeps static position in px instead of percentage 
								wrapper.style.left = _left; //keeps static position in px instead of percentage 
								// iconUp(timestamp, runtime);
							})
						},1000) //half second to call the next function iconUp()
					}
				},100 * i)
			})(i);
		}
	};
	shiftLetters()


	function iconUp(timestamp, runtime){
	const y = _top.replace(/.{2}$/, "");
	const x = _left.replace(/.{2}$/, "");

		var runtime = timestamp - start;
		var progress = Math.min(runtime / 1000, 1)
		var ease = easeOut(progress);
		

		if(runtime < 1000){
			if(window.innerWidth < 800){
				document.getElementById('wrapper').style.transform = `translate3d(0,${(-y * ease)}px, 0)`
			}else{
			//119 is the font size to begin with, 85 is the difference for size
			for(let i=0;i<pf.length;i++){
				
				pf[i].style.fontSize = `${119 - (85 * ease)}px`;  
			}
				Object.assign(document.querySelector('.cat').style, {
					width: `${190 - (120 * ease)}px`,
					marginTop: `${-76 - (-53 * ease)}px`,
					marginLeft: `${-116 - (-70 * ease)}px`
				})
				document.getElementById('wrapper').style.transform = `translate3d(${-x * ease}px,${(-y * ease)}px, 0)`
			}
			requestAnimationFrame(iconUp,runtime)
		} else {
			requestAnimationFrame(function(timestamp){
				start_nav = timestamp || performance.now();
				navFadeIn(timestamp); //callback after letters done animating, navbar called to fadin
			})
		}
	}
};  //end of window on load


function navFadeIn(timestamp){
	let runtime = timestamp - start_nav;
	let progress = Math.min(runtime / 500, 1);
	if(progress <= 1){

		document.querySelector('.navbar').style.transform = `translateY(${73 * progress}px)`;
		document.querySelector('.background-img').style.transform = `translateY(${-700 * progress}px)`;
	}
	requestAnimationFrame(navFadeIn)
};


var form = (function(){
	let startPos;
	let endPos;
	let selector;
	let begin;
	function formFade(timestamp, opacity, opacity2){
		
		let runtime = timestamp - begin;
		let progress = Math.min(runtime / 500, 1)
		var ease = easeOut(progress)
		if(progress < 1){

			if(arguments[2]){
				//FADE OUT
			 	document.querySelector('.' + selector).style.opacity = `${opacity2 - (opacity2 * ease.toFixed(1))}`
				document.querySelector('.' + selector).style.transform = `translate(-50%, ${startPos - (endPos * ease)}px)`
			}else{ 
				//FADE IN
				document.querySelector('.' + selector).style.opacity = `${opacity * ease}`
				document.querySelector('.' + selector).style.transform = `translate(-50%, ${startPos - (endPos * ease)}px)`
			}
			requestAnimationFrame(function(timestamp){
				formFade(timestamp, opacity, opacity2)
			})
		}
	};

	

	var items = document.querySelectorAll('.item, #register-btn');
	for(let i of items){
		i.addEventListener('click',  function(e){

			//Loops through items again check if class active is current to be removed
			for(let i of items){

				if(i.classList.contains('active') && i != this){
					i.classList.remove('active')
				}else this.classList.add('active')
			}
			if(this.innerText == "Create Account"){ 
				selector = "register"
			}else selector = this.innerText.toLowerCase();
			
				
			

			document.querySelector('.' + selector).style.display = "block"
			let y = window.getComputedStyle(document.querySelector('.' + selector), null).transformOrigin

			startPos = y.replace(/^([\w\.]*)\s|px/ig, "");
			endPos = startPos - 35

		formRAF = requestAnimationFrame(function(timestamp){
				begin = timestamp || performance.now();
	 			formFade(timestamp,1.1, null);
		 	})

				//Filters out any current open forms 
		 	let displayBlock = Array.prototype.filter.call(document.querySelectorAll('.popup'), (elem) =>{
				return window.getComputedStyle(elem, null).display == 'block'
			})

		 		//Removes current forms when another is clicked to open		
			for(let i of displayBlock){
				if(i != document.querySelector('.' + selector) ){
					i.style.display = "none"
				}
			}
		})
	}; // End of navigation click

	
	//Close Form
	for(let i of document.querySelectorAll('.exit')){
		i.addEventListener('click', function(e){
	
			selector = e.path[1].classList[1]
			var y = e.path[1].style.transform
			console.log(y);
			startPos = y.replace(/^([\w(-\d\d%,]*)\s|px\)/ig, "")
			//endPos is set to negative to animate back down
			endPos = -endPos
			requestAnimationFrame(function(timestamp){
				begin = timestamp || performance.now();
	 		formFade(timestamp, null, 1.1 );
		 	})
		})
	}
}());

//Create Account
// document.querySelector('').addEventListener('click', () => {

// })



	$(document).ready(function() { 
		var $winwidth = $(window).width();
		$("img.background-img").attr({
			width: $winwidth
		});
		$(window).on("resize", function(){ 
			var $winwidth = $(window).width();
			$("img.background-img").attr({
				width: $winwidth
			});
		 });
	}); 

















