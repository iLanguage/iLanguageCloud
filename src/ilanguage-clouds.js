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

  var ILanguageClouds = function ILanguageClouds(options) {
    this.debug('In ILanguageClouds ', options);
    Corpus.apply(this, arguments);
  };

  ILanguageClouds.prototype = Object.create(Corpus.prototype, /** @lends ILanguageClouds.prototype */ {
    constructor: {
      value: ILanguageClouds
    }
  });

  exports.ILanguageClouds = ILanguageClouds;

})(typeof exports === 'undefined' ? this : exports);
