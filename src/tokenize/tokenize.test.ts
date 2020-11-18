import {tokenize} from './tokenize';

describe(tokenize, () => {
  it('should return an array', () => {
    expect(Array.isArray(tokenize(''))).toBe(true);
  });

  it('should be able to tokenize Layout correctly', () => {
    const input = `Layout`;
    const result = [
      {
        type: 'element',
        value: 'Layout'
      }
    ];

    expect(tokenize(input)).toEqual(result);
  })

  it('should be able to tokenize element with parenthesis correctly', () => {
    const input = `Text("Lorem")`
    const result = [
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'Lorem'},
      {type: 'parenthesis', value: ')'},
    ]
    expect(tokenize(input)).toEqual(result);
  })

  it('should be able to tokenize nested element correctly', () => {
    const input = `Layout {
      Text("L     OR")
      Text("LOR")
    }`
    const result = [
      {type: 'element', value: 'Layout'},
      {type: 'bracket', value: '{'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'L     OR'},
      {type: 'parenthesis', value: ')'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'LOR'},
      {type: 'parenthesis', value: ')'},
      {type: 'bracket', value: '}'},
    ]
    expect(tokenize(input)).toEqual(result);
  });

  it('should be able to tokenize nested element with params correctly', () => {
    const input = `Layout {
      Text("L     OR")
      Text("LOR").color($black)
    }`
    const result = [
      {type: 'element', value: 'Layout'},
      {type: 'bracket', value: '{'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'L     OR'},
      {type: 'parenthesis', value: ')'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'LOR'},
      {type: 'parenthesis', value: ')'},
      {type: 'method', value: 'color'},
      {type: 'parenthesis', value: '('},
      {type: 'parameter', value: 'black'},
      {type: 'parenthesis', value: ')'},
      {type: 'bracket', value: '}'},
    ]
    expect(tokenize(input)).toEqual(result);
  })

  it('should be able to tokenize decorator correctly', () => {
    const input = `@SEO
      .title("xD")
      .description("Moja stronka :)")
    Layout {
      Text("L     OR")
      Text("LOR").color($black)
    }`
    const result = [
      {type: 'decorator', value: 'SEO'},
      {type: 'method', value: 'title'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'xD'},
      {type: 'parenthesis', value: ')'},
      {type: 'method', value: 'description'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'Moja stronka :)'},
      {type: 'parenthesis', value: ')'},
      {type: 'element', value: 'Layout'},
      {type: 'bracket', value: '{'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'L     OR'},
      {type: 'parenthesis', value: ')'},
      {type: 'element', value: 'Text'},
      {type: 'parenthesis', value: '('},
      {type: 'text', value: 'LOR'},
      {type: 'parenthesis', value: ')'},
      {type: 'method', value: 'color'},
      {type: 'parenthesis', value: '('},
      {type: 'parameter', value: 'black'},
      {type: 'parenthesis', value: ')'},
      {type: 'bracket', value: '}'},
    ]
    expect(tokenize(input)).toEqual(result);
  })
})