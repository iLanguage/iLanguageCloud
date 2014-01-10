# iLanguageCloud

Generate interactive wordclouds for any language, with automatic stop word detection and ability to export as svg or png.

## Getting Started
### On the server
Install the module with: `npm install ilanguage-cloud`

```javascript
var iLanguageCloud = require('ilanguage-cloud');
iLanguageCloud().render(); // returns a wordcloud object with default options
```

### In the browser
Download the [production version][min] or the [development version][max].

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
    stopWords: 'a is by in of the or'
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
 
Copyright (c) 2012-2014 iLanguageCloud Contributors. Licensed under the Apache 2.0 license.
