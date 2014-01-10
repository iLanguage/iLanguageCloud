(function(exports) {
  var iLanguage = require('../../bower_components/ilanguage/dist/ilanguage.min').iLanguage;
  exports.StopWordsGenerator = iLanguage.Lexicon.StopWords.StopWordsGenerator;

})(typeof exports === 'undefined' ? this['StopWordsGenerator'] = {} : exports);
