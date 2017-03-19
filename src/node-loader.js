var fs = require('fs');
var path = require('path');
var utils = require('loader-utils');
var nunjucks = require('nunjucks');
var fsLoader = require('./fs-loader');

function getConfig(that, name) {
	var config;
	configPath = require.resolve(path.resolve(process.cwd(), name));
	if ( configPath ) {
		try {
			var data = fs.readFileSync(configPath, 'utf8');
			config = that.exec(data, name);
			if ( config ) {
				that.addDependency(configPath);
			}
			return config;
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = function(source) {
	var opt = utils.getOptions(this);

	var paths = Array.isArray(opt.root) ? opt.root : [opt.root];
	var context;

	if ( typeof opt.context === "string" ) {
		context = getConfig(this, opt.context);
	}

	context = JSON.stringify(context || opt.context || {});

	var njkPath = require.resolve('nunjucks');
	this.addDependency(njkPath);

	var loaderPath = require.resolve('./fs-loader');
	this.addDependency(loaderPath);

	var njkSlimPath = require.resolve('nunjucks/browser/nunjucks-slim');
	var nunjucksSlim = utils.stringifyRequest(this, '!' + njkSlimPath);
	this.addDependency(njkSlimPath);

	var env = new nunjucks.Environment(new fsLoader(paths, this.addDependency));

	var name = path.relative(opt.root[0], this.resourcePath);

	this.addContextDependency(opt.root[0]);

	var precompiledTemplates = nunjucks.precompile(opt.root[0], {
		env: env,
		include: [/.*\.njk$/]
	});

  var module = `// Return function to HtmlWebpackPlugin
		// Allows Data var to be passed to templates
		// Then render templates with both HtmlWebpackPlugin Data
		// and Nunjucks Context
		var nunjucks = require(${nunjucksSlim});

		// Create fake window object to store nunjucks precompiled templates
		global.window = {};

		${precompiledTemplates}

		var env = new nunjucks.Environment(new nunjucks.PrecompiledLoader());

		var context = JSON.parse('${context}');

		module.exports = env.render("${name}", context);

		module.exports = function(data) {
			return env.render("${name}", Object.assign({}, context, data));
		}`;

  return module
}
