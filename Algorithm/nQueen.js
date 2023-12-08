/**
 * @param {number} n
 * @return {string[][]}
 */

/** 输出结果 */
const getResult = (results, n) => {
    return results.map(result => {
        return result.map(i => {
            return [...new Array(i).fill('.'), 'Q', ...new Array(n - i - 1).fill('.')].join('');
        });
    });
}

/** 检查 */
const check = (curResult, targetColumn, n) => {
    const targetRow = curResult.length;
    if (curResult.indexOf(targetColumn) > -1) {
        /** 列上有重复 */
        return false;
    }
    for (let leftX = targetColumn - 1, y = targetRow - 1; y >= 0 && leftX >= 0; --leftX, --y) {
        /** 左上有重复 */
        if (curResult[y] === leftX) {
            return false;
        }
    }
    for (let rightX = targetColumn + 1, y = targetRow - 1; y >= 0 && rightX < n; ++rightX, --y) {
        /** 右上有重复 */
        if (curResult[y] === rightX) {
            return false;
        }
    }
    return true;
}


const solveQueenRows = function (targetRows, curResult, n, finalResult) {
    if (targetRows === n) {
        finalResult.push(curResult);
    }
    for (let column = 0; column < n; ++column) {
        if (check(curResult, column, n)) {
            solveQueenRows(targetRows + 1, [...curResult, column], n, finalResult);
        }
    }
}

var solveNQueens = function (n) {
    const results = [];
    solveQueenRows(0, [], n, results);
    return getResult(results, n);
};