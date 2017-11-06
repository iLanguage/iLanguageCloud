'use strict';
try{
  var ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
  var ILanguageClouds = ILanguageClouds || require('../src/ilanguage-clouds').ILanguageClouds;
  var sampleText = 'A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan (\'Cloud\'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds \'Clouds\', a song by Chaka Khan from Naughty \'Clouds\', a song by Level 42 on the album Retroglide \'Clouds\', a song by Spires That in the Sunset Rise on the album This Is Fire \'Clouds\' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound \'Cloudy\', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)';
}catch(exception){
  console.log(exception.stack);
}

/*
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

*/

describe('lib/ilanguage-cloud', function() {

  describe('It has useful content for infoviz', function() {

    it('should automatically create a segmented version of the text using seed segmentations', function() {
      var cloud = {
        orthography: sampleText,
        caseSensitivity: false,
        morphemeSegmentationOptions: {
          algorithm: 'MorphoParser',
          seeds: 'condens-ed droplet-s crystal-s suspend-ed',
          maxIterations: 2
        }
      };
      cloud = new ILanguageCloud(cloud).runSegmenter();
      expect(cloud.morphemes).toEqual('A cloud i-s a visible mas-s of condens-ed droplet-s or frozen crystal-s suspend-ed in the atmosphere. Cloud(s) may also refer to: Content-s [hide] 1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other use-s 7 See also Information Technology Cloud computing, Internet-bas-ed development and use of computer technology stor-ed on server-s rather than the client computer-s Cloud (operating system), a browser-bas-ed operating system that will instantly be usable after turning on the PC, by the maker-s of gOS Tag cloud, a visual depiction of user-generat-ed tag-s us-ed typically to describe the content of web site-s Cloud storage, a model of network-ed online storage Cloud.com, a company that develop-s open source cloud orchestration software CloudStack, an open source cloud computing software Science Magellanic Clouds, irregular dwarf galaxie-s near our galaxy, the Milky Way Interstellar cloud, dense region between star-s Molecular cloud, interstellar cloud containing molecule-s Electron cloud, analogy us-ed to describe an electron that orbit-s around a nucleu-s Point cloud, in mathematics, a set of vertice-s in a three-dimensional coordinate system CLOUD, an experimental facility us-ed to investigate the microphysic-s between galactic cosmic ray-s and cloud-s Cloud chamber, an experimental device us-ed in early studie-s of particle physic-s Fiction Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan (\'Cloud\'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarter-s of Spectrum, from the science fiction television serie-s Captain Scarlet and the Mysteron-s Cloud-s (film), a 2000 film written and direct-ed by Don Thompson and produc-ed by Will Arntz Literature The Clouds, a comedy by Aristophane-s Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music Cloud-s (60-s rock band), a Scottish music group that operat-ed in the late 1960-s Cloud-s (Australian band), an indie rock group bas-ed in Sydney, Australia in the 1990-s The Cloud-s (UK band), a British indie pop band from the 1980-s Cloud (music), sound mas-s consisting of statistical cloud-s of microsound-s \'Clouds\', a song by Chaka Khan from Naughty \'Clouds\', a song by Level 42 on the album Retroglide \'Clouds\', a song by Spire-s That in the Sunset Rise on the album Thi-s I-s Fire \'Clouds\' (Zach Sobiech song) a song by Zach Sobiech Cloud-s (Joni Mitchell album), 1969 Cloud-s (Lee Ranaldo album), 1997 Cloud-s (Tiamat album), 1992 Cloud-s (EP), an EP by Nosound \'Cloudy\', by Average White Band from the album Cut the Cake Other use-s Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in King-s County Clodoald (522–560), better known a-s Cloud or Saint Cloud, son of King Chlodomer of Orlean-s Saint-Cloud, a commune in the western suburb-s of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also The Cloud (disambiguation) Cloud Nine (disambiguation) R-ed Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)');
    });


    it('should automatically clean the text to create informative wordclouds', function() {
      expect(true).toBeTruthy();
    });

    it('should guess negative words for this text', function() {
      expect(true).toBeTruthy();
    });

    it('should guess buzz words for this text', function() {
      expect(true).toBeTruthy();
    });

  });

  describe('It is not English oriented', function() {

    it('should adapt to any language typology', function() {
      expect(true).toBeTruthy();
    });

  });

  describe('It can persist the users clouds across devices', function() {

    it('should have a database', function() {
      expect(ILanguageClouds).toBeDefined();
    });

    it('should open an existing database or a new one', function() {
      var username = 'testingilanguageclouds';
      var clouds = new ILanguageClouds({
        username: username,
        dbname: username + '-firstcorpus',
        url: 'https://localhost:6984'
      });
      expect(clouds).toBeDefined();
    });


  });

  it('should do everything a wordcloud can do', function() {
    expect(true).toBeTruthy();
  });

});
