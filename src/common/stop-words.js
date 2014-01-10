(function(exports) {
  var iLanguage = require('../../bower_components/ilanguage/dist/ilanguage.min');
  var StopWords = iLanguage.Lexicon.StopWords;

  exports.processStopWords = StopWords.processStopWords;
  exports.defaults = StopWords.defaults;

})(typeof exports === 'undefined' ? this['StopWords'] = {} : exports);
