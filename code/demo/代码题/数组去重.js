const arr = [1, 2, 1, 5, 7, 3, 2, 5, 7]
const fn1 = arr => [...new Set(arr)]
const fn2 = arr => {

    const newArr = []
    for (const item of arr) {
        if (!newArr.includes(item)) {
            newArr.push(item)
        }
    }
    return newArr
}
// const fn3 = arr => arr.filter((item, index, array) => array.indexOf(item) === index)

const fn3 = arr => arr.filter((item, i, array) => array.indexOf(item) === i)
console.log(fn3(arr));

