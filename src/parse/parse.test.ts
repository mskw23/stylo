import { parse } from './parse';

describe(parse, () => {
  it.skip('should a token with ', () => {
    const tokens = [
      {type: 'element', value: 'Main'},
      {type: 'bracket', value: '{'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'L     OR'},
      {type: 'parenthesis', value: ')'},
      {type: 'method', value: 'color'},
      {type: 'parenthesis', value: '('},
      {type: 'parameter', value: 'black'},
      {type: 'parenthesis', value: ')'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'LOR'},
      {type: 'parenthesis', value: ')'},
      {type: 'bracket', value: '}'},
      {type: 'method', value: 'color'},
      {type: 'parenthesis', value: '('},
      {type: 'parameter', value: 'black'},
      {type: 'parenthesis', value: ')'},
    ];

    const ast = {
      type: 'element',
      tagName: 'main',
      properties: { className: [ 'text-black' ] },
      children: [
        {
          type: 'element',
          tagName: 'span',
          properties: {className: [ 'text-black' ]},
          children: [{ type: 'text', value: 'L     OR' }]
        },
        { type: 'text', value: 'LOR' }
      ]
    }
    const result = parse(tokens);
    expect(result).toEqual(ast);
  })
  it('lorem', () => {
    const tokens = [
      { type: 'element', value: 'Main' },
      { type: 'bracket', value: '{' },
      { type: 'element', value: 'Header' },
      { type: 'bracket', value: '{' },
      { type: 'element', value: 'Nav' },
      { type: 'bracket', value: '{' },
      { type: 'element', value: 'Link' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: 'Test' },
      { type: 'parenthesis', value: ')' },
      { type: 'method', value: 'to' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: '/test' },
      { type: 'parenthesis', value: ')' },
      { type: 'element', value: 'Link' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: 'Test2' },
      { type: 'parenthesis', value: ')' },
      { type: 'method', value: 'to' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: '/test' },
      { type: 'parenthesis', value: ')' },
      { type: 'element', value: 'Link' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: 'Test3' },
      { type: 'parenthesis', value: ')' },
      { type: 'method', value: 'to' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: '/test' },
      { type: 'parenthesis', value: ')' },
      { type: 'bracket', value: '}' },
      { type: 'method', value: 'color' },
      { type: 'parenthesis', value: '(' },
      { type: 'method', value: 'dark' },
      { type: 'parenthesis', value: ')' },
      { type: 'bracket', value: '}' },
      { type: 'method', value: 'backgroundColor' },
      { type: 'parenthesis', value: '(' },
      { type: 'method', value: 'yellow' },
      { type: 'parenthesis', value: ')' },
      { type: 'element', value: 'Text' },
      { type: 'parenthesis', value: '(' },
      { type: 'text', value: 'KAMIL TO LAMUS' },
      { type: 'parenthesis', value: ')' },
      { type: 'bracket', value: '}' }
    ]
    const result = parse(tokens);
  })
});