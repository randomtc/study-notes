function flatArr(arr) {
    let newArr = []
    arr.forEch(item => {
        if (Array.isArray(item)) {
            newArr = newArr.concat(flatArr(item))
        } else {
            newArr.push(item)
        }
    })
}

function flat(arr) {
    const newArr = []
    for (const item of arr) {
        if (Array.isArray(item)) {
            newArr = newArr.concat(flat(item))
        } else {
            newArr.push(item)
        }
    }
    return newArr
}

