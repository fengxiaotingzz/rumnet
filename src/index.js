#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const path = require('path')
const package = require('../package.json')
const args = process.argv.slice(3)

program.command('init').description('init a new project. usage: runt init <projectName>').action(() => {
    require('./init')(args[0])
})

program.version(package.version, '-v --version')
program.parse(process.argv)