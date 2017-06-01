/**
 * Created by yeanzhi on 17/6/1.
 */
'use strict';
var dependencyTree = require('dependency-tree');
var copyfiles = require('copyfiles');
var path = require('path');
var chalk = require('chalk');
var _ = require('lodash');
const log = console.log;

const checkConfig = function(config){
    if(!_.isNumber(Number(config.pathStart))){
        log(chalk.red('config.pathStart must be number'))
        process.exit();
    }
    if(!_.isString(config.filePath)||config.filePath.trim()===''){
        log(chalk.red('config.filePath not given'));
        process.exit();
    }
    if(!_.isFunction(config.filter)){
        log(chalk.red('config.filter must be function'));
        process.exit();
    }
    if(!_.isArray(config.nonExistent)){
        log(chalk.red('config.nonExistent must be array'));
        process.exit();
    }
    if(!_.isFunction(config.callback)){
        log(chalk.red('config.callback must be function'));
        process.exit();
    }
}
module.exports = function bale(config,callback) {
    checkConfig(config);
    log(chalk.green('bale: start'));

    let startTime = (new Date()).getTime();
    var outPutDir = config.outPutDir;
    var list = dependencyTree.toList({
        filename: config.filePath,
        directory: path.join(__dirname),
        filter: config.filter,
        nonExistent: config.nonExistent ,
        webpackConfig:config.webpackConfig
    });
    if (config.progress) {
        log(chalk.cyan('dependencies list:'));
        log(chalk.magenta(JSON.stringify(list, null, 4)));
    }
    list.push(outPutDir);
    copyfiles(list, {
        up: Number(config.pathStart)
    }, function () {
        let endTime = (new Date()).getTime();
        log(chalk.green('bale: successfully'))
        log(chalk.yellow('Time: ' + (endTime - startTime)/1000 + 'ms'));
        callback();
    });
};
