var package = require('../');
var ILanguageCloud = require('../src/ilanguage-cloud').ILanguageCloud;
var ILanguageClouds = require('../src/ilanguage-clouds').ILanguageClouds;
var NonContentWords = require('../src/ilanguage-cloud').NonContentWords;

describe('node package', function() {
  it('should load', function() {
    expect(package.ILanguageCloud).toBe(ILanguageCloud);
    expect(package.ILanguageClouds).toBe(ILanguageClouds);
    expect(package.NonContentWords).toBe(NonContentWords);
  });

  describe('readme', function() {
    it('should have a simple example', function() {
      var cloud = new package.ILanguageCloud().render();
      expect(cloud.text).toEqual(undefined);
      expect(cloud.orthography).toEqual('');
    });

    it('should support v3.x', function() {
      var text = 'A cloud is a visible mass ...';
      var cloud = new package.ILanguageCloud({
        text: text
      });
      expect(cloud.orthography).toEqual(text);
      expect(cloud.text).toEqual(cloud.orthography);
    });

    it('should support options', function() {
      var myAnalyzedText = {
        element: 'cloud',
        orthography: 'A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere.',
        morphemes: 'A cloud is a visible mass of condense-ed drop-let-s or frozen crystal-s suspend-ed in the atmosphere.',
        font: 'FreeSans',
        nonContentWords: 'a is by in of the or'
      };
      var cloud = new ILanguageCloud(myAnalyzedText);
      cloud.runWordFrequencyGenerator();
      expect(cloud.wordFrequencies[0]).toEqual({
        orthography: 'A',
        count: 2,
        alternates: {
          A: 1,
          a: 1
        },
        rank: 0.13333333333333333,
        normalizedCount: 1,
        categories: ['functionalWord']
      });
      expect(cloud.nonContentWords).toEqual('a is by in of the or');
      expect(cloud.morphemes).toContain('condense');
    })
  });
});
