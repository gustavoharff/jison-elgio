var Generator = require("jison").Parser;

exports.grammar = {
  comment: "ECMA-262 5th Edition, 15.12.1 The JSON Grammar.",
  author: "Zach Carter",

  lex: {
    macros: {
      digit: "[0-9]",
      esc: "\\\\",
      int: "-?(?:[0-9]|[1-9][0-9]+)",
      exp: "(?:[eE][-+]?[0-9]+)",
      frac: "(?:\\.[0-9]+)",
    },
    rules: [
      ["([1-9][0-9]*)", "return 'NUMBER'"],
      ["integer", "return 'INTEGER'"],
      ["se", "return 'IF'"],
      ["maior", "return 'BIGGER'"],
      ["menor", "return 'LESS'"],
      ["igual", "return 'EQUALS'"],
      ["diferente", "return 'DIFFERENT'"],
      ["zero", "return 'ZERO'"],
      ["([A-Z][a-z]{2,})", "return 'STRING'"],
      ["[.]", "return 'DOT'"],
      ["(=)", "return '='"],
      ["([ \t]+)", "return 'SPACE'"],
      ["\\n", "return 'NEWLINE'"],
    ],
  },

  tokens: "INTEGER STRING DOT = SPACE se BIGGER",
  start: "Value",

  bnf: {
    "Value": ["DeclarationList AssignmentList Condition"],

    "Assignment": ["STRING SPACE = SPACE NUMBER DOT NEWLINE"],
    "Declaration": ["INTEGER SPACE STRING DOT NEWLINE"],
    "Condition": ["IF SPACE STRING SPACE Comparision SPACE Numbers DOT"],

    "DeclarationList": ["Declaration", "DeclarationList Declaration"],
    "AssignmentList": ["Assignment", "AssignmentList Assignment"],

    "Comparision": ["BIGGER", "LESS", "EQUALS", "DIFFERENT"],

    "Numbers": ["NUMBER", "ZERO"],

    // "JSONNullLiteral": [ "NULL" ],

    // "JSONNumber": [ "NUMBER" ],

    // "JSONBooleanLiteral": [ "TRUE", "FALSE" ],

    // "JSONText": [ "JSONValue" ],

    // "JSONValue": [ "JSONNullLiteral",
    //                "JSONBooleanLiteral",
    //                "JSONString",
    //                "JSONNumber",
    //                "JSONObject",
    //                "JSONArray" ],

    // "JSONObject": [ "{ }",
    //                 "{ JSONMemberList }" ],

    // "JSONMember": [ "JSONString : JSONValue" ],

    // "JSONMemberList": [ "JSONMember",
    //                       "JSONMemberList , JSONMember" ],

    // "JSONArray": [ "[ ]",
    //                "[ JSONElementList ]" ],

    // "JSONElementList": [ "JSONValue",
    //                      "JSONElementList , JSONValue" ]
  },
};

var options = { type: "slr", moduleType: "commonjs", moduleName: "jsoncheck" };

exports.main = function main() {
  var code = new Jison.Generator(exports.grammar, options).generate();
  console.log(code);
};

if (require.main === module) exports.main();
