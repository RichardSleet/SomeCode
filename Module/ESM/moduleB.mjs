import A from './moduleA.mjs';
const log = '模块B'
console.log('这是模块B');
console.log(A);
export default { log };