function promiseAll(promise) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promise)) {
            return reject(new TypeError('promise must be an array'))
        }
        if (promise.length === 0) {
            resolve([])
        } else {
            const res = []
            const len = promise.length
            let count = 0
            promise.forEach((promise, index) => {
                Promise.resolve(promise).then((data) => {
                    res[index] = data
                    count++
                    if (count === len) {
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    })
}