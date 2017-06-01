# bale-cli

### About
Copy a file and it's dependency tree to a directory and maintain a dependency

### Install

```bash
npm i -g bale-cli
```

### Usage
```bash
bale
```

### config

Add bale.config.js in module root dir

```javascript
//bale.config.js example
var path = require('path');
module.exports = {
    filePath: './index.js',
    outPutDir: path.join(__dirname, '__pack__'),
    progress: true,
    filter: path => path.indexOf('node_modules') === -1,
    pathStart: 8,
    webpackConfig: null,//path to a webpack config for aliased modules
    nonExistent: [],//array used for storing the list of partial paths that do not exist
    requireConfig: null//path to a requirejs config for AMD modules (allows for the result of aliased module paths)
}
```
