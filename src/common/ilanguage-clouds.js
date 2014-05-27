/*
 * ilanguagecloud
 * https://github.com/iLanguage/iLanguageCloud
 *
 * Copyright (c) 2013
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {
  // var d3 = require('d3/d3');
  // console.log("d3.layout", d3.layout);
  var Database = require('ilanguage/database/Database').Database;


  var iLanguageClouds = function iLanguageClouds(options) {
    // console.log("In iLanguageClouds ", options);
    Database.apply(this, arguments);
  };

  iLanguageClouds.prototype = Object.create(Database.prototype, /** @lends iLanguageClouds.prototype */ {
    constructor: {
      value: iLanguageClouds
    }
  });

  exports.iLanguageClouds = iLanguageClouds;

})(typeof exports === 'undefined' ? this['iLanguageClouds'] = {} : exports);
