const curry = function _curry(fn, arr = []){
    const collectParamsCurry = function _collectParamsCurry(){
        var args = [].concat(...arr, ...arguments);
        if (args.length < fn.length) {
            return _curry(fn, args);
        } else {
            return fn(...args);
        }
    }
    return collectParamsCurry;
}
  
const add = curry((a, b) => a + b)
const add1 = add(1)

console.log(add1(1)); // => 2
console.log(add1(2));