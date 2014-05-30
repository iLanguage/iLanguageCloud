/*
 * ilanguagecloud
 * https://github.com/iLanguage/iLanguageCloud
 *
 * Copyright (c) 2013
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {
  // var d3 = require('d3/d3');
  // console.log("d3.layout", d3.layout);
  var layoutCloud = require('d3.layout.cloud/d3.layout.cloud');
  var Doc = require('ilanguage/document/Document').Document;
  var lexiconFactory = require('ilanguage/ilanguage').iLanguage.Lexicon.LexiconFactory;
  var LexemeFrequency = require('ilanguage/ilanguage').iLanguage.Lexicon.LexemeFrequency;
  var NonContentWords = require('ilanguage/ilanguage').iLanguage.Lexicon.NonContentWords;


  var defaults = {
    element: 'cloud',
    orthography: "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated lexicalEntries used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)",
    font: 'FreeSans',
    isAndroid: false,
    maxVocabSize: 400
    // nonContentWords: NonContentWords.defaults.english
  };

  var iLanguageCloud = function iLanguageCloud(options) {
    options = options || {};
    if (!options.originalText) {
      options.originalText = options.orthography;
    }
    // options = lexiconFactory(options);
    Doc.apply(this, arguments);
  };

  iLanguageCloud.prototype = Object.create(Doc.prototype, /** @lends iLanguageCloud.prototype */ {
    constructor: {
      value: iLanguageCloud
    },

    runSegmenter: {
      value: function(options) {
        if (this.runningSegmenter) {
          return this;
        }
        this.runningSegmenter = true;
        console.log("runSegmenter");
        this.segmentedText = this.orthography;
        this.runningSegmenter = false;
        return this;
      }
    },

    runWordFrequencyGenerator: {
      value: function(options) {
        if (this.runningWordFrequencyGenerator) {
          return this;
        }
        this.runningWordFrequencyGenerator = true;
        console.log("runWordFrequencyGenerator");
        LexemeFrequency.calculateWordFrequencies(this);
        this.runningWordFrequencyGenerator = false;
        return this;
      }
    },

    runStemmer: {
      value: function(options) {
        if (this.runningStemmer) {
          return this;
        }
        this.runningStemmer = true;
        console.log("runStemmer");

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
          console.log(previousNonContentWords + " -> " + this.nonContentWordsArray);
          if (this.userSpecifiedNonContentWords || (previousNonContentWords && previousNonContentWords.toString() === this.nonContentWordsArray.toString())) {
            again = false;
            continue;
          } else {
            previousNonContentWords = this.nonContentWordsArray;
          }

          /* if the filtered text isn't significantly smaller, stop itterating */
          var percentageReduction = this.filteredText.length / this.orthography.length;
          console.log("Percentage of original text " + percentageReduction);
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
        if (this.runningRender) {
          return this;
        }
        var self = this;
        self.runningRender = true;
        console.log("render");
        userOptions = userOptions || this;

        var element = userOptions.element,
          textToTurnIntoACloud = userOptions.filteredText,
          cloudNonContentWords = userOptions.nonContentWordsRegExp,
          userChosenFontFace = userOptions.font,
          isAndroid = userOptions.isAndroid,
          maxVocabSize = userOptions.maxVocabSize || defaults.maxVocabSize;

        //accept a dom element, or an id
        if (element.offsetWidth === undefined) {
          element = document.getElementById(element);
        }

        if (element.length) {
          element = element[0];
        }
        if (!element) {
          console.warn('Appending an element since none was specified');
          element = document.createElement('div');
          document.body.appendChild();
        }

        // D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
        var fill = d3.scale.category20(),
          w = userOptions.width || 800,
          h = userOptions.height || 400,
          words = [],
          max,
          scale = 1,
          lexicalEntries,
          mostFrequentCount,
          fontSize,
          maxLength = 30,
          fetcher = this,
          nonContentWords = cloudNonContentWords,
          punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
          wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
          discard = /^(@|https?:)/;

        var layout = layoutCloud.cloud()
          .timeInterval(10)
          .size([w, h])
          .fontSize(function(d) {
            // var fontsize = fontSize(d.count) * 10;
            var fontsizeForThisWord = d.count * 10;
            if (d.categories && d.categories.indexOf('functionalWord') > -1) {
              fontsizeForThisWord = 0;
            } else {
              // return fontSize(+d.count);
            }
            // fontsizeForThisWord = fontSize(fontsizeForThisWord);
            // console.log('fontsizeForThisWord ' + d.count + ' ' + fontsizeForThisWord + ' scaled fontSize ' + fontSize(+d.count));
            return fontsizeForThisWord;
          })
          .text(function(d) {
            return d.orthography;
          })
          .on('end', draw);

        var svg = d3.select(element).append('svg')
          .attr('width', w)
          .attr('height', h)
          .attr('version', '1.1')
          .attr('xmlns', 'http://www.w3.org/2000/svg');

        var background = svg.append('g'),
          vis = svg.append('g').attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');

        function generate() {
          layout.font(userChosenFontFace).spiral('archimedean');
          fontSize = d3.scale.linear().domain([0, mostFrequentCount]).range([10, h * 0.25]);

          if (lexicalEntries.length) {
            fontSize.domain([+lexicalEntries[lexicalEntries.length - 1].value || 1, +lexicalEntries[0].value]);
          }

          words = [];
          layout.stop().words(lexicalEntries.slice(0, max = Math.min(lexicalEntries.length, +maxVocabSize))).start();
          self.runningRender = false;
        }

        function parseWordFrequencies(cloud) {
          lexicalEntries = JSON.parse(JSON.stringify(cloud.wordFrequencies));
          mostFrequentCount = lexicalEntries[0].count;
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
          //   lexicalEntries[word = word.toLowerCase()] = (lexicalEntries[word] || 0) + 1;
          // });

          // lexicalEntries = d3.entries(lexicalEntries).sort(function(a, b) {
          //   //if nonfunctional give a really 0 ?
          //   return b.value.count - a.value.count;
          // });

          // lexicalEntries.forEach(function(d) {
          //   d.key = d.value.orthography;
          // });

          generate();
        }

        function hashchange() {
          parseWordFrequencies(fetcher);
        }

        function draw(data, bounds) {
          scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
          words = data;
          var text = vis.selectAll('text')
            .data(words, function(d) {
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
        }

        // Converts a given word cloud to image/png.
        // function setPNG() {
        //   var canvas = document.createElement('canvas'),
        //     c = canvas.getContext('2d');
        //   canvas.width = w;
        //   canvas.height = h;
        //   c.translate(w >> 1, h >> 1);
        //   c.scale(scale, scale);
        //   words.forEach(function(word, i) {
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
        //   var currentSVG = d3.select('svg');
        //   var currentSVGEscaped = btoa(unescape(encodeURIComponent(currentSVG.node().parentNode.innerHTML)));
        //   var currentSVGOut = 'data:image/svg+xml;charset=utf-8;base64,' + currentSVGEscaped;

        //   localStorage.setItem('currentSVG', currentSVGOut);
        //   localStorage.setItem('currentSVGdata', currentSVGEscaped);
        // }

        var r = 40.5,
          px = 35,
          py = 20;

        var angles = d3.select('#angles').append('svg')
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
          arc = d3.svg.arc().innerRadius(0).outerRadius(r);

        scale = d3.scale.linear();

        function cross(a, b) {
          return a[0] * b[1] - a[1] * b[0];
        }

        function dot(a, b) {
          return a[0] * b[0] + a[1] * b[1];
        }

        function update() {
          scale.domain([0, count - 1]).range([from, to]);
          var step = (to - from) / count;

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
            .data(d3.range(count).map(scale));
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
            .call(d3.behavior.drag()
              .on('drag', function(d, i) {
                d = (i ? to : from) + 90;
                var start = [-r * Math.cos(d * radians), -r * Math.sin(d * radians)],
                  m = [d3.event.x, d3.event.y],
                  delta = ~~ (Math.atan2(cross(start, m), dot(start, m)) / radians);
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
        }

        function getAngles() {
          count = +2;
          from = Math.max(-90, Math.min(90, +0));
          to = Math.max(-90, Math.min(90, +90));
          update();
        }

        getAngles();

        hashchange();

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
          if (this.hasOwnProperty(aproperty) && typeof this[aproperty] !== "function") {
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

        return json;
      }
    }

  });


  iLanguageCloud.Doc = Doc;
  exports.iLanguageCloud = iLanguageCloud;
  exports.NonContentWords = NonContentWords;
})(typeof exports === 'undefined' ? this['iLanguageCloud'] = {} : exports);
