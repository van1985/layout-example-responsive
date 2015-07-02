
/**
 * Loads the specified readme file.
 *
 */
function loadReadmeFile(mdName){
  var fullPath = mdName;

  Flatdoc.run({
    fetcher: Flatdoc.file(fullPath)
  });

  createPathLink(mdName);
}

/**
 * Load the home.md file by default
 * OR load file given in param 'readmePath'
 */
function initialize(){
	// Build Menu
	constructMenu();
	
	var query = window.location.search;

	// Load Readme File
	if (query != "" && query.indexOf("?readmePath=") > -1){
		filename = query.replace("?readmePath=", "");
		loadReadmeFile(filename);
	}
	else{
		loadReadmeFile('./home.md');
	}
}

/**
 * Buils menu by using settings.json
 * Note: settings.json is constructed by running
 * './buildTree.sh' which builds the tree dynamically
 * using the directory structure. More info on README.md
 *
 */
function constructMenu(){
	$.getJSON( "resources/settings.json", function( data ) {
	   var $ul = $('<ul>')
        .addClass('level-1')
        .attr('id', 'test-list')
        .appendTo(".content-menu");

	    data.navigation.forEach(function(menus) {
        	//console.log(menus)
	        var $li = $('<li>')
			      .attr('id', 1 + '-item')
			      .addClass('level-' + 1)
			      .appendTo($ul);

	        var $a = $('<a>')
			        .html(menus.title)
			        .attr('id', 1 + '-link')
			        .addClass('level-' + 1)
			        .appendTo($li);

	        menus.items.forEach(function(submenu) {
	        	// console.log(submenu);
	        	if (submenu.readmePath){
		        	//Create <a> elements dynamically
		        	var $a = $('<a>')
				        .html(submenu.title)
				        .attr('id', 1 + '-link')
				        .attr('onclick', "loadReadmeFile('"+submenu.readmePath+ "');")
				        .addClass('level-' + 2)
				        .appendTo($li);
				    }
	    		});
	    });

	});

}	

/**
 * Creates the path for users
 * ease to read & navigate.
 */
function createPathLink (readmePath){
	$('.nav-path').remove();

	var $li = $('<li>')
	    .attr('id', 'path')
	    .addClass('nav-path')
	    .appendTo('.nav-filePath');

	//Add Home element for all paths
	var span = $("<span>")
			.html("/")
			.appendTo('.nav-path');

	var $a = $('<a>')
      .html("Home")
      .attr("href", "index.html")
      .appendTo('.nav-path');

  var pathArr = readmePath.split("/");
  pathArr.forEach(function(pathEntry){
  	if (pathEntry != "" && pathEntry != "home.md"){
  		//remove dashes from the file or dir name to create the title for the menu
    	pathEntry = pathEntry.replace(/[-\s]/g, ' ');
  		pathEntry = pathEntry.replace(".md", "");

	  	var span = $("<span>")
	  			.html("/")
	  			.appendTo('.nav-path');

		  var $a = $('<a>')
	        .html(pathEntry)
	        .appendTo('.nav-path');
		}
  });
}
