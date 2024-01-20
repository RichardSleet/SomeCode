// const curry = function _curry(fn, arr = []) {
//     const collectParamsCurry = function _collectParamsCurry() {
//         var args = [].concat(...arr, ...arguments);
//         if (args.length < fn.length) {
//             return _curry(fn, args);
//         } else {
//             return fn(...args);
//         }
//     }
//     return collectParamsCurry;
// }

// const add = curry((a, b) => a + b)
// const add1 = add(1)

// console.log(add1(1)); // => 2
// console.log(add1(2));


const query = (_target) => {
    let target = _target;
    let taskArr = [];
    const result = {
        where: addWhere,
        sortBy: addSortBy,
        execute,
    }

    function where(...args) {
        target = Array.prototype.filter.call(target, ...args);
    }
    function addWhere(...args) {
        taskArr.push(() => { where(...args) })
        return result;
    }
    function addSortBy(key) {
        taskArr.push(() => {
            target = Array.prototype.sort.call(target, (a, b) => a[key] - b[key])
        })
        return result
    }
    function execute() {
        taskArr.forEach(fn => {
            fn();
        })
        return target;
    }
    return result;
}

const list = [{ id: 1, age: 1 }, { id: 3, age: 19 }, { id: 2, age: 20 }];
const result = query(list)
    .where(item => item.age > 18)
    .sortBy('id')
    .execute();

console.log(result);