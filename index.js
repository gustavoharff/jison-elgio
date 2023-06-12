const Parser = require("jison").Parser;
const fs = require('fs')

const grammar = require('./my').grammar
const parser = new Parser(grammar);

const parserSource = parser.generate();

const text = fs.readFileSync('file.txt', 'utf8')

parser.parse(text);
