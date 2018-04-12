/**
 * 根据Promise/A+ 实现简易Promise
 * Promise A+ Doc: https://promisesaplus.com/
 */
const statuses = ['pending', 'fulfilled', 'rejected']; 
function SSPromise(func){
    this.status = 'pending';
    this.data;
    /**
     * then方法调用分别注入的onFulfilled和onRejected
     */
    this.onFulfilledArr = [];
    this.onRejectedArr = [];

    /** 默认使用实例调用而不是全局调用 */
    resolve = resolve.bind(this);
    reject = reject.bind(this);
    /**调用转变pending -> resolve 使调用 reslove 的 promise 转变状态 */
    function resolve(args) {
        if(this.status === 'pending'){
            this.status = 'fulfilled';
            this.data = args;
            /**根据Promise/A+ 2.2.6 规范 */
            this.onFulfilledArr.forEach((onFulfilled)=>{
                onFulfilled(args);
            });
        }
    }
    /**调用转变 pending -> reject 使调用 reslove 的 promise 转变状态 */
    function reject(reason) {
        if(this.status === 'pending'){
            this.status = 'rejected';
            this.data = reason;
            /**根据Promise/A+ 2.2.6 规范 */
            this.onRejectedArr.forEach((onRejected)=>{
                onRejected(this.data);
            });
        }
    }
    //then方法
    SSPromise.prototype.then = function(onFulfilled, onRejected) {
        /**fulfilled状态下 可能构造侯桉树执行完以后直接 resolve*/
        if (typeof onFulfilled === 'function' && this.status === 'fulfilled') {
            try {
                var x = onFulfilled(this.data);
                if (x instanceof SSPromise){
                    //如果 resolve 返回的是 promise 则直接返回为新的 promise
                    return x;
                } else {
                    //如果返回不是 promise 则返回封装返回新的 promise
                    return new SSPromise(function (resolve, reject){
                        //转变新的 Promise 的状态
                        resolve(x);
                    });
                }
            } catch (e) {
                return new SSPromise(function(resolve, reject){
                    reject(e);
                });
            }
        }
        /**rejected 状态下 */
        if (typeof onRejected === 'function' && this.status === 'rejected') {
            try {
                var e = onRejected(this.data);
                if (x instanceof SSPromise){
                    //如果 resolve 返回的是 promise 则直接返回为新的 promise
                    return x;
                } else {
                    //如果返回不是 promise 则返回封装返回新的 promise
                    return new SSPromise(function (resolve, reject){
                        //转变新的 Promise 的状态
                        resolve(x);
                    });
                }
            } catch (e) {
                return new SSPromise(function(resolve, reject){
                    onRejected(e);
                });
            }
        }
        /**pending状态下 */
        if (this.status === 'pending') {
            var self = this;
            return new SSPromise(function(resolve, reject){
                self.onFulfilledArr.push(function(value) {
                    try {
                        var x = onFulfilled(value);
                        if (x instanceof Promise) {
                            x.then(resolve, reject);
                        } else {
                            resolve(x);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedArr.push(function(value) {
                    try {
                        var x = reject(value);
                        if (x instanceof Promise) {
                          x.then(resolve, reject);
                        } else {
                            reject(x);
                        }
                      } catch (e) {
                        reject(e);
                      }
                })
            })
        }
    }
    /** 执行传入当前 promise 的 resolve 和 reject的操作 */
    try {
        func(resolve, reject);
    } catch(e) {
        reject(e);
    }
}

var promise = new SSPromise(function(resolve, rejected){
    console.log('pending');
    setTimeout(function(){
        console.log('time out');
        resolve('fulfilled');
    }, 1000);
    console.log('pending...')
});
promise.then((data)=>{
    console.log(data);
    return 'another promise'
}).then((data)=>{
    console.log(data)
})