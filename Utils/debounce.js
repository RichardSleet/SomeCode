// //throttle
// const throttle = (fn, duration) => {
//     let timer = null;
//     function throttleFn (){
//       if (!timer) {
//         fn.apply(this, arguments);
//         timer = setTimeout(()=>{
//           clearTimeout(timer)
//           timer = null
//         }, duration);
//       }
//     }
//     return throttleFn;
// }
// var throttleFn = throttle(function(){
//     console.log('1');
// }, 5000);

// setInterval(()=>{
//     throttleFn();
// }, 100);

//debounce
const debounce = (fn, duration) => {
    let timer = null;
    function debounceFn (){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, duration);
    }
    return debounceFn;
}
var debounceFn = debounce(function(){
    console.log('1');
}, 5000);

var count = 0;
let interval = setInterval(()=>{
    debounceFn();
    count++;
    if(count >= 100){
        clearInterval(interval)
    }
}, 100);
