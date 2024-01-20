// const nodeArr = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];

// const markTree2n = (nodeArr, p, q) => {
//     let pPointer = nodeArr.indexOf(p);
//     let qPointer = nodeArr.indexOf(q);
//     let deepLayer = pPointer >= qPointer ? pPointer : qPointer;
//     let shallowLayer = pPointer >= qPointer ? qPointer : pPointer;
//     while (shallowLayer >= 0 || deepLayer >= 0) {
//         if (shallowLayer === deepLayer) {
//             return nodeArr[shallowLayer];
//         } else if (deepLayer > shallowLayer) {
//             deepLayer = Math.floor((deepLayer + 1) / 2 - 1);
//         } else {
//             shallowLayer = Math.floor((shallowLayer + 1) / 2 - 1);
//         }
//     }
// }

// const markTree = (nodeArr, p, q) => {
//     let pPath = [];
//     let qPath = [];
//     const layerDeepLoop = (layerNodeQueue) => {
//         let queueLength = layerNodeQueue.length;
//         if (!queueLength) {
//             return;
//         }
//         let nextLayer = [];
//         for (let i = 0; i < queueLength; i++) {
//             const layerNodeInfo = layerNodeQueue.shift();
//             if (layerNodeInfo.node && layerNodeInfo.node === p) {
//                 pPath = [...layerNodeInfo.path, layerNodeInfo.node];
//             }
//             if (layerNodeInfo.node && layerNodeInfo.node === q) {
//                 qPath = [...layerNodeInfo.path, layerNodeInfo.node];
//             }
//             const left = nodeArr.shift();
//             if (left) {
//                 nextLayer.push({ node: left, path: [...layerNodeInfo.path, layerNodeInfo.node] });
//             }
//             const right = nodeArr.shift();
//             if (right) {
//                 nextLayer.push({ node: right, path: [...layerNodeInfo.path, layerNodeInfo.node] });
//             }
//         }
//         if (nextLayer.length) {
//             layerDeepLoop(nextLayer);
//         }
//     }
//     layerDeepLoop([{ node: nodeArr.shift(), path: [] }]);
//     let longPathArr = pPath.length > qPath.length ? pPath : qPath;
//     let shortPathArr = pPath.length > qPath.length ? qPath : pPath;
//     let sameNode = null;
//     while (shortPathArr.length) {
//         const longNode = longPathArr.shift();
//         const shortNode = shortPathArr.shift();
//         if (longNode && shortNode && longNode === shortNode) {
//             sameNode = shortNode;
//         } else {
//             break;
//         }
//     }
//     return sameNode;
// }
// console.log(markTree2n(nodeArr, 0, 8));


const nodeAnotherArr = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
const markTree = (nodeArr, p, q) => {
    let targetVal = 0;
    const findTree = (index, p, q) => {
        let resultArr = [];
        if (nodeArr[index] === p || nodeArr[index] === q) {
            resultArr.push(true)
        }
        const leftIndex = 2 * (index + 1) - 1;
        const rightIndex = 2 * (index + 1);
        if (leftIndex < nodeArr.length) {
            const result = findTree(leftIndex, p, q);
            result && resultArr.push(true);
        }
        if (rightIndex < nodeArr.length) {
            const result = findTree(rightIndex, p, q);
            result && resultArr.push(true);
        }
        if (resultArr[0] && resultArr[1]) {
            targetVal = index;
        }
        return resultArr[0] || resultArr[1];
    }
    findTree(0, p, q);
    return targetVal;
}
console.log(markTree(nodeAnotherArr, 5, 0))

// 给我一个 babel 插件的代码，他可以有下面的功能例如，找到对应 JSX 元素如果，JSX元素上有绑定 onClick 事件就回去看这个事件当中是不是使用了 ctx.log({ d: 'btn'})  的方法是否为他穿入了 d 元素。如果传入了 d 元素我需要在这个JSX的 Button 组件上增加