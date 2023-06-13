var Generator = require("jison").Parser;

exports.grammar = {
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
      ["(_[A-Z][a-z]{2,})", "return 'IdentificadorFuncao'"],
      ["inteiro", "return 'Inteiro'"],
      ["se", "return 'Se'"],
      ["entao", "return 'Entao'"],
      ["inicio", "return 'Inicio'"],
      ["fim", "return 'Fim'"],
      ["maior", "return 'Maior'"],
      ["menor", "return 'Menor'"],
      ["igual", "return 'Igual'"],
      ["elgio", "return 'Elgio'"],
      ["diferente", "return 'Diferente'"],
      ["zero", "return 'Zero'"],
      ["[(]", "return '('"],
      ["[)]", "return ')'"],
      ["[,]", "return 'Virgula'"],
      ["[+]", "return 'Mais'"],
      ["[-]", "return 'Menos'"],
      ["[x]", "return 'Multiplicacao'"],
      ["[/]", "return 'Divisao'"],
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
      "DeclaracaoLista AtribuicaoLista Funcao",
      "DeclaracaoLista AtribuicaoLista Condicao Funcao",
      "DeclaracaoLista AtribuicaoLista Funcao Condicao",
      "DeclaracaoLista AtribuicaoLista Condicao Funcao Condicao",
      "DeclaracaoLista AtribuicaoLista Funcao Condicao Funcao",
      "Condicao",
      "Funcao",
      "Condicao Funcao",
      "Funcao Condicao",
      "Condicao Funcao Condicao",
      "Funcao Condicao Funcao",
    ],

    "AtribuicaoValores": [
      "Operandos",
      "Operacao",
      "Identificador"
    ],

    "AtribuicaoOpcao": [
      "Identificador",
      "Elgio"
    ],

    "Atribuicao": [
      "AtribuicaoOpcao Espaco = Espaco AtribuicaoValores Ponto NovaLinha",
      "AtribuicaoOpcao Espaco = Espaco AtribuicaoValores Ponto Espaco Comentario NovaLinha",
      "Espaco AtribuicaoOpcao Espaco = Espaco AtribuicaoValores Ponto NovaLinha",
      "Espaco AtribuicaoOpcao Espaco = Espaco AtribuicaoValores Ponto Espaco Comentario NovaLinha",
      "AtribuicaoOpcao Espaco = Espaco Operacao Ponto NovaLinha",
      "AtribuicaoOpcao Espaco = Espaco Operacao Ponto Espaco Comentario NovaLinha",
      "Espaco AtribuicaoOpcao Espaco = Espaco Operacao Ponto Espaco Comentario NovaLinha",
    ],
    "Declaracao": [
      "Tipos Espaco Identificador Ponto NovaLinha",
      "Tipos Espaco Identificador Ponto Espaco Comentario NovaLinha",
      "Espaco Tipos Espaco Identificador Ponto NovaLinha",
      "Espaco Tipos Espaco Identificador Ponto Espaco Comentario NovaLinha",
    ],
    "CondicaoSe": [
      "Se Espaco Identificador Espaco OperadorLogico Espaco Numeros Ponto NovaLinha",
      "Se Espaco Identificador Espaco OperadorLogico Espaco Numeros Ponto Espaco Comentario NovaLinha",
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
    "FuncaoParametro": [
      "Tipos Espaco Identificador",
      "Tipos Espaco Identificador Virgula Espaco FuncaoParametro"
    ],
    "FuncaoDeclaracao": [
      "Tipos Espaco IdentificadorFuncao Espaco ( FuncaoParametro ) Ponto NovaLinha",
      "Tipos Espaco IdentificadorFuncao Espaco ( ) Ponto NovaLinha",
    ],

    "Funcao": [
      "FuncaoDeclaracao CondicaoInicio Value CondicaoFim",
    ],

    "Tipos": ["Inteiro"],

    "ParametroFuncao": [
      "Identificador",
      "Identificador Virgula Espaco ParametroFuncao",
      "Numeros",
      "Numeros Virgula Espaco ParametroFuncao",
    ],

    "ChamadaFuncao": [
      "IdentificadorFuncao Espaco ( ParametroFuncao )",
    ],

    "Operandos": [
      "Numeros",
      "ChamadaFuncao"
    ],

    "Operacao": [
      "Operandos Espaco Operadores Espaco Operandos",
      "Operacao Espaco Operadores Espaco Operandos",
    ],

    "Operadores": ["Mais", "Menos", "Multiplicacao", "Divisao"],

    "DeclaracaoLista": ["Declaracao", "DeclaracaoLista Declaracao"],
    "AtribuicaoLista": ["Atribuicao", "AtribuicaoLista Atribuicao"],

    "OperadorLogico": ["Maior", "Menor", "Igual", "Diferente"],

    "Numeros": ["Numero", "Zero"],
  },
};

var options = { type: "slr", moduleType: "commonjs", moduleName: "jsoncheck" };

exports.main = function main() {
  var code = new Jison.Generator(exports.grammar, options).generate();
  console.log(code);
};

if (require.main === module) exports.main();
