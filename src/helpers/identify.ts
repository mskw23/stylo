const LETTER = /[a-zA-Z]/;
const LETTER_OR_NUMBER = /^[a-zA-Z0-9_.-]*$/;
const UPPER_CASE = /[A-Z]/;
const LOWER_CASE = /[a-z]/;
const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;
const OPERATORS = ['+', '-', '*', '/', '%'];

const isLetter = (character: string) => LETTER.test(character);

const isLetterOrNumber = (character: string) => LETTER_OR_NUMBER.test(character);

const isLowerCase = (character: string) => LOWER_CASE.test(character);

const isUpperCase = (character: string) => UPPER_CASE.test(character);

const isWhitespace = (character: string) => WHITESPACE.test(character);

const isNumber = (character: string) => NUMBER.test(character);

const isOpeningParenthesis = (character: string) => character === '(';

const isClosingParenthesis = (character: string) => character === ')';

const isParenthesis = (character: string) =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);

const isOpeningBracket = (character: string) => character === '{';

const isClosingBracket = (character: string) => character === '}';

const isBracket = (character: string) =>
  isOpeningBracket(character) || isClosingBracket(character);

const isQuote = (character: string) => character === '"';

const isDot = (character: string) => character === '.';

const isAt = (character: string) => character === '@';

const isComma = (character: string) => character === ',';

const isDollar = (character: string) => character === '$';

const isOperator = (character: string) => OPERATORS.includes(character);

export {
  isLetter,
  isLetterOrNumber,
  isUpperCase,
  isLowerCase,
  isWhitespace,
  isNumber,
  isOpeningParenthesis,
  isClosingParenthesis,
  isParenthesis,
  isOpeningBracket,
  isClosingBracket,
  isBracket,
  isQuote,
  isDot,
  isAt,
  isComma,
  isDollar,
  isOperator,
};
