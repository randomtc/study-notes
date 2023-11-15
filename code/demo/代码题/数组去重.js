const arr = [1, 2, 1, 5, 7, 3, 2, 5, 7]
const fn1 = arr => [...new Set(arr)]
const fn2 = arr => {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
const fn3 = arr => arr.filter((item, index, array) => array.indexOf(item) === index)
console.log(fn3(arr));

