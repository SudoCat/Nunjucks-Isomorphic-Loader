var utils = require('loader-utils');

module.exports = function(source) {
	var opt = utils.getOptions(this);

	var paths = Array.isArray(opt.root) ? opt.root : [opt.root];
	var context = JSON.stringify(opt.context || {});

  paths = paths.map(function(el) {
    return utils.stringifyRequest(this, el);
  });

  var njkPath = require.resolve('nunjucks/src/environment');
  var nunjucks = utils.stringifyRequest(this, '!' + njkPath);
  this.addDependency(njkPath);

  var fsLoaderPath = require.resolve('./njk-loader');
  var fsLoader = utils.stringifyRequest(this, '!' + fsLoaderPath);
  this.addDependency(fsLoaderPath);

  var module = 'var nunjucks = require(' + nunjucks + ');\n'
  + 'var fsLoader = require(' + fsLoader + ');\n'
	+ `module.exports = function(data) {
      var paths = ${paths.toString()}.split(',');
    	var env = new nunjucks.Environment(new fsLoader(paths));
    	var template = new nunjucks.Template(\`${source}\`, env);
    	var context = JSON.parse('${context}');
			return template.render(Object.assign({}, context, data));
		}`;

  return module
}
