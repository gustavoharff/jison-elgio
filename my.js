var Generator = require("jison").Parser;

exports.grammar = {
  Comentario: "ECMA-262 5th Edition, 15.12.1 The JSON Grammar.",
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
      ["([1-9][0-9]*)", "return 'Numero'"],
      ["integer", "return 'Inteiro'"],
      ["se", "return 'Se'"],
      ["entao", "return 'Entao'"],
      ["inicio", "return 'Inicio'"],
      ["fim", "return 'Fim'"],
      ["maior", "return 'Maior'"],
      ["menor", "return 'Menor'"],
      ["igual", "return 'Igual'"],
      ["diferente", "return 'Diferente'"],
      ["zero", "return 'Zero'"],
      ["([A-Z][a-z]{2,})", "return 'Identificador'"],
      ["#.*?(?=\r?\n)", "return 'Comentario'"],
      ["[.]", "return 'Ponto'"],
      ["(=)", "return '='"],
      ["([ \t]+)", "return 'Espaco'"],
      ["\\n", "return 'NovaLinha'"],
    ],
  },

  tokens: "Identificador",
  start: "Value",

  bnf: {
    "Value": [
      "DeclaracaoLista",
      "AtribuicaoLista",
      "DeclaracaoLista AtribuicaoLista",
      "DeclaracaoLista AtribuicaoLista Condicao",
    ],

    "Atribuicao": [
      "Identificador Espaco = Espaco Numeros Ponto NovaLinha",
      "Identificador Espaco = Espaco Numeros Ponto Espaco Comentario NovaLinha",
      "Espaco Identificador Espaco = Espaco Numeros Ponto NovaLinha",
      "Espaco Identificador Espaco = Espaco Numeros Ponto Espaco Comentario NovaLinha",
    ],
    "Declaracao": [
      "Tipos Espaco Identificador Ponto NovaLinha",
      "Tipos Espaco Identificador Ponto Espaco Comentario NovaLinha",
      "Espaco Tipos Espaco Identificador Ponto NovaLinha",
      "Espaco Tipos Espaco Identificador Ponto Espaco Comentario NovaLinha",
    ],
    "CondicaoSe": [
      "Se Espaco Identificador Espaco Comparacao Espaco Numeros Ponto NovaLinha",
      "Se Espaco Identificador Espaco Comparacao Espaco Numeros Ponto Espaco Comentario NovaLinha",
    ],
    "CondicaoEntao": [
      "Entao Ponto NovaLinha",
      "Entao Ponto Espaco Comentario NovaLinha",
    ],
    "CondicaoInicio": [
      "Inicio Ponto NovaLinha",
      "Inicio Ponto Espaco Comentario NovaLinha",
    ],
    "CondicaoFim": [
      "Fim Ponto",
      "Fim Ponto Espaco Comentario",
      "Fim Ponto NovaLinha",
      "Fim Ponto Espaco Comentario NovaLinha",
    ],
    "Condicao": [
      "CondicaoSe CondicaoEntao CondicaoInicio Value CondicaoFim",
    ],

    "Tipos": ["Inteiro", "Caracteres"],

    "DeclaracaoLista": ["Declaracao", "DeclaracaoLista Declaracao"],
    "AtribuicaoLista": ["Atribuicao", "AtribuicaoLista Atribuicao"],

    "Comparacao": ["Maior", "Menor", "Igual", "Diferente"],

    "Numeros": ["Numero", "Zero"],
  },
};

var options = { type: "slr", moduleType: "commonjs", moduleName: "jsoncheck" };

exports.main = function main() {
  var code = new Jison.Generator(exports.grammar, options).generate();
  console.log(code);
};

if (require.main === module) exports.main();
