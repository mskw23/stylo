import {isOpeningParenthesis, isClosingParenthesis, isOpeningBracket, isClosingBracket, isBracket} from '../helpers/identify';
import { pop, peek } from '../helpers/utils';

const getElementAST = (value: string) => {
  switch(value) {
    case 'Main': return {
      type: 'element',
      tagName: 'main',
      properties: {className: []},
      children: []
    }
    case 'View': return {
      type: 'element',
      tagName: 'div',
      properties: {className: []},
      children: []
    }
    case 'Heading': return {
      type: 'element',
      tagName: 'h1',
      properties: {className: ['text-2xl font-semibold']},
      children: []
    }
    case 'Header': return {
      type: 'element',
      tagName: 'header',
      properties: {className: []},
      children: []
    }
    case 'Nav': return {
      type: 'element',
      tagName: 'nav',
      properties: {className: []},
      children: []
    }
    case 'Link': return {
      type: 'element',
      tagName: 'a',
      properties: {className: []},
      children: []
    }
    case 'Paragraph': return {
      type: 'element',
      tagName: 'p',
      properties: {className: []},
      children: []
    }
    case 'Text': return {
      type: 'text'
    }
    default: return {
      type: 'element',
      tagName: 'div',
      properties: {className: []},
      children: []
    }
  }
}

const handleProperty = (ast: any, token: string) => {
  if(ast.type === 'text') {
    return {...ast, value: token};
  } else {
    switch(ast.tagName) {
    case 'a': {
      return {...ast, children: [{type: 'text', value: token}]};
    }
    case 'h1': {
      return {...ast, children: [{type: 'text', value: token}]};
    }
    case 'p': {
      return {...ast, children: [{type: 'text', value: token}]};
    }
    default: {
      return ast;
    }
  }
  }
  
}

const parseChild = (tokens:Array<any>) => {
  let token = pop(tokens);
  let ast: any = [];
  let index = -1;
  while(token && !isClosingBracket(token.value)) {
    if(token.type === 'element') {
      ast.push(getElementAST(token.value));
      index++;
    }
    if(isOpeningParenthesis(token.value)) {
      while(!isClosingParenthesis(token.value)) {
        ast[index] = handleProperty(ast[index], token.value);
        token = pop(tokens);
        if(!token) {
          continue;
        }
      }
    }

    if(isOpeningBracket(token.value)) {
      [ast[index].children, token] = parseChild(tokens);
    }

    if(token && token.type === 'method') {
      const method = token.value;
      const args = [];
      token = pop(tokens);
      while(token && !isClosingParenthesis(token.value)) {
        token = pop(tokens);
        args.push(token.value); 
      }
      ast[index] = handleMethod(ast[index], method, args);
    }
    
    token = pop(tokens);
  }

  if(isClosingBracket(token.value)) {
    token = pop(tokens);
  }
  
  return [ast, token];
}

const handleMethod = (ast: any, method: string, args: string[]) => {
  if(ast.tagName === 'main') {
    console.log("HESTEM")
  }
  switch(method) {
    case 'color': {
      if(ast.type === 'text') {
        return {
          type: 'element',
          tagName: 'span',
          properties: {className: [
            `text-${args[0]}`
          ]},
          children: [
            {
              type: 'text',
              value: ast.value
            }
          ]
        }
      } else {
        return {...ast, properties: {...ast.properties, className: [...ast.properties.className, `text-${args[0]}`]}}
      }
      
    }
    case 'backgroundColor': {
      if(ast.type === 'text') {
        return {
          type: 'element',
          tagName: 'span',
          properties: {className: [
            `bg-${args[0]}`
          ]},
          children: [
            {
              type: 'text',
              value: ast.value
            }
          ]
        }
      } else {
        return {...ast, properties: {...ast.properties, className: [...ast.properties.className, `bg-${args[0]}`]}}
      }
      
    }
    case 'to': {
      return {...ast, properties: {...ast.properties, href: args[0]}}
    }
    default: {
      return ast;
    }
  }
}

const parse = (tokens: Array<any>): any => {
  let token = pop(tokens);
  let ast: any = {};
  while(token && !isBracket(token.value)) {
    if(token.type === 'element') {
      ast = getElementAST(token.value);
    }

    if(isOpeningParenthesis(token.value)) {
      while(!isClosingParenthesis(token.value)) {
        ast = handleProperty(ast, token.value);
        token = pop(tokens);
        if(!token) {
          continue;
        }
      }
    }
    if(token && token.type === 'method') {
      const method = token.value;
      const args = [];
      token = pop(tokens);
      while(token && !isClosingParenthesis(token.value)) {
        token = pop(tokens);
        args.push(token.value); 
      }
      ast = handleMethod(ast, method, args);
    }
    token = pop(tokens);
  }

  if(isOpeningBracket(token.value)) {
    [ast.children, token] = parseChild(tokens);
  }

  if(token && token.type === 'method') {
    const method = token.value;
    const args = [];
    token = pop(tokens);
    while(token && !isClosingParenthesis(token.value)) {
      token = pop(tokens);
      args.push(token.value); 
    }
    token = pop(tokens);
    console.log(ast);
    console.log(method);
    ast = handleMethod(ast, method, args);
  }

  return ast;
}

export {parse}