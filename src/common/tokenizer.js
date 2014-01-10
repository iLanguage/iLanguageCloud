(function(exports) {
  var iLanguage = require('../../bower_components/ilanguage/dist/ilanguage.min');
  var Tokenizer = iLanguage.Corpus.Orthography.Tokenizer;
  
  exports.tokenizeInput = Tokenizer.tokenizeInput;

})(typeof exports === 'undefined' ? this['Tokenizer'] = {} : exports);
