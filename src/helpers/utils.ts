import {tap} from 'lodash';

const pipe = (...funcs: any) => (value: any) =>
  funcs.reduce((value: any, func: (arg0: any) => any) => func(value), value);

const log = (value: any) => tap(value, console.log);

const peek = (array: any) => array[0];
const pop = (array: any) => array.shift();

export {
  pipe,
  log,
  peek,
  pop,
  tap,
};
