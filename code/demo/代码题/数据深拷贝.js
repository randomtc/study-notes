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

    if (map.get(obj)) return map.get(obj)

    map.set(obj, newData)


    for (let key in obj) {

        if (obj.hasOwnProperty(key)) {
            newData[key] = deepCopy(obj[key])
        }
    }

    return newData
}