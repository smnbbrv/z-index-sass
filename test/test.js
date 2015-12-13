var path = require('path');
var sassTrue = require('sass-true');

sassTrue.runSass({
  file: path.join(__dirname, 'z-index-test.scss')
}, describe, it);
