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
});
