//解决循环引用问题，我们可以额外开辟一个存储空间map
function deepCopy(obj, map = new Map()) {
    //维护一个数组，不需要递归遍历的数据类型（可以自定义拓展）
    const noDeep = [
        obj === null,
        typeof obj !== 'object',
        //.....日期，正则
    ]

    //符合条件，直接返回
    if (noDeep.some(item => item)) return obj

    const newData = Array.isArray(obj) ? [] : {}

    // 检查map中有无克隆过的对象有就直接返回
    if (map.get(obj)) return map.get(obj)

    // 没有将当前对象作为key，克隆对象作为value进行存储继续克隆
    map.set(obj, newData)


    for (let key in obj) {

        //对象本身可能自定义hasOwnProperty
        // if (obj.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newData[key] = deepCopy(obj[key], map)
        }
    }

    return newData
}

const deepCopyPro = (obj, map = new Map()) => {
    if (obj === null || typeof obj !== 'object') return obj
    const result = Array.isArray(obj) ? [] : {}
    if (map.get(obj)) return map.get(obj)
    map.set(obj, result)
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepCopyPro(obj[key])
        }
    }
    return result
}