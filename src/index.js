const Parser = require("jison").Parser;
const fs = require("fs");
const path = require("path");

const grammar = require("./elgol").grammar;
const parser = new Parser(grammar);

const parserSource = parser.generate();

const currentPath = path.resolve(__dirname);

const filePath = path.join(currentPath, "file.txt");

const text = fs.readFileSync(filePath, "utf8");

parser.parse(text);
