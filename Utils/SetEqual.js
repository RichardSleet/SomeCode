const isSameSet = (s1, s2) => {
    console.log('s1:',s1.size, 's2:', s2.size);
    let arr1 = Array.from(s1);
    let arr2 = Array.from(s2);
    if (s1.size !== s2.size) return false;
    return arr1.every((item)=>{
      return arr2.indexOf(item) != -1
    })
}

const a = {}
const b = 1
const c = 'ScriptOJ'
const e = '123'

const set1 = new Set([a, b, c])
const set2 = new Set([a, c, b, e])

console.log(isSameSet(set1, set2));