/* globals document */
'use strict';

var d3;
var ILanguageCloud;
var virtualdocument;

if (typeof document !== 'undefined') {
  virtualdocument = document;
  d3 = d3;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
} else {
  d3 = require("d3");
  try {
    var JSDOM = require("jsdom").JSDOM;
    virtualdocument = new JSDOM("<!DOCTYPE html><body><div id='viztest'></div><div id='angles'></div></body>").window.document;
    global.document = global.document || virtualdocument;
  } catch (e) {
    console.warn('You dont have jsdom installed, if you have python on your system, please install it npm install jsdom', e.stack);
  }
  global.d3 = global.d3 || d3;
  ILanguageCloud = ILanguageCloud || require('../src/ilanguage-cloud').ILanguageCloud;
}

var myFewWordsFactory = function(textToUseSoTestingCloudsAreDifferentButGeneratedTheSame) {
  return textToUseSoTestingCloudsAreDifferentButGeneratedTheSame.split(" ")
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

  describe('render', () => {
    it('should not render an archived cloud', function() {
      var cloud = new ILanguageCloud({
        orthography: "this is a small cloud",
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
        orthography: "this is a small cloud",
        caseSensitivity: false,
        runningStemmer: true,
      });
      expect(cloud).toBeDefined();
      cloud.render();
      expect(cloud.warnMessage).toContain('Not rendering while processing.');
    });

    it('should not render if its running the frequencies', function() {
      var cloud = new ILanguageCloud({
        orthography: "this is a small cloud",
        caseSensitivity: false,
        runningWordFrequencyGenerator: true,
      });
      expect(cloud).toBeDefined();
      cloud.render();
      expect(cloud.warnMessage).toContain('Not rendering while processing.');
    });

    it('should clear previous svg if clearPreviousSVG', function() {
      var cloud = new ILanguageCloud({
        orthography: "this is a small cloud",
        clearPreviousSVG: true,
        element: { innerHTML: '<mocksvg></mocksvg>', ownerDocument: {} }
      });
      expect(cloud).toBeDefined();
      cloud.render();
      expect(cloud.element.innerHTML).toEqual('');
    });

    if (virtualdocument) {
      it('should accept an id for an element', function() {
        var cloud = new ILanguageCloud({
          orthography: "this is a small cloud",
          element: 'viztest',
          document: virtualdocument
        });
        spyOn(cloud.document, 'getElementById').and.callThrough();
        expect(cloud).toBeDefined();
        cloud.render();
        expect(cloud.document.getElementById).toHaveBeenCalledWith('viztest');
      });

      it('should be render ILanguageCloud in an svg', function() {
        var cloud = new ILanguageCloud({
          orthography: "this is a small cloud",
          caseSensitivity: false,
          debugMode: true
        });
        expect(cloud).toBeDefined();
        // cloud.runWordFrequencyGenerator();
        cloud.render( {
          document: virtualdocument
        });
        expect(cloud.wordFrequencies.length).toEqual(5);
        expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
        // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
      });

      it('should be render words in an svg', function() {
        var cloud = new ILanguageCloud.d3.layout.cloud();
        expect(cloud).toBeDefined();
        cloud.words(myFewWordsFactory("render words in an svg"));
        expect(cloud.words().length).toEqual(5);
        expect(virtualdocument.getElementsByTagName('svg')).toBeDefined();
        // expect(virtualdocument.getElementsByTagName('svg')[0]).toBeDefined();
      });

      describe('Redraw a persisted cloud', function() {
        var myFewWordsFactory,
          myColorFunction,
          myReproduceableDrawFunction,
          WIDTH = 400,
          HEIGHT = 400,
          SEED = 2;

        // Hoist all vars
        var myPreviousCloudFromAPersistantStore,
          myCloudFromPersistantStore,
          previouslyRenderedCloudElement;

        previouslyRenderedCloudElement = virtualdocument.createElement("div");
        previouslyRenderedCloudElement.setAttribute("id", "draw-old-cloud");
        virtualdocument.body.appendChild(previouslyRenderedCloudElement);

        myPreviousCloudFromAPersistantStore = '{"words":[{"text":"previous","importance":65.73438733117655,"font":"Impact","style":"normal","weight":"normal","rotate":0,"size":65,"padding":5,"width":320,"height":130,"xoff":480,"yoff":0,"x1":160,"y1":64,"x0":-160,"y0":-58,"hasText":true,"x":-32,"y":-43,"color":"#ffbb78","transform":"translate(2,-77)rotate(0)"},{"text":"session","importance":20.795548947062343,"font":"Impact","style":"normal","weight":"normal","rotate":90,"size":20,"padding":5,"width":64,"height":89,"xoff":1888,"yoff":0,"x1":32,"y1":43,"x0":-32,"y0":-42,"hasText":true,"x":101,"y":152,"color":"#7f7f7f","transform":"translate(-75,143)rotate(90)"}]}';

        myColorFunction = d3.scale.category20();

        // Declare our own draw function which will be called on the "end" event
        myReproduceableDrawFunction = function(words, element) {
          // if (element && element.children) {
          //   element.innerHTML = "";
          // }
          var svg = d3.select(element).append("svg");
          svg.attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("g")
            .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(word) {
              return word.importance + "px";
            })
            .style("font-family", "Impact")
            .style("fill", function(word, i) {
              if (!word.color) {
                word.color = myColorFunction(i);
              }
              return word.color;
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(word) {
              if (!word.transform) {
                word.transform = "translate(" + [word.x, word.y] + ")rotate(" + word.rotate + ")";
              }
              return word.transform;
            })
            .text(function(word) {
              return word.text;
            });
        };

        // Ask d3-cloud to make an cloud object for us
        myCloudFromPersistantStore = ILanguageCloud.cloudviz()

        // and configure our cloud with d3 chaining
        myCloudFromPersistantStore.size([WIDTH, HEIGHT])
          .words(JSON.parse(myPreviousCloudFromAPersistantStore).words)
          .padding(5)
          .rotate(function(word) {
            if (word.rotate === null || word.rotate === undefined) {
              word.rotate = ~~(Math.random() * 2) * 90;
            }
            return word.rotate;
          })
          .font("Impact")
          .fontSize(function(word) {
            return word.importance;
          })
          .on("end", function(words) {
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
