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



