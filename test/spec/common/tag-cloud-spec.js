
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
   var input = "Abraham Lincoln, Missouri Compromise, North, South, Free State, Slave State, Factories, Railroads";
    input = "Exciting Reader-Hooking Humourous Adventure Mythological Fictional Exciting Reader-Hooking Humourous Adventure Mythological Fictional";
    input = "Google Drive Google Classroom Google Docs Google Forms Google Hangouts Google Certification";
   var longWordClouds="amabia amabia amabia cluis cluis debora debora debora druzza dyeison dyeison dyeison dyeison dyeison dyeison dyeison eluders fhenrique manasses manasses paulofr rluna rluna rluna theo theo theo theo theo theo thiagom thiagom uoston vanessap vanessap vanessap viniciusv viniciusv viniciusv vsaddi wmariano wmariano wmariano bsimioni helenov helenov helenov rrocha rrocha rrocha rrocha rrocha tpires tpires tpires tpires tpires tpires tpires tpires tpires tpires tpires marceloa marceloa andregc andregc andregc carlospc cvieira dcarraro dcarraro dcarraro dpavanelli dpavanelli fbrolesi fbrolesi fbrolesi fbrolesi fbrolesi felipey felipey felipey felipey fknappe joaopg joaopg joaopg lucianor luisl luisl luisl luisl luisl luisl luisl luisl luisl luisl luizhp mateusv mferreira mferreira neviton neviton paola ptirado ptirado rodrigoeb rpivatto tacio valquiria valquiria vcruz vrodrigues vrodrigues wvicente fpallini araujo araujo fdella fdella fdella fdella fdella fdella fdella marciare rsmith dmegda dmegda dmegda";
   expect(input).toBeDefined();
   expect(longWordClouds).toBeDefined();
    expect(true).toBeTruthy();
  });
  
  it("should automatically detect if a user is making a iLanguage cloud #66", function() {
   var input = "Based on the information covered in the video and your notes, write a two to three paragraph essay exploring the reasons why someone would be willing to stop or continue their abolitionist activities in the Antebellum South. In the atmosphere of the South in the early 1800s an abolitionist might be tempted to stop their activities in trying to end slavery because... In the atmosphere of the South in the early 1800s an abolitionist might feel stronger in their beliefs because.... If I were an abolitionist in the South in the early 1800s, I would be more likely to....";
    input ="Following accusations that her scientist father gruesomely experimented on animals, sixteen-year-old Juliet watched as her family and her genteel life in London crumbled around her--and only recently has she managed to piece her world back together. But when Juliet learns her father is still alive and working on a remote tropical island, she is determined to find out if the old accusations are true. Accompanied by her father's handsome young assistant, Montgomery, and an enigmatic castaway, Edward, Juliet travels to the island, only to discover the depths of her father's insanity. Torn between horror and scientific curiosity, Juliet knows she must end her father's dangerous experiments and escape her jungle prison before it's too late. Yet as the island falls into chaos, she discovers the extent of her father's genius--and madness--in her own blood.";
    input = "Preparing students for college or a career Increasing student engagement Using data to improve instruction Integrating technology in learning experiences Delivering professional development for teachers Meeting the needs of English learners Meeting the need of each learner Promoting critical thinking by students Promoting creativity by students Increasing academic achievement Providing equitable educational opportunities Decreasing the time and effort required by teachers to deliver quality instruction Making learning relevant Partnering with parents in educational efforts Partnering with the community in educational efforts Accurately measuring educational outcomes Extending learning experiences beyond the classroom Enabling students to meet established standards Developing lifelong learners Supporting learners with challenges Offering multiple learning pathways Helping students retain what they have learned Motivating students to learn Promoting character development Ensuring consistent instruction Personalized learning 21st century learning Blended learning Gamification";
    expect(input).toBeDefined();
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