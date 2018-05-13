    let pf = document.querySelectorAll('.pf');
	let wrapper = document.getElementById('wrapper');
	let _left;
	let _top;
	for(let i of pf){
		Object.assign(i.style, {
			left: '1000px'
		})
	}


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
				setTimeout( function(){
					pf[i].style.transform = `translate3d(${position}px,0,0)`
					//last letter finishing transform
					const last_letter = pf[6].style.transform
					const translateX = last_letter.replace(/^([\w]*)\(-|px([,\s\d\w]*)\)/ig, "")

					if(translateX == 1000){
						
						_left = window.getComputedStyle(wrapper).getPropertyValue('left');
						_top = window.getComputedStyle(wrapper).getPropertyValue('top');
						setTimeout( ()=>{
							requestAnimationFrame(function(timestamp){
								start = timestamp || performance.now();
							
								iconUp(timestamp);
							})
						},500)
					}
				},100 * i)
			})(i);
		}
	}
	shiftLetters()


	function iconUp(timestamp){

	wrapper.style.top = _top; //keeps static position in px instead of percentage 
	wrapper.style.left = _left; //keeps static position in px instead of percentage 
	const y = _top.replace(/.{2}$/, "");
	const x = _left.replace(/.{2}$/, "");

		var runtime = timestamp - start;
		var progress = Math.min(runtime / 1000, 1)
		

		if(progress <= 1){
			if(window.innerWidth < 800){
				document.getElementById('wrapper').style.transform = `translate3d(0,${(-y * progress)}px, 0)`
			}else{
			for(let i of pf){
				
				i.style.fontSize = `${120 - (85 * progress)}px`  //120 is the font size to begin with, 90 is the difference for size
			}
			Object.assign(document.querySelector('.cat').style, {
				width: `${188 - (120 * progress)}px`,
				marginTop: `${-75 - (-53 * progress)}px`,
				marginLeft: `${-116 - (-70 * progress)}px`
			})
			document.getElementById('wrapper').style.transform = `translate3d(${-x * progress}px,${(-y * progress)}px, 0)`
		}
	}
		requestAnimationFrame(iconUp)
	}
}




