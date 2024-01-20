
const request1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(1);
        }, 1000);
    })
};
const request2 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(2);
        }, 5000);
    })
};
const request3 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(3);
        }, 1000);
    })
};
const request4 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(4);
        }, 7000);
    })
};

createReqeustPool = (count) => {
    let requestPoolCount = 0;
    const requestQueue = [];
    const commonHandler = (res, rej) => (data) => {
        const requestInfo = requestQueue.shift();
        if (requestInfo) {
            requestInfo.request().then(commonHandler(requestInfo.resolve, requestInfo.reject));
        }
        res(data);
    }
    return (requestFn) => {
        return new Promise((res, rej) => {
            if (requestPoolCount < count) {
                ++requestPoolCount;
                requestFn().then(commonHandler(res, rej));
            } else {
                requestQueue.push({ request: requestFn, resolve: res, reject: rej });
            }
        });
    }
}

// createReqeustPool = (count) => {
//     let pollCount = 0;
//     const requestQueue = [];
//     const commonHandler = () => {
//         const requestTask = requestQueue.shift();
//         if (requestTask) {
//             requestTask.request().then((data) => {
//                 requestTask.resolve(data)
//             }).then(commonHandler);
//         }
//     }
//     return (request) => {
//         return new Promise((resolve, reject) => {
//             if (pollCount <= count) {
//                 ++pollCount;
//                 request().then((data) => {
//                     resolve(data);
//                 }).then(commonHandler);
//             } else {
//                 requestQueue.push({
//                     request,
//                     resolve,
//                     reject
//                 });
//             }
//         })
//     }
// }
const addRequest = createReqeustPool(2);
addRequest(request1).then((data) => {
    console.log(data, '==');
})
addRequest(request2).then((data) => {
    console.log(data, '==');
})
addRequest(request3).then((data) => {
    console.log(data, '==');
})
addRequest(request4).then((data) => {
    console.log(data, '==');
})

