  var virtualdocument;
  var iLanguageCloud;

  try {
    virtualdocument = document;
    iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  } catch (e) {
    var JSDOM = require("jsdom").JSDOM;
    virtualdocument = new JSDOM("<!DOCTYPE html><body></body>").window.document;
    global.document = global.document || virtualdocument;
    iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  }

  describe('It should provide a visualization', function() {

    it('should wrap d3', function() {
      expect(iLanguageCloud.d3).toBeDefined();
      expect(iLanguageCloud.d3.layout).toBeDefined();
    });

    it('should add cloud to d3', function() {
      expect(iLanguageCloud.d3.layout.cloud).toBeDefined();
      expect(iLanguageCloud.cloudviz).toBeDefined();
    });

    it('should be render words in an svg', function() {
      var cloud = new iLanguageCloud({
        orthography: "this is a small cloud",
        caseSensitivity: false
      });
      expect(cloud).toBeDefined();
      cloud.render({
        document: virtualdocument
      });
      expect(cloud.wordFrequencies.length).toEqual(5);
      expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
      // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
    });

  });
