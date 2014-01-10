(function(exports) {
  var iLanguage = require('iLanguage');
  
  console.log(iLanguage);
  exports.StopWords = iLanguage.Lexicon.StopWords;

})(typeof exports === 'undefined' ? this['StopWords'] = {} : exports);
