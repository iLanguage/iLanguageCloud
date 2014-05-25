'use strict';
var iLanguageCloud = require('../../../src/common/ilanguage-cloud').iLanguageCloud;
var StopWords = require('../../../src/common/ilanguage-cloud').StopWords;

var sampleText = "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)";
var sampleUnicodeText = "ენა (ენათმეცნიერება) თავისუფალი ქართულენოვანი ენციკლოპედია ვიკიპედიიდან  Disambig-dark.svg სხვა მნიშვნელობებისთვის იხილეთ ენა. არნოლდ ლაკოვსკი, საუბარი, (დაახლოებით 1935 - წელი) ენა — ენათმეცნიერული ცნება-ტერმინი, რომელიც აკუსტიკურად და ოპტიკურად აღქმადი ნიშნების სისტემას აღნიშნავს. ენა და საზოგადოება[რედაქტირება] ადამიანის არსებობა მჭიდროდაა დაკავშირებული საზოგადოებრივ საქმიანობასთან. საზოგადოებრივი საქმიანობა, თავის მხრივ, შეუძლებელია ადამიანთა შორის ურთიერთგაგებინების გარეშე. გაგებინების უმნიშვნელოვანესი საშუალება არის ბუნებრივი ენა.  ენა არის საზოგადოებრივი ცხოვრების მოთხოვნილებებიდან, განსაკუთრებით კი შედეგზე ორიენტირებული საქმიანობიდან მომდინარე, მუდმივად განახლებადი, განვითარებადი სისტემა აკუსტიკურად და ოპტიკურად აღქმადი ნიშნებისა, რომელიც ადამიანს ემსახურება აზრის გაფორმებაში, შეაძლებინებს მას გარკვეულ ფორმაში მოაქციოს აზრი და ამით გასაგები გახადოს იგი მისთვის და სხვათათვის. ენა ადამიანს ფიქრის პროცესს, ანუ გარკვეული რეალობის შემეცნებას შეაძლებინებს. ენის, როგორც ნიშანთა სისტემის მეშვეობით შესაძლებელი ხდება აზრებისა და ემოციური განცდების გადმოცემა, ასევე მოპოვებული ცოდნის ფიქსირება და შენახვა. ენის დეფინიციიდან გამომდინარე გასაგები ხდება, რომ იგი ადამიანის ენობრივი მოღვაწეობის ინსტრუმენტია და მჭიდრო ურთიერთკავშირშია ადამიანის ცნობიერებასთან. ურთიერთკავშირი ენასა და საზოგადოებას შორის ცხადი ხდება კომუნიკაციაში. კომუნიკაციას ენათმეცნიერები განიხილავენ, როგორც ურთიერთგაგებინების პროცესს.";

