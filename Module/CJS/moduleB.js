/** require.cache 已经有对应的缓存模块所以不会循环引用 */
const moduleA = require("./moduleA.js");
console.log('moduleB模块');
console.log(moduleA);