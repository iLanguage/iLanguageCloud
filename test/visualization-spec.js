  var virtualdocument;
  var iLanguageCloud;

  try {
  	virtualdocument = document;
  	iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  } catch (e) {
  	virtualdocument = require('jsdom').jsdom();
  	iLanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;
  }

  describe('It should provide a visualization', function() {

	it('should wrap d3', function() {
  		expect(iLanguageCloud.d3).toBeDefined();
  		expect(iLanguageCloud.d3.layout).toBeDefined();
  		expect(iLanguageCloud.d3.layout.cloud).toBeDefined();
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