'use strict';
var ILanguageCloud = iLanguageCloud || require('../src/ilanguage-cloud').iLanguageCloud;

/**
 <pre>
  ======== A Handy Little Jasmine Reference ========
  https://github.com/pivotal/jasmine/wiki/Matchers

  Spec matchers:
    expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
    expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
    expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
    expect(x).toBeDefined(); passes if x is not undefined
    expect(x).toBeUndefined(); passes if x is undefined
    expect(x).toBeNull(); passes if x is null
    expect(x).toBeTruthy(); passes if x evaluates to true
    expect(x).toBeFalsy(); passes if x evaluates to false
    expect(x).toContain(y); passes if array or string x contains y
    expect(x).toBeLessThan(y); passes if x is less than y
    expect(x).toBeGreaterThan(y); passes if x is greater than y
    expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed

    Every matcher's criteria can be inverted by prepending .not:
    expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent

    Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
    beforeEach(function() {
      this.addMatchers({

        toBeLessThan: function(expected) {
          var actual = this.actual;
          var notText = this.isNot ? " not" : "";

          this.message = function () {
            return "Expected " + actual + notText + " to be less than " + expected;
          }

          return actual < expected;
        }

      });
    });
</pre>

* @requires FieldDB
* @requires Jasmine
*
* @example FieldDB
* @module  FieldDBTest
* @extends  Jasmine.spec
*/
describe("tagcloud", function() {

  it("should automatically detect if a user is making a tag cloud #66", function() {
   var input = "benefits health doctor screening preventative care emergency"; 
   var cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);

   input = "chicken swimming SQUIRRELS Tea Ice fishing TheBrowns";
    cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);

   input = "hope love peace believe strength courage support";
   cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);

   var shortSentence = "Hallo das ist eine Präsentation über Fliegen";
   cloud = new ILanguageCloud({
    orthography: shortSentence 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);
 });

  it("should automatically detect if a user is making a word cloud #66", function() {
   var input = "Abraham Lincoln, Missouri Compromise, North, South, Free State, Slave State, Factories, Railroads";
    var cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);
input = "Exciting Reader-Hooking Humourous Adventure Mythological Fictional Exciting Reader-Hooking Humourous Adventure Mythological Fictional";
     
     cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);

input = "Athletic Lego's Minecraft Ohio State Clam Chowder Chatty Cross Country SkydoesMinecraft iPod";
    cloud = new ILanguageCloud({
    orthography: input 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);

var longWordClouds="curvy short vocal radical rebellious tasty happy joyful peaceMaker smart crafty creative visionary pretty kind believer thoughtful rich voluptuous spontaneous stable loyal dependable dreamy sweet Mean sharp blunt colorful loud reflective inspirational patient intuitive ready eager Experienced Licensed Practical Nurse proficient computerNerd bubbly silly happy sexy hopeful optimistic strong patient caring Strong logical problem-solving drawer foxy fly thinker smartyPants nurse Hardworking energetic flexible adapts emotional rockStar magic worker smiley favored Able maintain critical thinking skills essential providing competent patient queen bossy talented skills diva Personable lazy queen positive dramatic chill effective sexy mother star sister daughter friend teacher lover artist";
    cloud = new ILanguageCloud({
    orthography: longWordClouds 
   });
   expect(cloud).toBeDefined();
   cloud = cloud.runStemmer();
   expect(cloud.nonContentWordsArray).toEqual([]);
expect(input).toBeDefined();
   expect(longWordClouds).toBeDefined();
    expect(true).toBeTruthy();
  });
  
  it("should allow all the words typed to go into the cloud #66", function() {
    expect(true).toBeTruthy();
  });

  it("should duplicate to fill space #66 ", function() {
    expect(true).toBeTruthy();
  });
  it("It should work with Japanese #72 ", function() {
    expect(true).toBeTruthy();
  });
  it("Should work on Chromebooks #73", function() {
    expect(true).toBeTruthy();
  });
  it("Should be able to move the words around #63", function() {
    expect(true).toBeTruthy();
  });
  it("Should be a kid friendly mode #69", function() {
    expect(true).toBeTruthy();
  });


});