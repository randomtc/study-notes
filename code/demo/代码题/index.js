//输入1234567890，输出1,234,567,890
function fn(num) {
    const arr = []
    const newArr = String(num).split('')//返回一个数组包含每一项
    for (let i = 0; i < newArr.length; i++) {
        arr.push(newArr[i])
        //第一项和每三项插入一个','
        if (i === 0 || i % 3 === 0) {
            arr.push(',')
        }

    }
    arr.pop()
    return arr.join('') //方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔
}
console.log(fn(1234567890));


function fun(num) {
    const arr = String(num).split('')
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i])
        if (i === 0 || i % 3 === 0) {
            newArr.push(',')
        }
    }
    newArr.pop()
    return newArr.join('')
}