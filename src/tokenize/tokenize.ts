import { isUpperCase, isLowerCase, isWhitespace, isBracket, isParenthesis, isQuote, isDot, isLetterOrNumber, isLetter, isAt, isComma, isDollar } from '../helpers/identify';

const tokenize = (input: string) => {
  const tokens: any[] = [];
  
  for (let cursor = 0; cursor < input.length; cursor++) {
    const character = input[cursor];

    if(isDollar(character)) {
      let param = '';

      while(isLetterOrNumber(input[++cursor])) {
        param += input[cursor];
        if(cursor === input.length - 1) {
          break;
        }
      }

      cursor--;

      tokens.push({
        type: 'parameter',
        value: param
      })

      continue;
    }

    if(isComma(character)) {
      tokens.push({
        type: 'comma',
        value: character
      })
      continue;
    }

    if(isAt(character)) {
      let symbol = "";
      
      while(isUpperCase(input[++cursor])) {
        symbol += input[cursor];
        if(cursor === input.length - 1) {
          break;
        }
      }

      cursor--;

      tokens.push({
        type: 'decorator',
        value: symbol
      })

      continue;
    }

    if(isDot(character)) {
      let param = '';

      while(isLetter(input[++cursor])) {
        param += input[cursor];
        if(cursor === input.length - 1) {
          break;
        }
      }

      cursor--;

      tokens.push({
        type: 'method',
        value: param
      })

      continue;
    }

    if(isUpperCase(character)) {
      let symbol = character;

      while(isLowerCase(input[++cursor])) {
        symbol += input[cursor];
        if(cursor === input.length - 1) {
          break;
        }
      }

      cursor--;

      tokens.push({
        type: 'element',
        value: symbol
      })

      continue;
    }

    if (isQuote(character)) {
      let string = '';
      while(!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: 'text',
        value: string,
      });

      continue;
    }

    if(isWhitespace(character)) {
      continue;
    }

    if(isBracket(character)) {
      tokens.push({
        type: 'bracket',
        value: character
      })
      continue;
    }

    if(isParenthesis(character)) {
      tokens.push({
        type: 'parenthesis',
        value: character
      })
      continue;
    }
  }
  
  return tokens;
}

export { tokenize }