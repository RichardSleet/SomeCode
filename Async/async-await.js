/**
 * async/await 的异步请求使用 generator 和 promise 模拟实现
 * 题目来源于 http://scriptoj.mangojuice.top/problems/72
 */
const wrapAsync = function _wrapAsync(generatorFn){
    var _generatorFn = generatorFn;
    var _iterator;
    var run = function _run(){
        _iterator = _generatorFn(...arguments);
        var self = this;
        return new Promise((resolve, reject)=>{
            var co = function _co(data){
                var result = _iterator.next(data);
                if (result.done) {
                    //完成的情况下
                    return resolve(result.value);
                } else {
                    //未完成的情况下,继续迭代
                    return result.value.then((data)=>{
                        _co(data);
                    });
                }
            };
            return _iterator.next().value.then((data)=>{
                co(data);
            });
        })
    }
    return run;
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
