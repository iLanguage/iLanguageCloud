  /* globals document */
  'use strict';

  var virtualdocument;
  var iLanguageCloud;

  try {
    virtualdocument = document;
    iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  } catch (e) {
    virtualdocument = require('jsdom').jsdom('<body></body>');
    global.document = global.document || virtualdocument;
    iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  }

   var myFewWordsFactory = function(textToUseSoTestingCloudsAreDifferentButGeneratedTheSame) {
    return textToUseSoTestingCloudsAreDifferentButGeneratedTheSame.split(" ")
      .map(function(word) {
        return {
          text: word,
          importance: 10 + Math.random() * 90
        };
      });
  };

  describe('It should provide a visualization', function() {

    it('should wrap d3', function() {
      expect(iLanguageCloud.d3).toBeDefined();
      expect(iLanguageCloud.d3.layout).toBeDefined();
    });

    it('should add cloud to d3', function() {
      expect(iLanguageCloud.d3.layout.cloud).toBeDefined();
    });

    it('should be render words in an svg', function() {
      var cloud = iLanguageCloud.d3.layout.cloud();
      expect(cloud).toBeDefined();
      cloud.words(myFewWordsFactory("render words in an svg"));
      expect(cloud.words().length).toEqual(5);
      expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
      // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
    });

  });