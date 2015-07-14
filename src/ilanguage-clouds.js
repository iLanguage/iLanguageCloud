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
  var Corpus = exports.FieldDB ? exports.FieldDB.Corpus :
    require('fielddb/api/corpus/Corpus').Corpus;

  var iLanguageClouds = function iLanguageClouds(options) {
    this.debug("In iLanguageClouds ", options);
    Corpus.apply(this, arguments);
  };

  iLanguageClouds.prototype = Object.create(Corpus.prototype, /** @lends iLanguageClouds.prototype */ {
    constructor: {
      value: iLanguageClouds
    }
  });

  exports.iLanguageClouds = iLanguageClouds;

})(typeof exports === 'undefined' ? this : exports);
