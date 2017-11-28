'use strict';
var ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;

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
          var notText = this.isNot ? ' not' : '';

          this.message = function () {
            return 'Expected ' + actual + notText + ' to be less than ' + expected;
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
describe('tagcloud', function() {
  var longWordCloudText = 'curvy short vocal radical rebellious tasty happy joyful peaceMaker smart crafty creative visionary' +
    'pretty kind believer thoughtful rich voluptuous spontaneous stable loyal dependable dreamy sweet Mean sharp blunt colorful ' +
    'loud reflective inspirational patient intuitive ready eager Experienced Licensed Practical Nurse proficient computerNerd ' +
    'bubbly silly happy sexy hopeful optimistic strong patient caring Strong logical problem-solving drawer foxy fly thinker ' +
    'smartyPants nurse Hardworking energetic flexible adapts emotional rockStar magic worker smiley favored Able maintain ' +
    'critical thinking skills essential providing competent patient queen bossy talented skills diva Personable lazy queen ' +
    'positive dramatic chill effective sexy mother star sister daughter friend teacher lover artist';

  it('should automatically detect if a user is making a tag cloud #66', function() {
    var input = 'benefits health doctor screening preventative care emergency';
    var cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies).toEqual([{
        orthography: 'benefits',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'health',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'doctor',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'screening',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'preventative',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'care',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      },
      {
        orthography: 'emergency',
        count: 1,
        rank: 0.14285714285714285,
        normalizedCount: 1
      }
    ]);

    input = 'chicken swimming SQUIRRELS Tea Ice fishing TheBrowns';
    cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies.length).toEqual(7);

    input = 'hope love peace believe strength courage support';
    cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies.length).toEqual(7);

    var shortSentence = 'Hallo das ist eine Präsentation über Fliegen';
    cloud = new ILanguageCloud({
      orthography: shortSentence
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies.length).toEqual(7);
  });

  it('should automatically detect if a user is making a word cloud #66', function() {
    var input = 'Abraham Lincoln, Missouri Compromise, North, South, Free State, Slave State, Factories, Railroads';
    var cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies.length).toEqual(11);

    input = 'Exciting Reader-Hooking Humourous Adventure Reader-Hooking Mythological Fictional Humourous Adventure Exciting';
    cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([]);
    expect(cloud.wordFrequencies).toEqual([{
        orthography: 'Exciting',
        count: 2,
        rank: 0.3333333333333333,
        normalizedCount: 1,
        categories: ['buzzWord']
      },
      {
        orthography: 'Reader-Hooking',
        count: 2,
        rank: 0.3333333333333333,
        normalizedCount: 1,
        categories: ['buzzWord']
      },
      {
        orthography: 'Humourous',
        count: 2,
        rank: 0.3333333333333333,
        normalizedCount: 1,
        categories: ['buzzWord']
      },
      {
        orthography: 'Adventure',
        count: 2,
        rank: 0.3333333333333333,
        normalizedCount: 1,
        categories: ['buzzWord']
      },
      {
        orthography: 'Mythological',
        count: 1,
        rank: 0.16666666666666666,
        normalizedCount: 0.5
      },
      {
        orthography: 'Fictional',
        count: 1,
        rank: 0.16666666666666666,
        normalizedCount: 0.5
      }
    ]);

    input = 'Athletic Lego\'s Minecraft Ohio State Clam Chowder Chatty Cross Country SkydoesMinecraft iPod';
    cloud = new ILanguageCloud({
      orthography: input
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual(['s']);
    expect(cloud.wordFrequencies.length).toEqual(13);

    expect(longWordCloudText).toBeDefined();
    cloud = new ILanguageCloud({
      orthography: longWordCloudText
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray).toEqual([
      'Able',
      'blunt',
      'bossy',
      'chill',
      'curvy',
      'diva',
      'eager',
      'fly',
      'foxy',
      'happy',
      'kind',
      'lazy',
      'loud',
      'lover',
      'loyal',
      'magic',
      'Mean',
      'Nurse',
      'queen',
      'ready',
      'rich',
      'sexy',
      'sharp',
      'short',
      'silly',
      'smart',
      'star',
      'sweet',
      'tasty',
      'vocal'
    ]);
    expect(cloud.wordFrequencies.length).toEqual(91);
  });

  it('should allow all the words typed to go into the cloud #66', function() {
    var cloud = new ILanguageCloud({
      orthography: longWordCloudText,
      // type: 'TagCloud'
    });
    expect(cloud).toBeDefined();
    cloud = cloud.runWordFrequencyGenerator();
    expect(cloud.nonContentWordsArray.length).toEqual(30);
    expect(cloud.wordFrequencies.length).toEqual(91);
    expect(cloud.wordFrequencies[0]).toEqual({
      orthography: 'patient',
      count: 3,
      rank: 0.03296703296703297,
      normalizedCount: 1,
      categories: [ 'buzzWord' ]
    });
  });

  it('should duplicate to fill space #66', function() {
    expect(true).toBeTruthy();
  });
  it('It should work with Japanese #72', function() {
    expect(true).toBeTruthy();
  });
  it('Should work on Chromebooks #73', function() {
    expect(true).toBeTruthy();
  });
  it('Should be a kid friendly mode #69', function() {
    expect(true).toBeTruthy();
  });
});
