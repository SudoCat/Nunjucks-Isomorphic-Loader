var fs = require('fs');
var path = require('path');
var Loader = require('nunjucks/src/loader');

var NunjucksLoader = Loader.extend({
    //Based off of the Nunjucks 'FileSystemLoader'

    init: function(searchPaths, callback) {

      this.callback = callback;

      this.pathsToNames = {};

      if(searchPaths) {
        searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
        // For windows, convert to forward slashes
        this.searchPaths = searchPaths.map(path.normalize);
      } else {
        this.searchPaths = ['.'];
      }
    },

    getSource: function(name) {
    	var fullpath = null;
      var paths = this.searchPaths;

      for(var i=0; i<paths.length; i++) {
        var basePath = path.resolve(paths[i]);
        var p = path.resolve(paths[i], name);

        // Only allow the current directory and anything
        // underneath it to be searched
        if(p.indexOf(basePath) === 0 && fs.existsSync(p)) {
          fullpath = p;
          break;
        }
      }

      if(!fullpath) {
        return null;
      }

      this.pathsToNames[fullpath] = name;

      this.callback(fullpath);

      return {
  			src: fs.readFileSync(fullpath, 'utf-8'),
  			path: fullpath,
  			noCache: this.noCache
  		};
    }
});

module.exports = NunjucksLoader;
