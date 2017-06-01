#!/usr/bin/env node
var path = require('path');
var bale = require('./index');
var config = {
    filePath:'./index.js',
    outPutDir: path.join(process.cwd(), '__pack__'),
    progress:true,
    filter :path => path.indexOf('node_modules') === -1,
    pathStart:0,
    webpackConfig:null,//path to a webpack config for aliased modules
    nonExistent:[],//array used for storing the list of partial paths that do not exist
    requireConfig:null,//path to a requirejs config for AMD modules (allows for the result of aliased module paths)
    callback:()=>{}
};
try {
    config = Object.assign({},config,require(path.join(process.cwd(),'bale.config.js')));
    bale(config,config.callback);
}catch(err) {
    console.error(err)
    process.exit();
}

