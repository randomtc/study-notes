

function promiseAll(promise) {
    return new Promise((resolve, reject) => {

        if (!Array.isArray(promise)) return reject(new TypeError('类型错误'))

        if (promise.length === 0) return resolve([])

        const resArr = []
        let num = 0
        promise.forEach(item => {
            Promise.resolve(item).then(res => {
                num++
                resArr.push(res)
                if (num === promise.length) {
                    resolve(resArr)
                }
            }).catch(err => reject(err))
        })
    })

}

promiseAll([1, 2]).then(res => {
    console.log(res);
}, rej => {
    console.log(rej);
}).catch(err => {
    console.log(err);
})


function fn(promise) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promise)) return reject(new TypeError(''))
        const resArr = []
        let num = 0
        promise.forEach(item => {
            Promise.resolve(item).then((res) => {
                resArr.push(res)
                num++
                if (num === promise.length) {
                    resolve(resArr)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    })
}