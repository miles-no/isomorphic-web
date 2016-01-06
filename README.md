## Example of an Isomorphic App using ReactJS

(Note: A bug is left intentionally in there...)

### Quick Start

To have the application up an running in no time, follow the next few steps:

1. Install [node.js](http://nodejs.org/)
2. Install all dependencies: `npm install`
3. Start the application: `npm start`
3. Access application on http://localhost:3002

> NOTE: `webpack` is configured with hot-reloading for both `.scss` and `.jsx` files

### Tools
Some of the major tools used are:

* [npm](http://npmjs.io/) as the task runner
* [WebPack](https://webpack.github.io/) for bundling scripts for the browser, and enabling code sharing between client and server
* [SASS](http://sass-lang.com/) for CSS preprosessing

All tools are configured in the `webpack.config.js` and will run transparently when `npm start` is run.

### Production

1. Run `npm run build start-prod`
2. Access the application on http://localhost:3002

> NOTE: if you use your browser's devTools, you can see the load-time difference from the normal dev build.

### Use as a starting point

    mkdir my-app
    cd my-app
    git clone https://github.com/miles-no/isomorphic-web.git .
    rm -rf .git
    git init
    git add -A
    git commit -m 'Initial commit'
    npm install
