let result = Number.MIN_SAFE_INTEGER;


// const find = (i, curWeight, items, packageWeight) => {
//     if (curWeight === packageWeight || i === items.length) {
//         result = Math.max(curWeight, result);
//         return;
//     }
//     if (curWeight > packageWeight) {
//         return;
//     }
//     find(i + 1, curWeight, items, packageWeight);
//     if (curWeight + items[i] <= packageWeight) {
//         find(i + 1, curWeight + items[i], items, packageWeight);
//     }
// }
// find(0, 0, [2, 2, 8, 5], 9);

const find = (items, packageWeight) => {
    const state = new Array(packageWeight + 1);
    state[0] = true;
    if (items[0] < packageWeight) {
        state[items[0]] = true;
    }
    for (let i = 1; i < items.length; i++) {
        for (let j = packageWeight; j > 0; --j) {
            /** 放入 */
            if (state[j - items[i]]) {
                state[j] = true;
            }
        }
    }
    for (let z = packageWeight; z >= 0; --z) {
        if (state[z]) { return z }
    }
}
console.log(find([2, 2, 4, 6, 3], 9));
// find([2, 2, 4, 6, 3], 9);

