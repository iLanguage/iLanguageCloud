
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
   input = "chicken swimming SQUIRRELS Tea Ice fishing TheBrowns";
   input = "hope love peace believe strength courage support";
   var shortSentence = "Hallo das ist eine Präsentation über Fliegen";
   expect(input).toBeDefined(); 
   expect(shortSentence).toBeDefined();
   expect(true).toBeTruthy(); 
 });

  it("should automatically detect if a user is making a word cloud #66", function() {
    expect(true).toBeTruthy();
  });
  
  it("should automatically detect if a user is making a iLanguage cloud #66", function() {
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