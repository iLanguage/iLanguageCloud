(function(exports) {
  var iLanguage = require('../../bower_components/ilanguage/dist/ilanguage.min');
  var StopWordsGenerator = iLanguage.Lexicon.StopWords.StopWordsGenerator;
  exports.calculateStopWords = StopWordsGenerator.calculateStopWords;

})(typeof exports === 'undefined' ? this['StopWordsGenerator'] = {} : exports);
