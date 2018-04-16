/**
 * 1. 先排序,后去重
 * 2. 开一个空数组去重
 * 奇淫技巧
 * 1. 利用 Set
 * 2. 利用 Object
 */

 //先排序,后去重.因为使用 splice 方法可能效率会低,也可以去重时使用开一个空数组
function quickSort(arr) {
    let midFlagIndex = Math.floor(arr.length / 2);
    let midFlag = Array.prototype.splice.call(arr, midFlagIndex, 1);
    let left = [];
    let right = []; 
    arr.forEach((item) => {
        if (item < midFlag) {
            left.push(item);
        } else {
            right.push(item);
        }
    });
    return quickSort(left).concat(midFlag, quickSort(right));
}
function firstSortThenUnique(arr) {
    if (Array.isArray(arr)) {
        //使用快排
        arr = quickSort(arr);
        for (let i = 0; i < arr.length - 1; i++) {
            if(arr[i] === arr[i+1]){
                arr.splice(i, 1);
            }
        }
    } else {
        console.error('请输入数组');
    }
}

//开空数组去重
function uniqueByPlainArr(arr) {
    if (Array.isArray(arr)) {
        let resultArr = [];
        arr.forEach((item) => {
            if (resultArr.indexOf(item) === -1) {
                resultArr.push(item);
            }
        });
        return resultArr;
    } else {
        console.log('请输入数组');
    }
}

//奇淫技巧
function uniqueBySet(arr) {
    if (Array.isArray(arr)) {
        return Array.from(new Set(arr));
    } else {
        console.log('请输入数组');
    }
}

function uniqueByObj(arr) {
    if (Array.isArray(arr)) {
        var obj = {};
        for (var i = 0; i < array.length; i++) {
            obj[array[i]] = null;
        }
        return Object.keys(obj);
    } else {
        console.log('请输入数组');
    }
}
