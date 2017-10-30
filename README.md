# iLanguageCloud

[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

Generate interactive wordclouds for any language, with automatic stop word detection and ability to export as svg or png.


![lexicon_browser2](https://cloud.githubusercontent.com/assets/196199/6282934/6bc5fb10-b90f-11e4-8e4c-8fb9bbf0799f.png)

![screen shot 2014-05-23 at 02 07 45 pm](https://cloud.githubusercontent.com/assets/196199/3065420/31f27b7c-e262-11e3-9208-f5c58ca7177a.png)


## Getting Started
### On the server
Install the module with: `npm install ilanguage-cloud`

```javascript
var iLanguageCloud = require('ilanguage-cloud');
iLanguageCloud().render(); // returns a wordcloud object with default options
```

### In the browser

Install the module with: `bower install ilanguage-cloud --save`

Or, download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/iLanguage/iLanguageCloud/master/dist/ilanguage-cloud.min.js
[max]: https://raw.github.com/iLanguage/iLanguageCloud/master/dist/ilanguage-cloud.js

In your web page:

```html
<script src="ilanguage-cloud.min.js"></script>
<script>
  iLanguageCloud({text: 'A cloud is a visible mass ...'}).render(); // renders the text as a cloud to a div id="cloud" if exists
</script>
```

In your code, you can attach iLanguageCloud's methods to any object.

```html
<script>
var exports = WordCloud;
</script>
<script src="ilanguage-cloud.min.js"></script>
<script>
WordCloud({text: 'A cloud is a visible mass ...'}).render();
</script>
```


## Documentation

Optionally, you can pass an options object to iLanguageCloud.

```html
<script>
  var myOptions = {
    element: 'cloud',
    text: 'A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere.',
    font: 'FreeSans',
    nonContentWords: 'a is by in of the or'
  };
</script>
<script src="ilanguage-cloud.min.js"></script>
<script>
  iLanguageCloud(myOptions).render();
</script>
```

## Examples

* [Javascript](samples/vanilla) 
* [Angular](samples/angular) 
* [Backbone](samples/backbone) 
* [JQuery-plugin](samples/jquery_plugin) 

* [Android](https://github.com/iLanguage/iLanguageCloudAndroid) 
* [Chrome App](https://github.com/iLanguage/iLanguageCloudChrome) 
* [WordPress](https://github.com/iLanguage/iLanguageCloudWordPress) 


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

[More details...](CONTRIBUTING.md)

## Release History

* v1.0 Feb 9 2012 - Initial word cloud using CSS rotation in vanilla js
* v2.0 Jan 29 2013 - WordPress plugin with SVG generation in vanilla js
* v3.0 Nov 15 2013 - Switched to Jason Davies' [d3-cloud](https://github.com/iLanguage/d3-cloud) to generate SVG 
[Download on Google Play](https://play.google.com/store/apps/details?id=ca.ilanguage.ilanguagecloud)

## License
 
Copyright (c) 2012-2017 iLanguageCloud Contributors. Licensed under the Apache 2.0 license.


[npm-url]: https://npmjs.org/package/ilanguage-cloud
[npm-image]: https://badge.fury.io/js/ilanguage-cloud.svg
[travis-url]: https://travis-ci.org/iLanguage/iLanguageCloud
[travis-image]: https://travis-ci.org/iLanguage/iLanguageCloud.svg?branch=master
[daviddm-url]: https://david-dm.org/iLanguage/iLanguageCloud.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/iLanguage/iLanguageCloud
