/*
 * ilanguagecloud
 * https://github.com/iLanguage/iLanguageCloud
 *
 * Copyright (c) 2013
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {
  /* globals document */
  'use strict';

  /* Using D3's new browser version  */
  var locald3;
  try {
    locald3 = exports.d3 ? exports.d3 : require('d3');
    global.d3 = global.d3 || locald3;
  } catch (exception1) {
    console.log('There was a problem setting d3', locald3);
  }
  try {
    document.createElement("canvas").getContext('2d');
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
  var cloudviz = exports.d3 ? exports.d3 : require('d3.layout.cloud/src/d3.layout.cloud');
  console.log("Loaded d3-cloud", !!cloudviz);

  var Datum = exports.FieldDB ? exports.FieldDB.Datum :
    require('fielddb/api/datum/Datum').Datum;
  var DatumFields = exports.FieldDB ? exports.FieldDB.DatumFields :
    require('fielddb/api/datum/DatumFields').DatumFields;
  // var lexiconFactory = exports.iLanguage ? exports.iLanguage.Lexicon.LexiconFactory :
  //   require('ilanguage/js/lexicon/Lexicon').LexiconFactory;
  var MorphemeSegmenter = exports.iLanguage ? exports.iLanguage.Lexicon.MorphemeSegmenter :
    require('ilanguage/js/lexicon/MorphemeSegmenter').MorphemeSegmenter;
  var LexemeFrequency = exports.iLanguage ? exports.iLanguage.Lexicon.LexemeFrequency :
    require('ilanguage/js/lexicon/LexemeFrequency').LexemeFrequency;
  var NonContentWords = exports.iLanguage ? exports.iLanguage.Lexicon.NonContentWords :
    require('ilanguage/js/lexicon/NonContentWords').NonContentWords;

  var defaults = {
    element: 'cloud',
    orthography: "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated self.wordFrequencies used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)",
    font: 'FreeSans',
    isAndroid: false,
    maxVocabSize: 500,
    clearPreviousSVG: true,
    morphemeSegmentationOptions: {
      algorithm: "MorphoParser",
      maxIterations: 2
    }
    // nonContentWords: NonContentWords.defaults.english
  };

  var iLanguageCloud = function iLanguageCloud(options) {
    options = options || {};
    if (!options.originalText) {
      options.originalText = options.orthography;
    }
    this.saving = false;
    this.runningSegmenter = false;
    this.runningRender = false;
    this.runningStemmer = false;
    this.runningWordFrequencyGenerator = false;
    this.fields = new DatumFields([{
      id: "morphemes"
    }, {
      id: "orthography"
    }]);
    // options = lexiconFactory(options);
    // if (this.application.corpus) {
    //   options = this.application.corpus.newDoc(options);
    // }
    Datum.apply(this, arguments);
  };

  iLanguageCloud.d3 = locald3;

  iLanguageCloud.prototype = Object.create(Datum.prototype, /** @lends iLanguageCloud.prototype */ {
    constructor: {
      value: iLanguageCloud
    },

    runSegmenter: {
      value: function(options) {
        this.debug("Running runSegmenter ", options);
        if (this.runningSegmenter) {
          return this;
        }
        this.runningSegmenter = true;
        // console.log("runSegmenter");
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
        this.debug("Running runWordFrequencyGenerator ", options);
        if (this.runningWordFrequencyGenerator) {
          return this;
        }
        this.runningWordFrequencyGenerator = true;
        // console.log("runWordFrequencyGenerator");
        this.wordFrequencies = null;
        LexemeFrequency.calculateNonContentWords(this); /* TODO decide if this should be calculateNonContentWords */
        this.runningWordFrequencyGenerator = false;
        return this;
      }
    },

    runStemmer: {
      value: function(options) {
        this.debug("Running runStemmer ", options);
        if (this.runningStemmer) {
          return this;
        }
        this.runningStemmer = true;
        // console.log("runStemmer");

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
          // console.log(previousNonContentWords + " -> " + this.nonContentWordsArray);
          if (this.userSpecifiedNonContentWords || (previousNonContentWords && previousNonContentWords.toString() === this.nonContentWordsArray.toString())) {
            again = false;
            continue;
          } else {
            previousNonContentWords = this.nonContentWordsArray;
          }

          /* if the filtered text isn't significantly smaller, stop itterating */
          var percentageReduction = this.filteredText ? this.filteredText.length : 0 / this.orthography.length;
          // console.log("Percentage of original text " + percentageReduction);
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
        this.orthography = this.originalText;
        this.runningStemmer = false;
        return this;
      }
    },

    render: {
      value: function(userOptions) {
        if (this.runningRender || this.runningStemmer || this.runningWordFrequencyGenerator) {
          return this;
        }
        // if (this.archived) {
        //   console.log('Not rendering archived clouds...');
        //   return this;
        // }
        var self = this,
          draw;

        try {
          self.runningRender = true;
          // console.log("render");
          userOptions = userOptions || {};

          var element = userOptions.element || this.element,
            userChosenFontFace = userOptions.font || this.font,
            isAndroid = userOptions.isAndroid || this.isAndroid,
            maxVocabSize = userOptions.maxVocabSize || this.maxVocabSize || defaults.maxVocabSize,
            clearPreviousSVG = userOptions.clearPreviousSVG || this.clearPreviousSVG || defaults.clearPreviousSVG;

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
            console.warn('Appending an element since none was specified', element);
            element = localDocument.createElement('div');
            localDocument.body.appendChild(element);
          }

          if (clearPreviousSVG) {
            element.innerHTML = '';
          }
          if (!this.wordFrequencies || !this.wordFrequencies.length) {
            this.runWordFrequencyGenerator();
          }

          // D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
          var fill = iLanguageCloud.d3.scale.category20(),
            w = userOptions.width || this.width || 800,
            h = userOptions.height || this.height || 400,
            shuffledWords = [],
            max,
            scale = 1,
            mostFrequentCount,
            fontSize;
          // maxLength = 30,

          console.log('d3  cloud loaded: ', !!iLanguageCloud.d3.layout.cloud);
          var layout = iLanguageCloud.d3.layout.cloud()
            .timeInterval(10)
            .size([w, h])
            .fontSize(function(d) {
              // var fontsize = fontSize(d.count) * 10;
              var fontsizeForThisWord = fontSize(+d.count);
              if (d.categories) {
                var categoriesString = d.categories.join(' ');
                if (categoriesString.indexOf('functionalWord') > -1 || categoriesString.indexOf('userRemovedWord') > -1) {
                  // console.log('Hiding ' + d.orthography + ' ' + categoriesString);
                  fontsizeForThisWord = 0;
                }
              } else {
                // return fontSize(+d.count);
              }
              // fontsizeForThisWord = fontSize(fontsizeForThisWord);
              // console.log('fontsizeForThisWord ' + d.count + ' ' + fontsizeForThisWord + ' scaled fontSize ');
              return Math.min(fontsizeForThisWord, 70);
            })
            .text(function(d) {
              return d.orthography;
            })
            .on('end', draw);

          var svg = iLanguageCloud.d3.select(element).append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('version', '1.1')
            .attr('xmlns', 'http://www.w3.org/2000/svg');

          var background = svg.append('g'),
            vis = svg.append('g').attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');
          this.debug(" the background is set to ", background);

          var generate = function() {
            try {
              layout.font(userChosenFontFace).spiral('archimedean');
            } catch (e) {
              // console.log(e); /* TODO handle this in node */
            }
            fontSize = iLanguageCloud.d3.scale.linear().domain([0, mostFrequentCount]).range([10, h * 0.25]);

            // if (self.wordFrequencies.length) {
            //   fontSize.domain([+self.wordFrequencies[self.wordFrequencies.length - 1].count || 1, +self.wordFrequencies[0].count]);
            // }

            shuffledWords = [];
            try {
              layout.stop().words(self.wordFrequencies.slice(0, max = Math.min(self.wordFrequencies.length, +maxVocabSize))).start();
            } catch (e) {
              // console.log(e); /* TODO handle this in node */
              // console.log('Simulating that the word frequencies contain iLanguageCloud.d3 svg node layout info');
              self.wordFrequencies = self.wordFrequencies.map(function(d) {
                return {
                  categories: d.categories || [],
                  alternates: d.alternates || [],
                  count: d.count,
                  hasText: true,
                  height: 0,
                  orthography: d.orthography,
                  padding: 1,
                  rotate: 0,
                  size: 0,
                  style: "normal",
                  text: d.text,
                  weight: "normal",
                  width: 32,
                  x: -242,
                  x0: -16,
                  x1: 16,
                  xoff: 544,
                  y: 15,
                  y0: 0,
                  y1: -1,
                  yoff: 438
                };
              });
            }
            self.runningRender = false;
          };

          var parseWordFrequencies = function(cloud) {
            self.debug("Running parseWordFrequencies ", cloud);
            // self.wordFrequencies = JSON.parse(JSON.stringify(cloud.wordFrequencies)); /* this means we cant update the nodes form a client */
            // self.wordFrequencies = cloud.wordFrequencies; /* TODO or is it the click that is returning a copy, not the node itself... */
            mostFrequentCount = 0;
            if (self.wordFrequencies && self.wordFrequencies[0] && self.wordFrequencies[0].count) {
              mostFrequentCount = self.wordFrequencies[0].count;
            }
            // var cases = {};

            // text.split(wordSeparators).forEach(function(word) {
            //   if (discard.test(word)) {
            //     return;
            //   }
            //   word = word.replace(punctuation, '');

            //   if (nonContentWords.test(word.toLowerCase())) {
            //     return;
            //   }
            //   word = word.substr(0, maxLength);

            //   cases[word.toLowerCase()] = word;
            //   self.wordFrequencies[word = word.toLowerCase()] = (self.wordFrequencies[word] || 0) + 1;
            // });

            // self.wordFrequencies = iLanguageCloud.d3.entries(self.wordFrequencies).sort(function(a, b) {
            //   //if nonfunctional give a really 0 ?
            //   return b.value.count - a.value.count;
            // });

            // self.wordFrequencies.forEach(function(d) {
            //   d.key = d.value.orthography;
            // });

            generate();
          };

          var hashchange = function() {
            parseWordFrequencies(self);
          };

          draw = function(shufledData, bounds) {
            scale = bounds ? Math.min(
              w / Math.abs(bounds[1].x - w / 2),
              w / Math.abs(bounds[0].x - w / 2),
              h / Math.abs(bounds[1].y - h / 2),
              h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
            shuffledWords = shufledData;
            var text = vis.selectAll('text')
              .data(shuffledWords, function(d) {
                return d.orthography;
              });
            text.transition()
              .duration(1000)
              .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
              })
              .style('font-size', function(d) {
                return d.size + 'px';
              });

            // Use transitions for in-browser effect only if we're not
            // on our Android webview.
            if (!isAndroid) {
              text.enter().append('text')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                  return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .style('font-size', function(d) {
                  return d.size + 'px';
                })
                .on('click', function(d) {
                  if (typeof self.onWordClick === 'function') {
                    return self.onWordClick(d);
                  }
                })
                .on('mousedown', function(d) {
                  if (typeof self.onWordMousedown === 'function') {
                    return self.onWordMousedown(d);
                  }
                })
                .on('mouseup', function(d) {
                  if (typeof self.onWordMouseup === 'function') {
                    return self.onWordMouseup(d);
                  }
                })
                .on('mouseover', function(d) {
                  if (typeof self.onWordMouseover === 'function') {
                    return self.onWordMouseover(d);
                  }
                })
                .on('mousemove', function(d) {
                  if (typeof self.onWordMousemove === 'function') {
                    return self.onWordMouseover(d);
                  }
                })
                .on('mouseout', function(d) {
                  if (typeof self.onWordMouseout === 'function') {
                    return self.onWordMouseover(d);
                  }
                })
                .on('focusin', function(d) {
                  if (typeof self.onFocusin === 'function') {
                    return self.onWordFocusin(d);
                  }
                })
                .on('focusout', function(d) {
                  if (typeof self.onFocusout === 'function') {
                    return self.onWordFocusout(d);
                  }
                })
                .style('opacity', 1e-6)
                .transition()
                .duration(500)
                .style('opacity', 1);
            } else {
              text.enter().append('text')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                  return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .on('click', function(d) {
                  if (typeof self.onWordClick === 'function') {
                    self.onWordClick(d);
                  }
                })
                .on('mousedown', function(d) {
                  if (typeof self.onWordMousedown === 'function') {
                    self.onWordMousedown(d);
                  }
                })
                .on('mouseup', function(d) {
                  if (typeof self.onWordMouseup === 'function') {
                    self.onWordMouseup(d);
                  }
                })
                .on('mouseover', function(d) {
                  if (typeof self.onWordMouseover === 'function') {
                    self.onWordMouseover(d);
                  }
                })
                .on('mousemove', function(d) {
                  if (typeof self.onWordMousemove === 'function') {
                    self.onWordMouseover(d);
                  }
                })
                .on('mouseout', function(d) {
                  if (typeof self.onWordMouseout === 'function') {
                    self.onWordMouseover(d);
                  }
                })
                .on('focusin', function(d) {
                  if (typeof self.onFocusin === 'function') {
                    self.onWordFocusin(d);
                  }
                })
                .on('focusout', function(d) {
                  if (typeof self.onFocusout === 'function') {
                    self.onWordFocusout(d);
                  }
                })
                .style('opacity', 1)
                .style('font-size', function(d) {
                  return d.size + 'px';
                });
            }

            text.style('font-family', function(d) {
                return d.font;
              })
              .style('fill', function(d) {
                return fill(d.orthography);
              })
              .text(function(d) {
                return d.orthography;
              });

            // Use transitions for in-browser effect only if we're not
            // on our Android webview.
            if (!isAndroid) {
              vis.transition()
                .duration(1000)
                .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
              // .each('end', function() {
              //   setSVG();
              //   setPNG();
              // });
            } else {
              vis.transition()
                .duration(3000);
              // .each('end', function() {
              //   setSVG();
              //   setPNG();
              // });
            }
          };

          // Converts a given word cloud to image/png.
          // function setPNG() {
          //   var canvas = document.createElement('canvas'),
          //     c = canvas.getContext('2d');
          //   canvas.width = w;
          //   canvas.height = h;
          //   c.translate(w >> 1, h >> 1);
          //   c.scale(scale, scale);
          //   shuffledWords.forEach(function(word, i) {
          //     c.save();
          //     c.translate(word.x, word.y);
          //     c.rotate(word.rotate * Math.PI / 180);
          //     c.textAlign = 'center';
          //     c.fillStyle = fill(word.value.orthography);
          //     c.font = word.size + 'px ' + word.font;
          //     c.fillText(word.value.orthography, 0, 0);
          //     c.restore();
          //   });
          //   var currentPNG = canvas.toDataURL('image/png');
          //   var currentPNGdata = currentPNG.match(/[^,]*$/)[0];
          //   localStorage.setItem('currentPNG', currentPNG);
          //   localStorage.setItem('currentPNGdata', currentPNGdata);
          // }

          // function setSVG() {
          //   var currentSVG = iLanguageCloud.d3.select('svg');
          //   var currentSVGEscaped = btoa(unescape(encodeURIComponent(currentSVG.node().parentNode.innerHTML)));
          //   var currentSVGOut = 'data:image/svg+xml;charset=utf-8;base64,' + currentSVGEscaped;

          //   localStorage.setItem('currentSVG', currentSVGOut);
          //   localStorage.setItem('currentSVGdata', currentSVGEscaped);
          // }

          var r = 40.5,
            px = 35,
            py = 20;

          var angles = iLanguageCloud.d3.select('#angles').append('svg')
            .attr('width', 2 * (r + px))
            .attr('height', r + 1.5 * py)
            .append('g')
            .attr('transform', 'translate(' + [r + px, r + py] + ')');

          angles.append('path')
            .style('fill', 'none')
            .attr('d', ['M', -r, 0, 'A', r, r, 0, 0, 1, r, 0].join(' '));

          angles.append('line')
            .attr('x1', -r - 7)
            .attr('x2', r + 7);

          angles.append('line')
            .attr('y2', -r - 7);

          angles.selectAll('text')
            .data([-90, 0, 90])
            .enter().append('text')
            .attr('dy', function(d, i) {
              return i === 1 ? null : '.3em';
            })
            .attr('text-anchor', function(d, i) {
              return ['end', 'middle', 'start'][i];
            })
            .attr('transform', function(d) {
              d += 90;
              return 'rotate(' + d + ')translate(' + -(r + 10) + ')rotate(' + -d + ')translate(2)';
            })
            .text(function(d) {
              return d + '°';
            });

          var radians = Math.PI / 180,
            from,
            to,
            count,
            arc = iLanguageCloud.d3.svg.arc().innerRadius(0).outerRadius(r);

          scale = iLanguageCloud.d3.scale.linear();

          var cross = function(a, b) {
            return a[0] * b[1] - a[1] * b[0];
          };

          var dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1];
          };

          var update = function() {
            scale.domain([0, count - 1]).range([from, to]);
            // var step = (to - from) / count;

            var path = angles.selectAll('path.angle')
              .data([{
                startAngle: from * radians,
                endAngle: to * radians
              }]);
            path.enter().insert('path', 'circle')
              .attr('class', 'angle')
              .style('fill', '#fc0');
            path.attr('d', arc);

            var line = angles.selectAll('line.angle')
              .data(iLanguageCloud.d3.range(count).map(scale));
            line.enter().append('line')
              .attr('class', 'angle');
            line.exit().remove();
            line.attr('transform', function(d) {
                return 'rotate(' + (90 + d) + ')';
              })
              .attr('x2', function(d, i) {
                return !i || i === count - 1 ? -r - 5 : -r;
              });

            var drag = angles.selectAll('path.drag')
              .data([from, to]);

            drag.enter().append('path')
              .attr('class', 'drag')
              .attr('d', 'M-9.5,0L-3,3.5L-3,-3.5Z')
              .call(iLanguageCloud.d3.behavior.drag()
                .on('drag', function(d, i) {
                  d = (i ? to : from) + 90;
                  var start = [-r * Math.cos(d * radians), -r * Math.sin(d * radians)],
                    m = [iLanguageCloud.d3.event.x, iLanguageCloud.d3.event.y],
                    delta = ~~(Math.atan2(cross(start, m), dot(start, m)) / radians);
                  d = Math.max(-90, Math.min(90, d + delta - 90)); // remove this for 360°
                  delta = to - from;
                  if (i) {
                    to = d;
                    if (delta > 360) {
                      from += delta - 360;
                    } else if (delta < 0) {
                      from = to;
                    }
                  } else {
                    from = d;
                    if (delta > 360) {
                      to += 360 - delta;
                    } else if (delta < 0) {
                      to = from;
                    }
                  }
                  update();
                })
                .on('dragend', generate));

            drag.attr('transform', function(d) {
              return 'rotate(' + (d + 90) + ')translate(-' + r + ')';
            });

            layout.rotate(function() {
              var value = scale(~~(Math.random() * count));
              return value;
            });
          };

          var getAngles = function() {
            count = +2;
            from = Math.max(-90, Math.min(90, +0));
            to = Math.max(-90, Math.min(90, +90));
            update();
          };

          getAngles();

          hashchange();

        } catch (e) {
          console.warn("There was a problem rendering this cloud ", this.orthography, e, e.stack);
        }
        return this;

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
          if (this.hasOwnProperty(aproperty) && typeof this[aproperty] !== "function") {
            underscorelessProperty = aproperty.replace(/^_/, "");
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
          if (this.hasOwnProperty(aproperty) && typeof this[aproperty] !== "function" && aproperty.indexOf('running') === -1) {
            underscorelessProperty = aproperty.replace(/^_/, "");
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

  iLanguageCloud.Doc = Datum;
  exports.iLanguageCloud = iLanguageCloud;
  exports.NonContentWords = NonContentWords;
})(typeof exports === 'undefined' ? this : exports);