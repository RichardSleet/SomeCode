const deepClone = (target) => {
    let isCircle = deepClone.circleArr.some((item) => {
        return item === target;
    });
    if (isCircle) {
        return target;
    } else {
        deepClone.circleArr.push(target);
    }
    if (Array.isArray(target)) {
        return target.reduce((p, c) => {
            p.push(deepClone(c));
            return p;
        }, []);
    }
    if (target === null) {
        return null;
    }
    if (typeof target === 'object') {
        const result = Object.create(Object.getPrototypeOf(target));
        Object.keys(target).reduce((p, c) => {
            p[c] = deepClone(target[c])
            return p;
        }, result);
        return result;
    }
    return target;
}
deepClone.circleArr = [];

class A {
    constructor(a) {
        this.a = a;
    }
}
A.prototype.getA = function _getA() {
    console.log(this.a);
}
// test example
var o1 = {
    arr: [1, 2, 3],
    obj: new A(1),
    func: function () {
        return 1;
    }
};
o1.anotherObj = o1;
let o3 = deepClone(o1);
console.log(o3 === o1); // => false
console.log(o3.obj === o1.obj); // => false
console.log(o3.func === o1.func); // => true
o3.obj.getA();