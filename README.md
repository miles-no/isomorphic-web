## Example of an Isomorphic App using ReactJS

### Quickstart

Ensure that you have [node.js](http://nodejs.org/) installed on your machine.
Clone this repository and navigate into the `isomorphic-web` folder (or whatever folder you cloned it into).

We use [Grunt](http://gruntjs.com/) as the task runner, so make sure you have the [grunt-cli](https://www.npmjs.org/package/grunt-cli) installed. If not, install it globally with `npm install -g grunt-cli`

Run `npm install` to install all dependencies used by this application.

### Tools

* [Grunt](http://gruntjs.com/) as the task runner
* [browserify](http://browserify.org/) for bundling scripts for the browser, and enabling code sharing between client and server
* [grunt-react](https://www.npmjs.org/package/grunt-react) for compiling React's JSX templates into JavaScript
* [SASS](http://sass-lang.com/) for CSS preprosessing
* [UglifyJS](https://github.com/mishoo/UglifyJS) for compressing JavaScript for the browser
* [JSXHint](https://www.npmjs.org/package/jsxhint) for linting the JavaScript
* [BrowserSync](http://www.browsersync.io/) for serving synchronized browser testing

All tools are configured in the `Gruntfile.js` and will run transparently when `grunt` is started.
