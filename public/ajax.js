
$(document).ready( function(){

// function drop_handler(ev) {
//         ev.preventDefault();
//        console.log('ajax')
//         // If dropped items aren't files, reject them
//         var dt = ev.dataTransfer;
//         // Use DataTransferItemList interface to access the file(s)
//         for (var i=0; i < dt.items.length; i++) {
//             console.log(i)
//             if (dt.items[i].kind == "file") {
//                 var f = dt.items[i].getAsFile();
//                 console.log("... file[" + i + "].name = " + f.name);
              
//             }
//         }
//     };

    let drop_zone = document.getElementById('drop_zone').addEventListener('drop', (ev)=>{
    	ev.preventDefault();
       console.log('ajax')
        // If dropped items aren't files, reject them
        var dt = ev.dataTransfer;
        // Use DataTransferItemList interface to access the file(s)
        for (var i=0; i < dt.items.length; i++) {
            console.log(i)
            if (dt.items[i].kind == "file") {
                var f = dt.items[i].getAsFile();
                console.log("... file[" + i + "].name = " + f.name);
              
            }
        }
    })


	$('#form').on('submit', function(e){
			var form = document.querySelectorAll('.get');
		for(let i of form){

			console.log(i);
			let files = form[3].files[0];
			// let files = form[3].value;
			console.log(files)
			let formData = new FormData();
			formData.append("image", files)
			begin(formData)
		}
		
		// formData.forEach(function(ele){
		// 	console.log(ele)
		// })
		// console.log(formData)
	// var formData = $('.get');

		
		function begin(formData){
			
			$.ajax({
				url: "/concat",
				data: formData,
				processData: false,
	  			contentType: false,
	  			type: "POST",
				success: function(data){

					console.log('my username: ',data)
					document.getElementById('add').innerHTML = data;

				},
				error: function(xhr, textStatus, error){
					      console.log(xhr.statusText);
	      				  console.log(textStatus);
	      				  console.log(error);
				}
			})
		}
		return false;
	})
});


 // $('form').on('submit', function(){

 //      var item = $('form input');
 //      var todo = {item: item.val()};

 //      $.ajax({
 //        type: 'POST',
 //        url: '/todo',
 //        data: todo,
 //        success: function(data){
 //          //do something with the data via front-end framework
 //          location.reload();
 //        }
 //      });

 //      return false;

 //  });

 //  $('li').on('click', function(){
 //      var item = $(this).text().replace(/ /g, "-");
 //      $.ajax({
 //        type: 'DELETE',
 //        url: '/todo/' + item,
 //        success: function(data){
 //          //do something with the data via front-end framework
 //          location.reload();
 //        }
 //      });
 //  });