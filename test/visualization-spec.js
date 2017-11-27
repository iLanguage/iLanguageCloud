/* globals document, MouseEvent, window, localStorage, alert */
'use strict';

var d3;
var FieldDB;
var ILanguageCloud;
var virtualdocument;

if (typeof document !== 'undefined') {
  virtualdocument = document;
  d3 = d3;
  FieldDB = FieldDB;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
} else {
  d3 = require('d3');
  FieldDB = require('fielddb');
  try {
    var JSDOM = require('jsdom').JSDOM;
    virtualdocument = new JSDOM('<!DOCTYPE html><body><div id="non-empty-svg"><div id="sizeable-cloud"></div><div id="reproducable-cloud"></div> <div id="change-one-word-font-cloud"></div> <div id="change-font-cloud"></div><div id="viztest"></div><div id="angles"></div></body>').window.document;
    global.document = global.document || virtualdocument;
  } catch (e) {
    console.warn('You dont have jsdom installed, if you have python on your system, please install it npm install jsdom', e.stack);
  }
  global.d3 = global.d3 || d3;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
}
var sampleText = 'A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan (\'Cloud\'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds \'Clouds\', a song by Chaka Khan from Naughty \'Clouds\', a song by Level 42 on the album Retroglide \'Clouds\', a song by Spires That in the Sunset Rise on the album This Is Fire \'Clouds\' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound \'Cloudy\', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)';

