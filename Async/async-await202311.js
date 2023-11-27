/**
 * async/await 的异步请求使用 generator 和 promise 模拟实现
 * 题目来源于 http://scriptoj.mangojuice.top/problems/72
 */
const wrapAsync = function (generatorFn) {
    const run = (...arguments) => {
        const iterator = generatorFn(...arguments);
        return new Promise((resolve, reject) => {
            let co = (value) => {
                resultObj = iterator.next(value);
                if (!resultObj.done) {
                    resultObj.value.then(co, co);
                } else {
                    resolve(resultObj.value);
                }
            }
            co();
        });
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


const run = wrapAsync(function* (lastName) {
    const data1 = yield getData('Jerry ' + lastName)
    const data2 = yield getData('Lucy ' + lastName)
    return [data1, data2]
})

run('Green').then((val) => {
    console.log('===');
    console.log(val) // => [ 'My name is Jerry Green', 'My name is Lucy Green' ]
})