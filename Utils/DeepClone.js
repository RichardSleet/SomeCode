// 递归实现一个深拷贝
function deepClone(source){
  var isCircle = deepClone.circleArr.some((item)=>{
    return item === source;
  })
  if(isCircle) {
    return source;
  } else {
    deepClone.circleArr.push(source);
  }
  console.log('source信息', source);
  if(!source || typeof source !== 'object'){
    throw new Error('error arguments', 'shallowClone');
  }
  //其中如果是一个对象的话通过得到他的原型
  var targetObj = Object.prototype.toString.call(source.constructor.name) === 'Array' ? [] : Object.create(Object.getPrototypeOf(source));
  //遍历可枚举的属性
  var keys = Object.keys(source);
  keys.forEach((item)=>{
    if(source.hasOwnProperty(item)){
      if(source[item] && typeof source[item] === 'object'){
        //是一个对象
        targetObj[item] = source[item].constructor === Array ? [] : {};
        targetObj[item] = deepClone(source[item]);
      }else{
        //普通值
        targetObj[item] = source[item];
      }
    }
  })
  return targetObj;
}
deepClone.circleArr = [];
 
class A {
  constructor(a){
    this.a = a;
  }
}
A.prototype.getA = function _getA(){
  console.log(this.a);
}
// test example
var o1 = {
  arr: [1, 2, 3],
  obj: new A(1),
  func: function(){
    return 1;
  }
};
o1.anotherObj = o1;
var o3 = deepClone(o1);
console.log(o3 === o1); // => false
console.log(o3.obj === o1.obj); // => false
console.log(o3.func === o1.func); // => true
o3.obj.getA();