var myFewWordsFactory = function(textToUseSoTestingCloudsAreDifferentButGeneratedTheSame) {
  return textToUseSoTestingCloudsAreDifferentButGeneratedTheSame.split(' ')
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

  describe('render', function() {
    it('should not render an archived cloud', function() {
      var cloud = new ILanguageCloud({
        orthography: 'this is a small cloud',
        caseSensitivity: false,
        archived: true,
      });
      expect(cloud).toBeDefined();
      cloud.render({
        document: virtualdocument
      });
      expect(cloud.warnMessage).toContain('Not rendering archived clouds');
    });

    it('should not render if its running the stemmer', function() {
      var cloud = new ILanguageCloud({
        orthography: 'this is a small cloud',
        caseSensitivity: false,
        runningStemmer: true,
      });
      expect(cloud).toBeDefined();
      cloud.render();
      expect(cloud.warnMessage).toContain('Not rendering while processing.');
    });

    it('should not render if its running the frequencies', function() {
      var cloud = new ILanguageCloud({
        orthography: 'this is a small cloud',
        caseSensitivity: false,
        runningWordFrequencyGenerator: true,
      });
      expect(cloud).toBeDefined();
      cloud.render();
      expect(cloud.warnMessage).toContain('Not rendering while processing.');
    });

    if (virtualdocument) {
      it('should clear previous svg by defualt', function() {
        var cloud = new ILanguageCloud({
          orthography: 'should clear prevous svg content by default',
          element: 'default-redraw',
          height: 100,
          width: 100
        });
        expect(cloud).toBeDefined();
        cloud.render();
        var textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(7);
        cloud.render();
        textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(7);
      });

      it('should not clear previous svg by defualt', function() {
        var cloud = new ILanguageCloud({
          orthography: 'should clear prevous svg content by default',
          element: 'redraw-and-keep',
          keepPreviousSVG: true
        });
        expect(cloud).toBeDefined();
        cloud.render();
        var textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(7);
        cloud.render();
        textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(14);
      });

      it('should accept an id for an element', function() {
        var cloud = new ILanguageCloud({
          orthography: 'should accept an id for an element',
          element: 'viztest',
          document: virtualdocument
        });
        spyOn(cloud.document, 'getElementById').and.callThrough();
        expect(cloud).toBeDefined();
        cloud.render();
        expect(cloud.document.getElementById).toHaveBeenCalledWith('viztest');
      });

      it('should provide d3-cloud', function() {
        var cloud = new ILanguageCloud.d3.layout.cloud();
        expect(cloud).toBeDefined();
        cloud.words(myFewWordsFactory('should provide d3-cloud'));
        expect(cloud.words().length).toEqual(3);
        expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
        // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
      });

      it('should be trim long wordlists so that they fit but to a max vocab size', function() {
        var cloud = new ILanguageCloud({
          orthography: sampleText,
          // debugMode: true,
        });
        expect(cloud).toBeDefined();
        cloud.render({
          document: virtualdocument,
          element: 'sizeable-cloud',
          height: 800
        });
        var textElements = cloud.element.getElementsByTagName('text');
        // expect(textElements.length).toEqual(cloud.wordFrequencies.length);
        expect(textElements.length).toEqual(274);
        expect(cloud.svg[0][0].attributes.width.value).toEqual('2000');
        expect(cloud.svg[0][0].attributes.height.value).toEqual('800');
      });

      it('should be able to set the font of one word', function() {
        var cloud = new ILanguageCloud({
          orthography: 'should be able to set the font of one word or a render',
          caseSensitivity: false,
          debugMode: false,
          font: 'Verdana'
        });
        expect(cloud).toBeDefined();
        cloud.render({
          document: virtualdocument,
          element: 'change-one-word-font-cloud'
        });
        expect(cloud.wordFrequencies.length).toEqual(13);
        var textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(13);

        var positionOfFirstWord = 0;
        for (var i = 0; i < textElements.length; i++) {
          var text = textElements[i].innerHTML;
          if (text === 'able') {
            positionOfFirstWord = i;
            expect(textElements[i].style['font-family']).toEqual('Verdana');
          }
        }

        cloud.wordFrequencies[2].orthography = 'changed';
        cloud.wordFrequencies[2].font = 'Impact';

        cloud.render();
        expect(textElements[positionOfFirstWord].innerHTML).toEqual('changed');
        expect(textElements[positionOfFirstWord].style['font-family']).toEqual('Impact');
      });

      it('should be able to set the font of a render', function() {
        var i;
        var text;
        var cloud = new ILanguageCloud({
          orthography: 'should be able to set the font of one word or a render',
          caseSensitivity: false,
          debugMode: false,
        });
        expect(cloud).toBeDefined();
        cloud.render({
          document: virtualdocument,
          element: 'change-font-cloud'
        });
        expect(cloud.wordFrequencies.length).toEqual(13);
        var textElements = cloud.element.getElementsByTagName('text');
        expect(textElements.length).toEqual(13);

        var positionOfFirstWord = 0;
        for (i = 0; i < textElements.length; i++) {
          text = textElements[i].innerHTML;
          if (text === 'able') {
            positionOfFirstWord = i;
            expect(textElements[i].style['font-family']).toEqual('Impact');
          }
        }

        cloud.render({
          font: 'Verdana'
        });
        for (i = 0; i < textElements.length; i++) {
          text = textElements[i].innerHTML;
          expect(textElements[i].style['font-family']).toEqual('Verdana');
        }
        expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
        // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
      });

      describe('lexicon', function() {
        it('should accept a lexicon', function(done) {
          FieldDB.Database.prototype.BASE_DB_URL = 'http://localhost:5984';
          var corpus = new FieldDB.Corpus({
            dbname: 'testinglexicon-kartuli',
            corpusUrl: 'http://localhost:5984/testinglexicon-kartuli',
            prefs: {
              maxLexiconSize: 400
            }
          });
          var lexicon = new FieldDB.Lexicon({
            corpus: corpus
          });
          expect(lexicon).toBeDefined();
          expect(lexicon.corpus.dbname).toEqual('testinglexicon-kartuli');
          lexicon.corpus.login({
            name: 'testinglexicon',
            password: 'testtest'
          }).then(function() {
            return lexicon.fetch();
          }).then(function(results) {
            expect(results).toBe(lexicon.collection);
            expect(lexicon.length).toBeGreaterThan(0);
            expect(lexicon.length).toEqual(99);

            lexicon.normalizeCount();

            var cloud = new ILanguageCloud({
              lexicon: lexicon,
              caseSensitivity: true,
              displayField: 'morphemes',
              debugMode: true,
            });

            cloud.render({
              document: virtualdocument,
              element: 'igt'
            });

            var textElements = cloud.element.getElementsByTagName('text');
            expect(textElements.length).toEqual(99);
            done();
          });
        });
      });

      describe('features for graphic designers', function() {
        it('should generate batches of wordclouds', function() {
          expect(true).toBeTruthy();
        });

        it('should provide custom interactivity', function(done) {
          var itemNumber = 0;
          var cloud = new ILanguageCloud({
            orthography: 'should be able to interact with the words',
            onWordClick: function(word) {
              word.orthography = 'orthography is changed';
              word.text = 'changed after click';

              expect(cloud.wordFrequencies[itemNumber].text).toEqual('changed after click');
              cloud.render();

              var textElementAfter = cloud.element.getElementsByTagName('text');
              expect(textElementAfter[itemNumber].innerHTML).toEqual('orthography is changed');
              done();
            }
          });

          cloud.render();

          var textElements = cloud.element.getElementsByTagName('text');
          var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
          });
          textElements[itemNumber].dispatchEvent(evt);
        });

        it('should handle any webfont', function() {
          var cloud = new ILanguageCloud({
            orthography: 'should be able to use any webfont like Atomic Age',
            element: 'angles',
            font: 'Atomic Age'
          });

          cloud.render();

          var textElements = cloud.element.getElementsByTagName('text');
          expect(textElements[0].attributes.style.value).toContain('font-family: "Atomic Age";');
        });

        it('should generate pngs for fast sharing/re-use', function(done) {
          var cloud = new ILanguageCloud({
            title: 'Special Cloud to Save',
            orthography: 'should be able to save',
            element: 'angles'
          });

          cloud.render();
          cloud.downloadPNG().then(function(result) {
            expect(result).toContain('data:image/png;base64,');

            var links = document.getElementsByTagName('a');
            var link = links[links.length - 1];
            expect(link.attributes.href.value).toEqual(result);
            expect(link.attributes.target.value).toEqual('_blank');

            expect(localStorage.getItem('currentPNG')).toEqual(result);
            done();
          });
        });

        it('should render within a custom svg outline/shape #67', function() {
          expect(true).toBeTruthy();
        });

        it('should adapt to any Unicode character set', function() {
          expect(true).toBeTruthy();
        });

        it('should adapt fit any height width ratio', function() {
          expect(true).toBeTruthy();
        });

        it('should be able to override dragging the words around', function() {
          var item;
          var cloud = new ILanguageCloud({
            orthography: 'should be able to override drag and drop words',
            onWordDrag: function(word, i) {
              console.log('Overrode dragging', word, i);
              alert('Overrode dragging ' + word.x);
            }
          });

          cloud.render();

          var textElements = cloud.element.getElementsByTagName('text');
          item = textElements[0];
          expect(item.attributes.selectable.value).toEqual('false');

          var evt = new MouseEvent('drag', {
            view: window,
            bubbles: false,
            cancelable: true
          });
          item.dispatchEvent(evt);
        });

        it('should accept a visual density level/range', function() {
          expect(true).toBeTruthy();
        });

        // Turned off until render of d3 works reliably without canvas installed
        it('should be render words randomly', function() {
          var cloud = new ILanguageCloud({
            orthography: sampleText,
            caseSensitivity: false
          });
          expect(cloud).toBeDefined();
          cloud.render({
            document: virtualdocument
          });
          expect(cloud.wordFrequencies).toBeDefined();
          expect(cloud.wordFrequencies.length).toEqual(274);
          expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
          expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
        });
      });

      describe('Redraw a persisted cloud', function() {
        var myColorFunction,
          myReproduceableDrawFunction,
          WIDTH = 400,
          HEIGHT = 400;

        // Hoist all vars
        var myPreviousCloudFromAPersistantStore,
          myCloudFromPersistantStore,
          previouslyRenderedCloudElement;

        previouslyRenderedCloudElement = virtualdocument.createElement('div');
        previouslyRenderedCloudElement.setAttribute('id', 'draw-old-cloud');
        virtualdocument.body.appendChild(previouslyRenderedCloudElement);

        myPreviousCloudFromAPersistantStore = '{"words":[{"text":"previous","importance":65.73438733117655,"font":"Impact","style":"normal","weight":"normal","rotate":0,"size":65,"padding":5,"width":320,"height":130,"xoff":480,"yoff":0,"x1":160,"y1":64,"x0":-160,"y0":-58,"hasText":true,"x":-32,"y":-43,"color":"#ffbb78","transform":"translate(2,-77)rotate(0)"},{"text":"session","importance":20.795548947062343,"font":"Impact","style":"normal","weight":"normal","rotate":90,"size":20,"padding":5,"width":64,"height":89,"xoff":1888,"yoff":0,"x1":32,"y1":43,"x0":-32,"y0":-42,"hasText":true,"x":101,"y":152,"color":"#7f7f7f","transform":"translate(-75,143)rotate(90)"}]}';

        myColorFunction = d3.scale.category20();

        // Declare our own draw function which will be called on the "end" event
        myReproduceableDrawFunction = function(words, element) {
          // if (element && element.children) {
          //   element.innerHTML = "";
          // }
          var svg = d3.select(element).append('svg');
          svg.attr('width', WIDTH)
            .attr('height', HEIGHT)
            .append('g')
            .attr('transform', 'translate(' + WIDTH / 2 + ',' + HEIGHT / 2 + ')')
            .selectAll('text')
            .data(words)
            .enter().append('text')
            .style('font-size', function(word) {
              return word.importance + 'px';
            })
            .style('font-family', 'Impact')
            .style('fill', function(word, i) {
              if (!word.color) {
                word.color = myColorFunction(i);
              }
              return word.color;
            })
            .attr('text-anchor', 'middle')
            .attr('transform', function(word) {
              if (!word.transform) {
                word.transform = 'translate(' + [word.x, word.y] + ')rotate(' + word.rotate + ')';
              }
              return word.transform;
            })
            .text(function(word) {
              return word.text;
            });
        };

        // Ask d3-cloud to make an cloud object for us
        myCloudFromPersistantStore = ILanguageCloud.cloudviz();

        // and configure our cloud with d3 chaining
        myCloudFromPersistantStore
          .size([WIDTH, HEIGHT])
          .words(JSON.parse(myPreviousCloudFromAPersistantStore).words)
          .padding(5)
          .rotate(function(word) {
            if (word.rotate === null || word.rotate === undefined) {
              word.rotate = ~~(Math.random() * 2) * 90;
            }
            return word.rotate;
          })
          .font('Impact')
          .fontSize(function(word) {
            return word.importance;
          })
          .on('end', function(words) {
            myReproduceableDrawFunction(words, previouslyRenderedCloudElement);
          });

        it('should not change word objects render attributes', function() {
          myCloudFromPersistantStore.start();

          var previousWord = JSON.parse(myPreviousCloudFromAPersistantStore).words[1];
          var reRenderedWord = myCloudFromPersistantStore.words()[1];

          expect(reRenderedWord.text).toEqual(previousWord.text);
          expect(reRenderedWord.value).toEqual(previousWord.value);
          expect(reRenderedWord.rotate).toEqual(previousWord.rotate);
          expect(reRenderedWord.color).toEqual(previousWord.color);
          expect(reRenderedWord.transform).toEqual(previousWord.transform);

          expect(reRenderedWord.size).toEqual(previousWord.size);
          expect(reRenderedWord.padding).toEqual(previousWord.padding);
          expect(reRenderedWord.width).toEqual(previousWord.width);

          // These might be different but the render still looks the same
          // expect(reRenderedWord.height).toEqual(previousWord.height);
          // expect(reRenderedWord.x).toEqual(previousWord.x);
          // expect(reRenderedWord.y).toEqual(previousWord.y);
        });
      });
    }
  });
});
