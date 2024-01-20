const testStr = '1ab2c3e';
const consoleStr = (str) => {
    const letterArr = str.split(/\d/).filter(Boolean);
    const countStrArr = str.split(/\D/).filter(Boolean);
    let result = '';
    letterArr.forEach(str => {
        const countStr = countStrArr.shift();
        const repeatStr = str.repeat(Number(countStr));
        result += repeatStr
    });
    return result;
}
console.log(consoleStr(testStr));