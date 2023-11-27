// function throttle(fn, options = { duration: 5000 }) {
//     const { duration } = options;
//     let timer = 0;
//     function throttleFn(...args) {
//         if (!timer) {
//             fn.call(this, ...args);
//             timer = setTimeout(() => {
//                 clearTimeout(timer)
//                 timer = 0;
//             }, duration);
//         }
//     }
//     return throttleFn;
// }

// var throttleFn = throttle(function () {
//     console.log('1');
// }, { duration: 5000 });

// setInterval(() => {
//     throttleFn();
// }, 100);

function debounce(fn, options = { duration }) {
    const { duration } = options;
    let timer = 0;
    function debounceFn(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(this, ...args);
            timer = 0;
        }, duration);
    }
    return debounceFn;
}

var debounceFn = debounce(function () {
    console.log('1');
}, { duration: 5000 });
var count = 0;
let interval = setInterval(() => {
    debounceFn();
    count++;
    if (count >= 100) {
        clearInterval(interval)
    }
}, 100);
