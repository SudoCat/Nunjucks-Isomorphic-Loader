var utils = require('loader-utils');

module.exports = function(source) {
	var opt = utils.parseQuery(this.query);

	var paths = Array.isArray(opt.root) ? opt.root : [opt.root];
	var context = JSON.stringify(opt.context || {});

	var module = 'var nunjucks = require("nunjucks/index");\n'
	+ `module.exports = function(data) {
      var paths = '${paths.toString().replace(/\\/g, '\\\\')}'.split(',');
    	var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(paths));
    	var template = nunjucks.compile(\`${source}\`, env);
    	var context = JSON.parse('${context}');
			return template.render(Object.assign({}, context, data));
		}`;

  return module
}
