/*******************************************************************
 *
 *  This module was heavily inspired by nunjucks-loader and nunjucks-html-loader.
 *  (https://github.com/at0g/nunjucks-loader)
 *
 *  Full credit to the original authors.
 *
 *  Robin Neal
 *
 ******************************************************************/

module.exports = function (source) {
  return this.target === 'web' ? (
    require('nunjucks-loader').bind(this)(source)
  ) : (
    require('./src/node-loader').bind(this)(source)
  );
};
