document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('drop_zone').addEventListener('drop', function (e) {
		e.stopPropagation();
		e.preventDefault();
		console.log(e.dataTransfer)
		
		for (const item of e.dataTransfer.items) {
			if(item.kind == 'file'){
				const entry = item.webkitGetAsEntry();
				handleEntry(entry)
			}
		}


	function handleEntry(entry) {
		 console.log('name: ' + entry.name);
	  console.log('path: ' + entry.fullPath);
	  if (entry.isFile) {
	    console.log('... is a file');
	  } else if (entry.isDirectory) {
	  	let path = entry.fullPath;
	  	console.log(entry)
	  	console.log('... is a directory');
	  	let reader = dirEntry.createReader();
	  	
	    let doBatch = function() {
    		// Read a batch.
		    reader.readEntries(entries => {
		    	console.log(entries)
		      // Complete?
		      if (entries.length === 0) {
		        return;
		      }

		      // Process the batch.
		      entries.forEach(handleEntry);

		      // Read the next batch.
		      doBatch();

		    }, error => console.warn(error));
		  };

		// Start reading
		doBatch();
	  }
	};

		function getDirectoryAsPromise(entry, path) {
			console.log(entry.createReader())
		  return new Promise((resolve, reject) => {
		    entry.getDirectory(path, {}, resolve, reject);
		  });
		}
	})
})









