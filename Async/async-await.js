/**
 * async/await 的异步请求使用 generator 和 promise 模拟实现
 * 题目来源于 http://scriptoj.mangojuice.top/problems/72
 */
const wrapAsync = (generatorFn) => {
    var _generatorFn = generatorFn;
    const resultFn = function _resultFn(){
        var self = this;
        _generatorFn = _generatorFn.call(this, ...arguments);
        return new Promise((resolve, reject) => {
            const nextFn = function _nextFn(data) {
                var nextGenerator = _generatorFn.next(data);
                if (!nextGenerator.done) {
                    return nextGenerator.value.then((newData) => {
                        return _nextFn.call(self, newData);
                    });
                } else {
                    resolve(nextGenerator.value);
                }
            };
            return _generatorFn.next().value.then((data) => {
                return nextFn.call(self, data);
            });
        });
    }
    return resultFn;
}

const getData = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('My name is ' + name)
        }, 100) // 模拟异步获取数据
    })
}
  

const run = wrapAsync(function * (lastName) {
    const data1 = yield getData('Jerry ' + lastName)
    const data2 = yield getData('Lucy ' + lastName)
    return [data1, data2]
})

run('Green').then((val) => {
    console.log(val) // => [ 'My name is Jerry Green', 'My name is Lucy Green' ]
})
