/* globals document */
'use strict';

var d3;
var ILanguageCloud;
var virtualdocument;

if (typeof document !== 'undefined') {
  virtualdocument = document;
  d3 = d3;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
} else {
  d3 = require("d3");
  try {
    var JSDOM = require("jsdom").JSDOM;
    virtualdocument = new JSDOM("<!DOCTYPE html><body><div id='viztest'></div><div id='angles'></div></body>").window.document;
    global.document = global.document || virtualdocument;
  } catch (e) {
    console.warn('You dont have jsdom installed, if you have python on your system, please install it npm install jsdom', e.stack);
  }
  global.d3 = global.d3 || d3;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
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
    expect(ILanguageCloud.d3).toBeDefined();
    expect(ILanguageCloud.d3.layout).toBeDefined();
  });

  it('should add cloud to d3', function() {
    expect(ILanguageCloud.d3.layout.cloud).toBeDefined();
    expect(ILanguageCloud.cloudviz).toBeDefined();
  });

  if (virtualdocument) {
    it('should be render ILanguageCloud in an svg', function() {
      var cloud = new ILanguageCloud({
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

    it('should be render words in an svg', function() {
      var cloud = new ILanguageCloud.d3.layout.cloud();
      expect(cloud).toBeDefined();
      cloud.words(myFewWordsFactory("render words in an svg"));
      expect(cloud.words().length).toEqual(5);
      expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
      // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
    });
  }
});
