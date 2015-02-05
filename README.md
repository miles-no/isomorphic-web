## Example of an Isomorphic App using ReactJS

(Note: A bug is left intentionally in there...)

### Quick Start

To have the application up an running in no time, follow the next few steps:

1. Install [node.js](http://nodejs.org/)
2. Install [Gulp](http://gulpjs.com/): `npm install -g gulp`
3. Install all dependencies: `npm install`
4. Create file `.env` in the project root folder. Example `.env` file:

        BASE_URL=

5. Start application by running `gulp`
6. Access application on http://localhost:3000

### Tools
Some of the major tools used are:

* [Gulp](http://gulpjs.com/) as the task runner
* [Browserify](http://browserify.org/) for bundling scripts for the browser, and enabling code sharing between client and server
* [SASS](http://sass-lang.com/) for CSS preprosessing
* [BrowserSync](http://www.browsersync.io/) for serving synchronized browser testing

All tools are configured in the `Gulpfile.js` and will run transparently when `gulp` is started.

### Use as a starting point

    mkdir my-app
    cd my-app
    git clone https://github.com/miles-no/isomorphic-web.git .
    rm -rf .git
    git init
    git add -A
    git commit -m 'Initial commit'
    npm install
