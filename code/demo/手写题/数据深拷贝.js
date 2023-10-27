function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // 创建一个空对象或数组来存储复制的数据
    const copyData = Array.isArray(obj) ? [] : {}

    // 递归复制每个属性
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copyData[key] = deepCopy(obj[key])
        }
    }

    return copyData

}

function deepCopy(obj, hash = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj // 基本类型直接返回
    if (hash.has(obj)) return hash.get(obj) // 如果已经拷贝过，直接返回

    let copy = Array.isArray(obj) ? [] : {}
    hash.set(obj, copy) // 保存已拷贝的对象

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy(obj[key], hash)
        }
    }

    return copy;
}



const a = { name: "张三", age: 18 }
const b = deepCopy(a)
// const c = structuredClone(obj)
console.log(a === b);
// console.log(a == c);


//JavaScript中Object对象原型上的hasOwnProperty()用来判断一个属性是定义在对象本身而不是继承自原型链
// o = new Object();
// o.prop = 'exists';
// o.hasOwnProperty('prop');             // 返回 true
// o.hasOwnProperty('toString');         // 返回 false
// o.hasOwnProperty('hasOwnProperty');   // 返回 false

//因为javascript没有将hasOwnProperty作为一个敏感词，所以我们很有可能将对象的一个属性命名为hasOwnProperty，这样一来就无法再使用对象原型的 hasOwnProperty 方法来判断属性是否是来自原型链。不能使用 该对象.hasOwnProperty 这种方法，怎么来解决这个问题呢？我们需要使用原型链上真正的 hasOwnProperty 方法：
// Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
