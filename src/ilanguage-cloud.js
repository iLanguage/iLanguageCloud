/*
 * ilanguagecloud
 * https://github.com/iLanguage/ILanguageCloud
 *
 * Copyright (c) 2013-2017
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {
  /* globals document, localStorage, btoa, unescape */
  'use strict';

  /* Using D3's new browser version  */
  var locald3;
  var cloudviz;
  try {
    locald3 = exports.d3 || require('d3');
    cloudviz = locald3.layout.cloud || require('d3-cloud');
    global.d3 = global.d3 || locald3;
  } catch (exception1) {
    console.log('There was a problem setting d3', locald3);
  }
  try {
    document.createElement('canvas').getContext('2d');
  } catch (exception2) {
    try {
      var Canvas = exports.Canvas ? exports.Canvas : require('canvas-browserify');
      global.Canvas = global.Canvas || Canvas;
    } catch (exception3) {
      global.Canvas = global.Canvas || function() {
        this.getContext = function() {
          return {};
        };
      };
      console.log('Mocking Canvas. If you have a Mac or Linux computer you should install canvas-browserify, canvas and Cairo. See https://www.npmjs.com/package/canvas#installation for instructions. ');
    }
  }
  console.log('Loaded d3-cloud', !!cloudviz);

  var LanguageDatum = exports.FieldDB ? exports.FieldDB.LanguageDatum :
    require('fielddb/api/datum/LanguageDatum').LanguageDatum;
  var DatumFields = exports.FieldDB ? exports.FieldDB.DatumFields :
    require('fielddb/api/datum/DatumFields').DatumFields;
  // var lexiconFactory = exports.ILanguage ? exports.ILanguage.Lexicon.LexiconFactory :
  //   require('ilanguage/js/lexicon/Lexicon').LexiconFactory;
  var MorphemeSegmenter = exports.ILanguage ? exports.ILanguage.Lexicon.MorphemeSegmenter :
    require('ilanguage/js/lexicon/MorphemeSegmenter').MorphemeSegmenter;
  var LexemeFrequency = exports.ILanguage ? exports.ILanguage.Lexicon.LexemeFrequency :
    require('ilanguage/js/lexicon/LexemeFrequency').LexemeFrequency;
  var NonContentWords = exports.ILanguage ? exports.ILanguage.Lexicon.NonContentWords :
    require('ilanguage/js/lexicon/NonContentWords').NonContentWords;

  var defaults = {
    element: 'cloud',
    orthography: 'A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated self.wordFrequencies used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan (\'Cloud\'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds \'Clouds\', a song by Chaka Khan from Naughty \'Clouds\', a song by Level 42 on the album Retroglide \'Clouds\', a song by Spires That in the Sunset Rise on the album This Is Fire \'Clouds\' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound \'Cloudy\', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)',
    font: 'FreeSans',
    isAndroid: false,
    maxVocabSize: 500,
    keepPreviousSVG: false,
    morphemeSegmentationOptions: {
      algorithm: 'MorphoParser',
      maxIterations: 2
    }
    // nonContentWords: NonContentWords.defaults.english
  };

  var ILanguageCloud = function ILanguageCloud(options) {
    options = options || {};
    if (!options.orthography && options.text) {
      console.warn('text is deprecated, use orthography instead');
      options.orthography = options.text;
    }
    if (!options.originalText) {
      options.originalText = options.orthography;
    }
    this.saving = false;
    this.runningSegmenter = false;
    this.runningRender = false;
    this.runningStemmer = false;
    this.runningWordFrequencyGenerator = false;
    this.fields = new DatumFields([{
      id: 'morphemes'
    }, {
      id: 'orthography'
    }]);
    // options = lexiconFactory(options);
    // if (this.application.corpus) {
    //   options = this.application.corpus.newDoc(options);
    // }
    LanguageDatum.apply(this, arguments);
  };

  ILanguageCloud.d3 = locald3;
  ILanguageCloud.d3.layout.cloud = ILanguageCloud.d3.layout.cloud || cloudviz;
  ILanguageCloud.cloudviz = cloudviz;
  ILanguageCloud.version = '4.0.0-rc1';
  ILanguageCloud.prototype = Object.create(LanguageDatum.prototype, /** @lends ILanguageCloud.prototype */ {
    constructor: {
      value: ILanguageCloud
    },

    runSegmenter: {
      value: function(options) {
        this.debug('Running runSegmenter ', options);
        if (this.runningSegmenter) {
          return this;
        }
        this.runningSegmenter = true;
        // console.log('runSegmenter');
        this.morphemes = this.morphemes || this.orthography;
        for (var rule in this.userDefinedMorphemeSegmentationReWriteRules) {
          if (!this.userDefinedMorphemeSegmentationReWriteRules.hasOwnProperty(rule)) {
            continue;
          }
          this.morphemes = this.morphemes.replace(
            new RegExp(this.userDefinedMorphemeSegmentationReWriteRules[rule].source, 'g'),
            this.userDefinedMorphemeSegmentationReWriteRules[rule].target);
        }
        NonContentWords.filterText(this);
        MorphemeSegmenter.runSegmenter(this);
        this.runningSegmenter = false;
        return this;
      }
    },

    runWordFrequencyGenerator: {
      value: function(options) {
        this.debug('Running runWordFrequencyGenerator ', options);
        if (this.runningWordFrequencyGenerator) {
          return this;
        }
        this.runningWordFrequencyGenerator = true;
        // console.log('runWordFrequencyGenerator');
        this.wordFrequencies = null;
        LexemeFrequency.calculateNonContentWords(this);
        this.runningWordFrequencyGenerator = false;
        return this;
      }
    },

    runStemmer: {
      value: function(options) {
        this.debug('Running runStemmer ', options);
        if (this.runningStemmer) {
          return this;
        }
        this.runningStemmer = true;
        // console.log('runStemmer');

        var again = true;
        var previousNonContentWords = this.nonContentWordsArray;
        this.itterations = 0;
        while (again) {
          NonContentWords.processNonContentWords(this);
          NonContentWords.filterText(this);
          this.itterations++;
          /* don't bother iterating on small texts */
          if (this.orthography.length < 100) {
            again = false;
          }

          /* if the stop words aren't changing stop itterating */
          // console.log(previousNonContentWords + ' -> ' + this.nonContentWordsArray);
          if (this.userSpecifiedNonContentWords || (previousNonContentWords && previousNonContentWords.toString() === this.nonContentWordsArray.toString())) {
            again = false;
            continue;
          } else {
            previousNonContentWords = this.nonContentWordsArray;
          }

          /* if the filtered text isn't significantly smaller, stop itterating */
          var percentageReduction = this.filteredText ? this.filteredText.length : 0 / this.orthography.length;
          // console.log('Percentage of original text ' + percentageReduction);
          if (percentageReduction < 0.98) {
            if (this.filteredText && this.filteredText.length > 100) {
              // console.log('Iterating on filteredText' + this.filteredText);
              // this.orthography = this.filteredText;
            }
            // this.nonContentWordsArray = null;
          } else {
            again = false;
          }

          /* let the stop words be regenerated */
          // if (again) {
          //   this.nonContentWordsArray = null;
          // }
        }
        // this.orthography = this.originalText;
        this.runningStemmer = false;
        return this;
      }
    },

    render: {
      value: function(userOptions) {
        var self = this;
        if (this.runningRender || this.runningStemmer || this.runningWordFrequencyGenerator) {
          this.warn('Not rendering while processing.');
          return this;
        }
        if (this.archived) {
          this.warn('Not rendering archived clouds.');
          return this;
        }
        self.runningRender = true;
        userOptions = userOptions || {};
        try {
          var element = userOptions.element || this.element;
          var userChosenRandomSeed = userOptions.randomSeed || this.randomSeed || Math.random() * 10;
          var userChosenFontFace = userOptions.font;
          // var isAndroid = userOptions.isAndroid || this.isAndroid;
          var maxVocabSize = userOptions.maxVocabSize || this.maxVocabSize || defaults.maxVocabSize;
          var keepPreviousSVG = userOptions.keepPreviousSVG || this.keepPreviousSVG || defaults.keepPreviousSVG;
          var width = userOptions.width || this.width;
          var height = userOptions.height || this.height;
          var fill = userOptions.fill || ILanguageCloud.d3.scale.category20();

          var localDocument;
          if (userOptions.document) {
            localDocument = userOptions.document;
          } else {
            localDocument = document;
          }
          //accept a dom element, or an id
          if (element && element.ownerDocument === undefined) {
            element = localDocument.getElementById(element);
          }

          if (element && element.length) {
            element = element[0];
          }
          if (!element) {
            self.warn('Appending an element since none was specified', element);
            element = localDocument.createElement('div');
            localDocument.body.appendChild(element);
          }

          if (element) {
            this.element = element;
          }
          width = width || element.clientWidth || 800;
          height = height || element.clientHeight || 400;

          var fontSize = userOptions.fontSize || ILanguageCloud.d3.scale.linear().range([10, height * 0.25]);

          if (!this.wordFrequencies || !this.wordFrequencies.length) {
            this.warn('Must generate wordFrequencies before rendering.');
            this.runWordFrequencyGenerator();
            this.wordFrequencies = this.wordFrequencies.sort(function(a, b) {
              // rare words should have first dibs on placing
              // return a.normalizedCount - b.normalizedCount;
              // frequent words should have dibs on placing
              return b.normalizedCount - a.normalizedCount;
            });
          }

          this.wordFrequencies = this.wordFrequencies.map(function(word) {
            word.text = word.orthography;
            word.size = ILanguageCloud.fontSizeFromRank(word, height * 0.25, 10);
            return word;
          });
          maxVocabSize = Math.min(width / 5, self.wordFrequencies.length, maxVocabSize);
          this.debug('TODO use randomSeed to regenerate cloud', userChosenRandomSeed);

          // Ask d3-cloud to make an cloud object for us
          // and configure our cloud with d3 chaining
          if (!this.layout) {
            this.layout = ILanguageCloud.cloudviz();
            this.layout
              .size([width, height])
              .words(self.wordFrequencies.slice(0, maxVocabSize))
              .padding(2)
              .rotate(function(word) {
                if (word.rotate === null || word.rotate === undefined) {
                  word.rotate = ~~(Math.random() * 2) * 90;
                }
                return word.rotate;
              })
              .font(self.font || 'Impact')
              .spiral('archimedean')
              .fontSize(function(word) {
                return word.size;
              })
              .on('end', function() {
                ILanguageCloud.reproduceableDrawFunction({
                  element: self.element,
                  userChosenFontFace: userChosenFontFace,
                  keepPreviousSVG: keepPreviousSVG,
                  localDocument: localDocument,
                  maxVocabSize: maxVocabSize,
                  width: width,
                  height: height,
                  fill: fill,
                  fontSize: fontSize,
                  context: self
                });
              });
            this.layout.start();
          } else if (self.orthography !== self.originalText) {
            self.layout.words(self.wordFrequencies);
            self.layout.start();
          } else {
            ILanguageCloud.reproduceableDrawFunction({
              element: self.element,
              userChosenFontFace: userChosenFontFace,
              keepPreviousSVG: keepPreviousSVG,
              localDocument: localDocument,
              maxVocabSize: maxVocabSize,
              width: width,
              height: height,
              fill: fill,
              fontSize: fontSize,
              context: self
            });
          }
        } catch (e) {
          console.warn('There was a problem rendering self cloud ', self.orthography, e, e.stack);
        }
        return this;
      }
    },

    // Converts a given word cloud to image/png.
    setPNG: {
      value: function() {
        // var scale = bounds ? Math.min(
        //   this.width / Math.abs(bounds[1].x - this.width / 2),
        //   this.width / Math.abs(bounds[0].x - this.width / 2),
        //   this.height / Math.abs(bounds[1].y - this.height / 2),
        //   this.height / Math.abs(bounds[0].y - this.height / 2)) / 2 : 1;

        var canvas = document.createElement('canvas'),
          c = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        c.translate(this.width >> 1, this.height >> 1);
        // c.scale(scale, scale);
        this.wordFrequencies.forEach(function(word) {
          c.save();
          c.translate(word.x, word.y);
          c.rotate(word.rotate * Math.PI / 180);
          c.textAlign = 'center';
          c.fillStyle = word.color;
          c.font = word.count + 'px ' + word.font;
          c.fillText(word.orthography, 0, 0);
          c.restore();
        });
        var currentPNG = canvas.toDataURL('image/png');
        var currentPNGdata = currentPNG.match(/[^,]*$/)[0];
        localStorage.setItem('currentPNG', currentPNG);
        localStorage.setItem('currentPNGdata', currentPNGdata);
      }
    },

    setSVG: {
      value: function() {
        var currentSVG = this.svg;
        var currentSVGEscaped = btoa(unescape(encodeURIComponent(currentSVG.node().parentNode.innerHTML)));
        var currentSVGOut = 'data:image/svg+xml;charset=utf-8;base64,' + currentSVGEscaped;

        localStorage.setItem('currentSVG', currentSVGOut);
        localStorage.setItem('currentSVGdata', currentSVGEscaped);
      }
    },
    toJSONLimited: {
      value: function() {
        // return {
        //   title: this.title,
        //   orthography: this.orthography,
        //   wordFrequencies: this.wordFrequencies,
        //   archived: this.archived,
        //   height: this.height,
        //   pouchname: this.dbname,
        //   nonContentWordsArray: this.nonContentWordsArray,
        //   prefixesArray: this.prefixesArray,
        //   suffixesArray: this.suffixesArray,
        //   punctuationArray: this.punctuationArray,
        //   collection: this.collection,
        //   lexicalExperience: this.lexicalExperience,
        //   url: this.url,
        //   _id: this.id,
        //   _rev: this.rev
        // };
        var json = {},
          aproperty,
          underscorelessProperty;
        for (aproperty in this) {
          if (this.hasOwnProperty(aproperty) && typeof this[aproperty] !== 'function') {
            underscorelessProperty = aproperty.replace(/^_/, '');
            json[underscorelessProperty] = this[aproperty];
          }
        }
        for (aproperty in this.defaults) {
          if (!json[aproperty]) {
            json[aproperty] = this.defaults[aproperty];
          }
        }
        // delete json.
        return json;
      }
    },

    toJSON: {
      value: function() {
        var json = {},
          aproperty,
          underscorelessProperty;
        for (aproperty in this) {
          if (this.hasOwnProperty(aproperty) && typeof this[aproperty] !== 'function' && aproperty.indexOf('running') === -1) {
            underscorelessProperty = aproperty.replace(/^_/, '');
            if (underscorelessProperty === 'id' || underscorelessProperty === 'rev') {
              underscorelessProperty = '_' + underscorelessProperty;
            }
            json[underscorelessProperty] = this[aproperty];
          }
        }
        for (aproperty in this.defaults) {
          if (!json[aproperty]) {
            json[aproperty] = this.defaults[aproperty];
          }
        }

        if (!json._id) {
          delete json._id;
        }
        if (!json._rev) {
          delete json._rev;
        }
        delete json.references;
        delete json.root;
        delete json.layout;
        delete json.precedenceRelations;
        delete json.element;
        delete json.saving;

        if (json.wordFrequencies) {
          json.wordFrequencies = json.wordFrequencies.map(function(word) {
            return {
              categories: word.categories || [],
              alternates: word.alternates || [],
              orthography: word.orthography,
              count: word.count
            };
          });
        }
        return json;
      }
    }
  });

  ILanguageCloud.fontSizeFromRank = function(word, max, min) {
    var range = max - min;
    if (word.categories) {
      var categoriesString = word.categories.join(' ');
      if (categoriesString.indexOf('functionalWord') > -1 || categoriesString.indexOf('userRemovedWord') > -1) {
        return 0;
      }
    }
    return min + range * word.normalizedCount;
  };

  // Declare our own draw function which will be called on the 'end' event
  ILanguageCloud.reproduceableDrawFunction = function(options) {
    var element = options.element;
    var keepPreviousSVG = options.keepPreviousSVG;
    var width = options.width;
    var height = options.height;
    var userChosenFontFace = options.userChosenFontFace;
    var fill = options.fill;
    var maxVocabSize = options.maxVocabSize;
    var context = options.context;
    var svg = context.svg || ILanguageCloud.d3.select(element).append('svg');

    if (!keepPreviousSVG && element && element.children) {
      svg.selectAll('*').remove();
    }

    svg.attr('width', width)
      .attr('width', width)
      .attr('height', height)
      .attr('version', '1.1')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('text')
      .data(context.wordFrequencies.slice(0, maxVocabSize))
      // .transition()
      // .duration(1000)
      .enter().append('text')
      .style('font-size', function(word) {
        if (!word.size) {
          word.size = ILanguageCloud.fontSizeFromRank(word, height * 0.25, 10);
        }
        return word.size;
      })
      .style('font-family', function(word) {
        return userChosenFontFace || word.font;
      })
      .style('fill', function(word, i) {
        if (!word.color) {
          word.color = fill(i);
        }
        return word.color;
      })
      .attr('text-anchor', 'middle')
      .attr('transform', function(word) {
        if (!word || !word.x && !word.y) {
          return;
        }
        if (!word.transform) {
          if (word.rotate === null || word.rotate === undefined) {
            word.rotate = ~~(Math.random() * 2) * 90;
          }
          word.transform = 'translate(' + [word.x, word.y] + ')rotate(' + word.rotate + ')';
        }
        return word.transform;
      })
      .text(function(word) {
        return word.orthography;
      })
      .on('click', function(word) {
        if (typeof context.onWordClick === 'function') {
          return context.onWordClick(word);
        }
      })
      .on('mousedown', function(word) {
        if (typeof context.onWordMousedown === 'function') {
          return context.onWordMousedown(word);
        }
      })
      .on('mouseup', function(word) {
        if (typeof context.onWordMouseup === 'function') {
          return context.onWordMouseup(word);
        }
      })
      .on('mouseover', function(word) {
        if (typeof context.onWordMouseover === 'function') {
          return context.onWordMouseover(word);
        }
      })
      .on('mousemove', function(word) {
        if (typeof context.onWordMousemove === 'function') {
          return context.onWordMouseover(word);
        }
      })
      .on('mouseout', function(word) {
        if (typeof context.onWordMouseout === 'function') {
          return context.onWordMouseover(word);
        }
      })
      .on('focusin', function(word) {
        if (typeof context.onFocusin === 'function') {
          return context.onWordFocusin(word);
        }
      })
      .on('focusout', function(word) {
        if (typeof context.onFocusout === 'function') {
          return context.onWordFocusout(word);
        }
      });

    context.svg = svg;
    context.runningRender = false;
  };

  ILanguageCloud.Doc = LanguageDatum;
  exports.ILanguageCloud = ILanguageCloud;
  exports.NonContentWords = NonContentWords;
})(typeof exports === 'undefined' ? this : exports);
