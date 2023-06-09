#!/usr/bin/env node、
const chalk = require('chalk');
const path = require('path');
const fs = require('fs')
const shell = require('shelljs')
const download = require('./download')
const inquirer = require('inquirer');
const templateList = require('./templateList')

const checkNodeVersion = () => {
    const nodeV = shell.exec('node -v')
    const firstVersion= Number(nodeV.stdout.split('.')[0].split('v')[1])

    if (firstVersion < 14) {
        console.log(chalk.red('Node version should be above 14, please switch to above 14.'))
        process.exit(0)
    }

    return true
}

const choiceTemplate = (name) => {
    inquirer.prompt(templateList).then( async answer => {
        const { type } = answer;
        download({url: `fengxiaotingzz/${type}-template#master`, dir: `./${name}`, type})
    })
}

const createDir = (name) => {
    shell.exec('npm config set registry https://registry.npmjs.org/')
    console.log(chalk.green('Switched to https://registry.npmjs.org/'))
    if (checkNodeVersion()) {
        fs.mkdirSync(name);
        choiceTemplate(name)
    }
}

module.exports =  function init(name){
    if (name) {
        const curPath = process.cwd();

        fs.readdir(`${curPath}/${name}`, (err, dirName)=>{
            if (err) {
                createDir(name)
            } else {
                console.log(chalk.red('the project name is created'))
            }
        })
    } else {
        console.log(chalk.red('project name is not found, please use: runt init <projectName>'))
    }
}