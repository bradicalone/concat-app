/*<=========DRAG AND DROP============>*/


let dropZone = document.getElementById('drop_zone');

var addRows = (function addRows(){
    
    let table = document.createElement( 'table' );
    let append = dropZone.appendChild(table);
    for(var i = 0; i < 26; i++){
        var row = document.createElement( 'tr' );
        var tr = append.appendChild(row);
        tr.className = 'item'
        for(let j = 0; j < 2; j++){
            var new_td = document.createElement( 'td' );
            var tr_td = row.appendChild( new_td )
            }
        }
        var td = document.getElementsByTagName( 'td' );
        for(var i = 0; i < td.length; i++ ){
            if(i % 2 == 0){ 
                td[i].className = 'og';  
            }else td[i].className = '_new'
        }
        return addRows; //so function can be called again
})();
        
        document.getElementById('text_two').addEventListener('click', function(){
            addRows();
        })

        var i = 0;
    function addData(ev, data){
            var og = document.querySelectorAll(".og");
            var checkbox = `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="form-check-input" id="check${i}">
                            <label class="form-check-label get" for="check${i}">${data}</label></div>`

            /*check first element has a child, if not add checkbox*/
            if(!og[0].hasChildNodes()){  
                og[0].innerHTML = checkbox
                og[0].getElementsByTagName('input')[0].id = 'check'   //keeps the checkbox working correctly
                og[0].getElementsByTagName('label')[0].setAttribute('for', 'check')  //keeps the checkbox working correctly
            }else{
                i++;
                og[i].innerHTML = checkbox
            }
                var item = document.querySelectorAll('.item')
        };

function dragover_handler(ev) {
        if( ev ){dropZone.style.backgroundColor = 'lightGrey';
            console.log("dragOver");
        }
        // Prevent default select and drag behavior
        ev.preventDefault();
    };


    dropZone.addEventListener("dragleave", function( ev ) {
         if( ev ) dropZone.style.background = "";
    }, false);

function drop_handler(ev) {
        if( ev ) dropZone.style.background = "";
        console.log("Drop");
        ev.preventDefault();

        // If dropped items aren't files, reject them
        var dt = ev.dataTransfer;
        if (dt.items) {

        // Use DataTransferItemList interface to access the file(s)
        for (var i=0; i < dt.items.length; i++) {
            console.log(i)
            if(i > 24) addRows();
            if (dt.items[i].kind == "file") {
                var f = dt.items[i].getAsFile();
                console.log("... file[" + i + "].name = " + f.name);
                addData(ev, f.name)
            }
        }
        }else {
            // Use DataTransfer interface to access the file(s)
            for (var i=0; i < dt.files.length; i++) {
                if(i > 24) addRows();
                console.log("... file[" + i + "].name = " + dt.files[i].name);
                addData(dt.files[i].name)
            }  
        }
    };


function prepend(e){
 
        input.removeEventListener(e.type, arguments.callee);
        var formItem = document.querySelectorAll('.custom-checkbox')
        var _new = document.querySelectorAll('._new')

        //loop through current files
        for(let i = 0; i < formItem.length; i++ ){
            for(let j = 0; j < _new.length; j++){
                //if both index equal eachother 
                if(i == j){
                    var content = formItem[i].textContent;
                    //adds just text along with a p element wrapping it
                    _new[j]+= _new[j].innerHTML = `<p class="newContent">${content}</p>`;
                    var currentText = document.querySelector('.newContent');
                    console.log(_new[j].textContent)
                    //trims white space left on from adding new text
                    _new[j].textContent = _new[j].textContent.replace(/\s+/ig,' ').trim();   
                    let p = document.createElement("p");
                    p.className += 'added';
                    //adds another p element where text is going to be updated 
                    _new[j].insertBefore(p, _new[j].firstChild)
                }
            }
        }  
        // return currentText;
    }



function set(el,text){
    for(var i of el){
        while(i.firstChild)
            i.removeChild(i.firstChild)
            i.appendChild(document.createTextNode(text))
             // el.textContent = el.textContent.replace(/^/ig,text)
    }    
}
 
    /* setupUpdater will be called once, on page load. */
    function setupUpdater(){
     var input = document.getElementsByTagName('textarea')[0],
         orig = document.getElementById('original'),
         oldText = input.value,
         timeout = null;
     
    /* handleChange is called 50ms after the user stops typing. */
    function handleChange(){
      currentText = document.querySelectorAll('.added');
      var newText = input.value;
      if (newText == oldText) return;
       else oldText = newText;

      // set(reversed, reverse(newText));
      // set(count, 'You entered '+newText.length+' characters.');
      set(currentText, newText);
      // set(t, newText)
     }
     
    /* eventHandler is called on keyboard and mouse events. If there is a pending 
       timeout, it cancels it. It sets a timeout to call handleChange in 50ms. */
    function eventHandler(){
      if(timeout) clearTimeout(timeout);
      timeout = setTimeout(handleChange, 20);
     }
     input.onkeydown = input.onkeyup = input.onclick = eventHandler;
    }
    setupUpdater();

    document.getElementsByTagName('textarea')[0].focus();
    var input = document.getElementsByTagName('textarea')[0];
        /*<============ CONCAT FUNCTIONS ============>*/

    // input.addEventListener("click", function(){
  
    // })
    
    function fireFunction(e){
        // console.log(e.target)
        console.log(this.value)
        if(this.value === "Prepend"){      
               prepend(e);

        }else if(this.value === "Append"){     
               append(e)
        }else if(this.value === "Replace"){
               replace(e)
        }
    }
    
    var select = document.getElementById('picker');
    select.addEventListener("change", fireFunction);

    // input.addEventListener("click", fireFunction)

    function handler(e) {
    // remove this handler
    e.target.removeEventListener(e.type, arguments.callee);

        alert("You'll only see this once!");
    }




// function concat(art_name, artist){
// 	let first_string = '/collections/artist-products/ar:';
// 	let second_string = '+aw:';
// 	let arr = [];
// 	let tostring = '';
// 	for(let j = 0; j < art_name.length; j++){
// 		var artwork = art_name[j].toString().replace(/ -/gi, '');
// 		for(let i = 0; i < artist.length; i++){

// 			var artistname = artist[j].toString().replace(/ /gi,'-');
// 		}
// 		tostring +=  (first_string + artistname + second_string + artwork).replace(/ /gi, '-') + '\n';
// 	}
// 	console.log(tostring)
// }
// concat(artwork_name, artist_name);



		// console.log(artwork)
	// if(artwork_name[j].indexOf('-') != -1){
	// 	var artwork = artwork_name[j].replace(/-/gi, '');
	// 	// console.log(found);
	// }
