/*******************************************************************
 *
 *  This module was heavily inspired by nunjucks-loader and nunjucks-html-loader.
 *  (https://github.com/at0g/nunjucks-loader)
 *
 *  Full credit to the original authors.
 *
 ******************************************************************/

module.exports = function (source) {
  return this.target === 'web' (
    require('nunjucks-loader')(source);
  ) : (
    require('./src/node-loader')(source);
  );
};
