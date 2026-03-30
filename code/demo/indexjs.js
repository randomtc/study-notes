//防抖
const debounce = (fn, delay) => {
    let timeRef = null
    return function (...args) {
        if (timeRef) clearTimeout(timeRef)
        timeRef = setTimeout(() => {
            fn.apply(this, arges)
        }, delay)
    }
}

//节流
const throttle = (fn, delay) => {
    let last = 0
    return function (...args) {
        const now = Date.now()
        if (now - last >= delay) {
            fn.apply(this, args)
            last = now
        }
    }
}

const myMap = (arr, callBack) => {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(callBack(arr[i], i, arr))
    }
    return result
}

const myFilter = (arr, callBack) => {
    const result = []

    for (let i = 0; i < arr.length; i++) {
        if (callBack(arr[i], i, arr)) {
            result.push(arr[i])
        }
    }

    return result
}

const myReduce = (arr, callBack, initVal) => {
    const acc = initVal ?? arr[0]
    const startIndex = initVal ? 0 : 1
    for (let i = startIndex; i < arr.length; i++) {
        acc = callBack(acc, arr[i], i, arr)
    }
    return acc
}

const myFlat = (arr, depth = 1) => {
    if (depth === 0) return arr
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (Array.isArray(item)) {
            result.push(...myFlat(item, depth - 1))
        } else {
            result.push(item)
        }
    }
    return result
}

const myClone = (obj, map = new Map()) => {
    if (typeof obj !== 'object' || obj === null) return obj

    const result = Array.isArray(obj) ? [] : {}

    if (map.get(obj)) return map.get(obj)
    map.set(obj, result)

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = myClone(obj[key], map)
        }
    }

    return result
}

// 输入: nums = [2, 7, 11, 15], target = 9
// 输出: [0, 1]   // 因为 nums[0] + nums[1] = 2 + 7 = 9
const twoSum = (nums, target) => {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const item = nums[i]
        const rest = target - item
        if (map.has(rest)) {
            return [map.get(rest), i]
        }
        map.set(item, i)
    }
}

//数组去重
const uniqueById = (arr) => {
    const map = new Map()
    arr.forEach(item => {
        map.set(item.id, item)
    })
    return Array.from(map.values())
}
//数组去重保留第一项
const uniqueById1 = (arr) => {
    const map = new Map()
    arr.forEach(item => {
        if (!map.has(item.id)) {
            map.set(item.id, item)
        }
    })
    return Array.from(map.values())
}

