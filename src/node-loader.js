var utils = require('loader-utils');

module.exports = function(source) {
	var opt = utils.getOptions(this);

	var paths = Array.isArray(opt.root) ? opt.root : [opt.root];
	var context = JSON.stringify(opt.context || {});

  var nunjucks = utils.stringifyRequest(this, '!' + require.resolve('nunjucks/index'));

  var module = 'var nunjucks = require("' + nunjucks + '");\n'
	+ `module.exports = function(data) {
      var paths = '${utils.stringifyRequest(paths.toString())}'.split(',');
    	var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(paths));
    	var template = nunjucks.compile(\`${source}\`, env);
    	var context = JSON.parse('${context}');
			return template.render(Object.assign({}, context, data));
		}`;

  return module
}
