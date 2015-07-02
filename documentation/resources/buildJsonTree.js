var fs    = require('fs'),
    path  = require('path');

var jsonTree = {
  "navigation": []
};

function buildTree() {
    checkDir("./documentation", jsonTree.navigation);

    jsonTree = JSON.stringify(jsonTree, null, '\t');

    fs.writeFile("./resources/settings.json", jsonTree, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function checkDir(dirName, submenuNode){
  var stats = fs.lstatSync(dirName);

  var title = path.basename(dirName);
  title = title.replace(/[-\s]/g, ' ');

  if (stats.isFile()){
    if (title.indexOf(".md") > -1 && dirName !== "./documentation/home.md"){

      var submenuItem = {
          title:        title.replace(".md", ""),
          readmePath:   dirName.replace(/^\.\/documentation/g, "")
      };

      submenuNode.push(submenuItem);
    }

    return;
  } else if(stats.isDirectory()) {
      var heading = {
        title: title,
        items: []
      };

      fs.readdirSync(dirName).map(function(child) {
        checkDir(dirName + '/' +  child, heading.items);
      });

      if (heading.items.length > 0){
        jsonTree.navigation.push(heading);
      }

      return;
    }

    console.log('No markdown files found in the documentation.');
}

buildTree();
