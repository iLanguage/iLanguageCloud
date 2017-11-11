# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via Gulp. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already,** and refer to `.editorconfig` and `.jshintrc` for specific options.


## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed. The code has currently been tested with Node 8.


1. Fork and clone the repo.
1. Run `npm install` to install all build dependencies (including Gulp).
1. Build the minified source `npm run build`
1. Run the browser tests `npm run test:browser`
1. Run the node tests `npm test` (currently there are errors in the JSDOM integration since we switched from Node 4 to Node 8.)

Assuming that you don't see any failures, you're ready to go. Just be sure to run `npm run lint` and run the tests after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Open `test/SpecRunner.html` unit test file(s) in actual browser
1. Add failing tests for the change you want to make.
1. Run the tests
1. Fix stuff
1. Run the tests to see if the tests pass. Repeat steps 2-4 until done.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
