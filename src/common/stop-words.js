(function(exports) {
  var iLanguage = require('../../bower_components/ilanguage/dist/ilanguage.min').iLanguage;
  
  console.log(iLanguage);
  exports.StopWords = iLanguage.Lexicon.StopWords;

})(typeof exports === 'undefined' ? this['StopWords'] = {} : exports);
