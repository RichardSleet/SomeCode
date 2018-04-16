/**
 * 各种排序的实现
 */

//快排
function quickSort(arr){
    if (Array.isArray(arr) && arr.length > 1) {
        var flagIndex = Math.floor(arr.length / 2);
        var flag = arr.splice(flagIndex, 1)[0];
        var left = [];
        var right = [];
        arr.forEach((item) => {
            if (item <= flag) {
                left.push(item);
            } else {
                right.push(item);
            }
        });
        return quickSort(left).concat(flag,quickSort(right));
    }
    return arr;
}

//冒泡排序
function bubbleSort(arr) {
    if (Array.isArray(arr)) {
        var temp;
        for (let a = 0 ;a < arr.length; a++) {
            for (let b = 0; b < arr.length - 1; b++) {
                if (arr[b] >= arr[b+1]) {
                    temp = arr[b+1];
                    arr[b+1] = arr[b];
                    arr[b] = temp;
                }
            }
        }
        return arr;
    } else {
        return '请你给我数组好么'
    }
}

// 选择排序
function selectSort(arr) {
    var temp;
    for (var i = 0; i < arr.length - 1; i++) {
        var minFlag = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minFlag]) {
                minFlag = j;
            }
        }
        if (minFlag !== i) {
            temp = arr[minFlag];
            arr[minFlag] = arr[i];
            arr[i] = temp;
        }
    }
    return arr;
}
// 插入排序合集,直接插入排序
function directInsertionSort(arr) {
    if (Array.isArray(arr)) {
        for (let i = 1; i < arr.length; i++) {
            var current = arr[i];
            var flagIndex = i - 1;
            for (; flagIndex >= 0; flagIndex--) {
                if (current <= arr[flagIndex]) {
                    arr[flagIndex+1] = arr[flagIndex];
                } else {
                    break;
                }
            }
            if (flagIndex + 1 !== i) {
                arr[flagIndex + 1] = current;
            }   
        }
        return arr;
    } else {
        return '请你给我数组好么'
    }
}


//二分插入
function binaryInsertionSort(arr) {
    if (Array.isArray(arr)) {
        for (let i = 1; i<arr.length; i++) {
            var low = 0;
            var high = i - 1;
            var current = arr[i];
            while (low < high) {
                var mid = Math.floor((low + high)/2); 
                if (current >= arr[mid]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            for (let j = i-1; j>=low; j--) {
                arr[j+1] = arr[j];
            }
            arr[low] = current;
        }
        return arr;
    } else {
        return '请你给我数组好么'
    }
}
console.log(binaryInsertionSort([5,4,3,2,1]));