    let pf = document.querySelectorAll('.pf');
	let wrapper = document.getElementById('wrapper');
	let _left;
	let _top;
	let start_nav;
	for(let i of pf){
		Object.assign(i.style, {
			left: '1000px'
		})
	}

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
					// console.log(window.getComputedStyle(pf[1]).getPropertyValue('transform'));
					requestAnimationFrame(logoAnimate)
				}
			}
			requestAnimationFrame(logoAnimate)
	}


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
								iconUp(timestamp);
							})
						},500) //half second to call the next function iconUp()
					}
				},100 * i)
			})(i);
		}
	};
	shiftLetters()


	function iconUp(timestamp){
	const y = _top.replace(/.{2}$/, "");
	const x = _left.replace(/.{2}$/, "");

		var runtime = timestamp - start;
		var progress = Math.min(runtime / 1000, 1)
		var ease = easeOut(progress);
		

		if(runtime < 1000){
			if(window.innerWidth < 800){
				document.getElementById('wrapper').style.transform = `translate3d(0,${(-y * ease)}px, 0)`
			}else{
			//119 is the font size to begin with, 90 is the difference for size
			for(let i=0;i<pf.length;i++){
				
				pf[i].style.fontSize = `${119 - (85 * ease)}px`;  
			}
				Object.assign(document.querySelector('.cat').style, {
					width: `${188 - (120 * ease)}px`,
					marginTop: `${-76 - (-53 * ease)}px`,
					marginLeft: `${-116 - (-70 * ease)}px`
				})
				document.getElementById('wrapper').style.transform = `translate3d(${-x * ease}px,${(-y * ease)}px, 0)`
			}
			requestAnimationFrame(iconUp)
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

		if(runtime <= 500){

			document.querySelector('.navbar').style.transform = `translateY(${72 * progress}px)`;
		}
		requestAnimationFrame(navFadeIn)
};

function fadeIn(timestamp){
	
	let runtime = timestamp - start;
	let progress = Math.min(runtime / 500, 1);
	
	if(progress <= 1){
		document.querySelector('.popup').style.opacity = `${1 * progress}`
		document.querySelector('.popup').style.transform = `translate(-50%, ${80 - (30 * progress)}%)`;
	}
	requestAnimationFrame(fadeIn)
};


document.querySelectorAll('.item')[2].addEventListener('click',  function(){
	 requestAnimationFrame(function(timestamp){
	 	start = timestamp || performance.now();
	 	fadeIn(timestamp)
	 })
});






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





















