var Generator = require("jison").Parser;

exports.grammar = {
  lex: {
    rules: [
      ["\\s+", "/* skip whitespace */"],
      ["#.*", "/* skip comments */"],
      ["([1-9][0-9]*)", "return 'Numero'"],
      ["(_[A-Z][a-z]{2,})", "return 'IdentificadorFuncao'"],
      ["inteiro\\s", "return 'Inteiro'"],
      ["se\\s", "return 'Se'"],
      ["senao", "return 'Senao'"],
      ["entao", "return 'Entao'"],
      ["inicio", "return 'Inicio'"],
      ["fim", "return 'Fim'"],
      ["maior", "return 'Maior'"],
      ["menor", "return 'Menor'"],
      ["igual", "return 'Igual'"],
      ["elgio", "return 'Elgio'"],
      ["enquanto\\s", "return 'Enquanto'"],
      ["diferente", "return 'Diferente'"],
      ["zero", "return 'Zero'"],
      ["[(]", "return '('"],
      ["[)]", "return ')'"],
      ["[,]", "return 'Virgula'"],
      ["\\s*[+]\\s*", "return 'Mais'"],
      ["\\s*[-]\\s*", "return 'Menos'"],
      ["\\s*[x]\\s*", "return 'Multiplicacao'"],
      ["\\s*[/]\\s*", "return 'Divisao'"],
      ["([A-Z][a-z]{2,})", "return 'Identificador'"],
      ["[.]", "return 'Ponto'"],
      ["(=)", "return '='"],
    ],
  },

  tokens:
    "Numero, IdentificadorFuncao Inteiro Se Senao Entao Inicio Fim Maior Menor Igual Elgio Enquanto Diferente Zero ( ) Virgula Mais Menos Multiplicacao Divisao Identificador Ponto =",
  start: "Value",

  bnf: {
    Value: [
      "DeclaracaoLista",
      "AtribuicaoLista",
      "Funcao",
      "Condicao",
      "LoopEnquanto",
      "Value Value",
    ],
    AtribuicaoValores: ["Operandos", "Operacao", "Identificador"],
    Atribuicao: [
      "Identificador = AtribuicaoValores Ponto",
      "Identificador = Operacao Ponto",
      "Elgio = AtribuicaoValoresElgio Ponto",
      "Elgio = OperacaoElgio Ponto",
    ],
    AtribuicaoValoresElgio: [
      "OperandosElgio",
      "OperacaoElgio",
      "Identificador",
    ],
    OperacaoElgio: [
      "OperandosElgio Operadores OperandosElgio",
      "Operacao Operadores Operacao",
    ],
    OperandosElgio: ["Numeros", "Identificador"],
    Declaracao: ["Tipos Identificador Ponto"],
    CondicaoSe: ["Se OperandosCondicao OperadorLogico OperandosCondicao Ponto"],
    CondicaoSenao: [
      "Senao Ponto CondicaoInicio CondicaoFim",
      "Senao Ponto CondicaoInicio Value CondicaoFim",
    ],
    CondicaoEntao: ["Entao Ponto"],
    CondicaoInicio: ["Inicio Ponto"],
    CondicaoFim: ["Fim Ponto"],
    Condicao: [
      "CondicaoSe CondicaoEntao CondicaoInicio Value CondicaoFim CondicaoSenao",
    ],
    LoopEnquanto: [
      "Enquanto OperandosCondicao OperadorLogico OperandosCondicao Ponto CondicaoInicio Value CondicaoFim",
    ],
    FuncaoParametro: [
      "Tipos Identificador",
      "Tipos Identificador Virgula FuncaoParametro",
    ],
    FuncaoDeclaracao: [
      "Tipos IdentificadorFuncao ( FuncaoParametro ) Ponto",
      "Tipos IdentificadorFuncao ( ) Ponto",
    ],
    Funcao: ["FuncaoDeclaracao CondicaoInicio Value CondicaoFim"],
    Tipos: ["Inteiro"],
    ParametroFuncao: [
      "Identificador",
      "Identificador Virgula ParametroFuncao",
      "Numeros",
      "Numeros Virgula ParametroFuncao",
    ],
    ChamadaFuncao: ["IdentificadorFuncao ( ParametroFuncao )"],
    Operandos: ["Numeros", "ChamadaFuncao", "Identificador"],
    OperandosCondicao: ["Numeros", "Identificador"],
    Operacao: [
      "Operandos Operadores Operandos",
      "Operacao Operadores Operandos",
    ],
    Operadores: ["Mais", "Menos", "Multiplicacao", "Divisao"],
    DeclaracaoLista: ["Declaracao", "DeclaracaoLista Declaracao"],
    AtribuicaoLista: ["Atribuicao", "AtribuicaoLista Atribuicao"],
    OperadorLogico: ["Maior", "Menor", "Igual", "Diferente"],
    Numeros: ["Numero", "Zero"],
  },
};

var options = { type: "slr", moduleType: "commonjs", moduleName: "jsoncheck" };

exports.main = function main() {
  var code = new Jison.Generator(exports.grammar, options).generate();
  console.log(code);
};

if (require.main === module) exports.main();