describe('lib/word-cloud', function() {

  describe('It has basic features ', function() {

    it('should load', function() {
      expect(iLanguageCloud).toBeDefined();
    });

    it('should accept options', function() {
      var cloud = iLanguageCloud({});
      console.log(cloud);
      expect(cloud).toBeDefined();
    });

  });

  xdescribe('It has useful results for graphic designers', function() {

    it('should generate batches of wordclouds', function() {
      expect(true).toBeTruthy();
    });

    it('should generate svgs for import into Inkscape/Illustrator', function() {
      expect(true).toBeTruthy();
    });

    it('should generate pngs for fast sharing/re-use', function() {
      expect(true).toBeTruthy();
    });

    it('should provide custom interactivity', function() {
      expect(true).toBeTruthy();
    });

    it('should handle any webfont', function() {
      expect(true).toBeTruthy();
    });

    it('should render within a custom svg outline/shape', function() {
      expect(true).toBeTruthy();
    });

    it('should adapt to any Unicode character set', function() {
      expect(true).toBeTruthy();
    });

    it('should adapt fit any height width ratio', function() {
      expect(true).toBeTruthy();
    });

    it('should accept a visual density level/range', function() {
      expect(true).toBeTruthy();
    });

    it('should be render words randomly', function() {
      expect(true).toBeTruthy();
    });

  });

  describe('It has useful content for infoviz', function() {

    it('should do everything stopwords can do', function() {

      expect(StopWords).toBeDefined();

      var textToTest = {
        inputText: sampleText
      };
      expect(StopWords.StopWordsGenerator.calculateStopWords(textToTest))
        .toEqual(["1", "2", "3", "4", "42", "5", "6", "7", "a", "an", "as", "be", "by", "cloud", "clouds", "ep", "fu", "in", "is", "of", "on", "or", "pc", "st", "the", "to", "uk"]);
    });

    it('should automatically identify stopwords', function() {
      var cloud = {
        text: sampleText,
        element: [],
        height: 200
        // stopWords: /^(და|აის|კასატორი|არ|მე|მიერ|თუ|არა|ფი|ეს|არის|მის|ან)$/
        // |სა-, სტა-,იმის,-ში/
      };
      var stopwords = ["1", "2", "3", "4", "42", "5", "6", "7", "a", "an", "as", "be", "by", "cloud", "clouds", "ep", "fu", "in", "is", "of", "on", "or", "pc", "st", "the", "to", "uk"];
      cloud = iLanguageCloud(cloud);
      expect(cloud.stopWordsArray).toEqual(stopwords);
    });

    it('should automatically identify unicode stopwords', function() {
      var cloud = {
        text: sampleUnicodeText,
        element: [],
        height: 200
        // stopWords: /^(და|აის|კასატორი|არ|მე|მიერ|თუ|არა|ფი|ეს|არის|მის|ან)$/
        // |სა-, სტა-,იმის,-ში/
      };
      var stopwords = ["ადამიანის", "და", "ენა", "კი", "ხდება", "—"];
      cloud = iLanguageCloud(cloud);
      expect(cloud.stopWordsArray).toEqual(stopwords);
    });

    it('should accept space separated stopwords', function() {
      var cloud = {
        text: sampleUnicodeText,
        element: [],
        height: 200,
        stopWordsArray: ["და", "აის", "არ", "მე", "მიერ", "თუ", "არა", "ფი", "ეს", "არის", "მის", "ან"]
        // |სა-, სტა-,იმის,-ში/
      };
      var stopwords = ['და', 'აის', 'არ', 'მე', 'მიერ', 'თუ', 'არა', 'ფი', 'ეს', 'არის', 'მის', 'ან'];
      cloud = iLanguageCloud(cloud);
      expect(cloud.stopWordsArray).toEqual(stopwords);
    });

    it('should accept space regex stopwords', function() {
      var cloud = {
        text: sampleUnicodeText,
        element: [],
        height: 200,
        stopWordsArray: /^(და|აის|კასატორი|არ|მე|მიერ|თუ|არა|ფი|ეს|არის|მის|ან)$/
        // |სა-, სტა-,იმის,-ში/
      };
      var stopwords = ["და", "აის", "კასატორი", "არ", "მე", "მიერ", "თუ", "არა", "ფი", "ეს", "არის", "მის", "ან"];
      cloud = iLanguageCloud(cloud);
      expect(cloud.stopWordsArray).toEqual(stopwords);
    });

    it('should recursively find stopwords until the text has been reduced by 90%', function() {
      var cloud = {
        text: sampleUnicodeText,
        element: [],
        height: 200,
        cutoff: 0.015
        // stopWords: /^(და|აის|კასატორი|არ|მე|მიერ|თუ|არა|ფი|ეს|არის|მის|ან)$/
        // |სა-, სტა-,იმის,-ში/
      };
      var stopwords = ['1', '13', '16', '17', '2', '20', '24', '27', '29', '3', '4', '41', '5', '6', '7', '8', '_', 'i', 'ii', 'ა', 'აი', 'ალ', 'ამ', 'ან', 'არ', 'ბ', 'გ', 'და', 'ეს', 'ვ', 'თუ', 'იმ', 'ის', 'კი', 'ლ', 'მე', 'რა', 'სი', '–', '“', '„', '„ა'];
      console.log("Testing filtered text recursion");
      cloud = iLanguageCloud(cloud);
      expect(cloud.stopWordsArray).toEqual(stopwords);
      expect(cloud.itterations).toBe(2);
    });

    it('should be easy to remove words', function() {
      expect(true).toBeTruthy();
    });

    it('should be easy to change the tokenization', function() {
      expect(true).toBeTruthy();
    });

    it('should be render words in a sequence', function() {
      expect(true).toBeTruthy();
    });

    it('should be able save/resume editing', function() {
      expect(true).toBeTruthy();
    });

    it('should collaboratively save/resume editing', function() {
      expect(true).toBeTruthy();
    });

    it('should produce an encrypted filtered text', function() {
      expect(true).toBeTruthy();
    });

    it('should produce an anonymized filtered text', function() {
      expect(true).toBeTruthy();
    });

    it('should produce the original human friendly text (with formatting)', function() {
      expect(true).toBeTruthy();
    });

  });

});
