const bSearch = (target, targetArr) => {
    let searchArr = targetArr;
    let resultIndex = 0;
    while (true) {
        const midIndex = Math.floor(searchArr.length / 2);
        const midNumber = searchArr[midIndex];
        if (target > midNumber) {
            searchArr = searchArr.slice(midIndex, targetArr.length);
            if (searchArr.length === 0 || (searchArr.length === 1 && searchArr[0] !== target)) {
                resultIndex = -1;
                break;
            }
            resultIndex += midIndex
        } else if (target < midNumber) {
            searchArr = searchArr.slice(0, midIndex);
            if (searchArr.length === 0 || (searchArr.length === 1 && searchArr[0] !== target)) {
                resultIndex = -1;
                break;
            }
        } else {
            resultIndex = resultIndex + midIndex;
            break;
        }
    }
    return resultIndex;
};

const bSearchRecursion = (target, targetArr) => {
    if (target !== targetArr[0] && targetArr.length === 1) {
        return -1;
    }
    if (target === targetArr[0]) {
        return 0;
    }
    const midIndex = Math.floor(targetArr.length / 2);
    if (target > targetArr[midIndex]) {
        const findIndex = bSearchRecursion(target, targetArr.slice(midIndex, targetArr.length));
        return findIndex > 0 ? midIndex + findIndex : -1;
    } else if (target < targetArr[midIndex]) {
        const findIndex = bSearchRecursion(target, targetArr.slice(0, midIndex));;
        return findIndex > 0 ? findIndex : -1
    } else {
        return midIndex;
    }
}
const targetArr = [3, 5];

console.log(bSearchRecursion(5, targetArr));