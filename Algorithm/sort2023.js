const swap = (targetArr, a, b) => {
    const c = targetArr[a];
    targetArr[a] = targetArr[b];
    targetArr[b] = c;
}
const bubbleSort = (targetArr) => {
    if (targetArr.length <= 1) {
        return targetArr
    }
    for (let i = 0; i < targetArr.length - 1; i++) {
        let needBreak = true;
        for (let j = 0; j < targetArr.length - i - 1; j++) {
            if (targetArr[j] > targetArr[j + 1]) {
                needBreak = false;
                swap(targetArr, j, j + 1);
            }
        }
        if (needBreak) {
            break;
        }
    }
    return targetArr;
}
const selectSort = (targetArr) => {
    if (targetArr.length <= 1) {
        return targetArr
    }
    for (let i = 0; i < targetArr.length - 1; i++) {
        let minIndex = -1;
        for (let j = 0; j < targetArr.length - i - 1; j++) {
            if (targetArr[j] < targetArr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex > 0) {
            swap(targetArr, minIndex, targetArr[i])
        }
    }
    return targetArr;
}
const insertSort = (targetArr) => {
    if (targetArr.length <= 1) {
        return targetArr
    }
    for (let i = 0; i < targetArr.length - 1; i++) {
        const curVal = targetArr[i + 1];
        for (let j = i; j >= 0; j--) {
            if (curVal < targetArr[j]) {
                targetArr[j + 1] = targetArr[j];
            } else {
                break;
            }
        }
    }
    return targetArr;
}
const mergeSort = (targetArr) => {
    const merge = (leftArr = [], rightArr = []) => {
        let resultMerge = [];
        let leftArrPosition = 0, rightArrPosition = 0;
        while (leftArrPosition <= leftArr.length && rightArrPosition <= rightArr.length) {
            if (!leftArr[leftArrPosition] || leftArr[leftArrPosition] >= rightArr[rightArrPosition]) {
                rightArr[rightArrPosition] && resultMerge.push(rightArr[rightArrPosition]);
                rightArrPosition++;
            } else if (!rightArr[rightArrPosition] || leftArr[leftArrPosition] <= rightArr[rightArrPosition]) {
                leftArr[leftArrPosition] && resultMerge.push(leftArr[leftArrPosition]);
                leftArrPosition++;
            }
        }
        return resultMerge;
    }
    const mergeSortInner = (targetArr) => {
        if (!targetArr.length) {
            return [];
        } else if (targetArr.length === 1) {
            return targetArr;
        }
        const mid = Math.floor(targetArr.length / 2);
        const leftArr = mergeSortInner(targetArr.slice(0, mid));
        const rightArr = mergeSortInner(targetArr.slice(mid, targetArr.length));
        return merge(leftArr, rightArr)
    }
    return mergeSortInner(targetArr);
}
const quickSort = (targetArr) => {
    const quickSortInner = (targetArr = []) => {
        if (!targetArr.length) {
            return [];
        }
        if (targetArr.length === 1) {
            return targetArr;
        }
        const midIndex = Math.floor(targetArr.length / 2);
        const midNumber = targetArr.splice(midIndex, 1)[0];
        const leftArr = [];
        const rightArr = [];
        targetArr.forEach(item => {
            item > midNumber ? rightArr.push(item) : leftArr.push(item);
        });
        return [].concat(...quickSortInner(leftArr), midNumber, ...quickSortInner(rightArr));
    }
    return quickSortInner(targetArr)
}

const targetArr = [57, 1, 2, 4, 56, 1];

console.log(bubbleSort(targetArr));
console.log(selectSort(targetArr));
console.log(insertSort(targetArr));
console.log(mergeSort(targetArr));
console.log(quickSort(targetArr));