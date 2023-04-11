//统计字符串出现次数
const repect = ["cat", "dog", "fish", "dog", "dog", "cat"].reduce(
  (total, name) => {
    //不存在在对象里添加此项初始值为1   存在就将此项值+1
    if (total[name]) {
      total[name]++
    } else {
      total[name] = 1
    }
    return total
  },
  {}
)
console.log(repect)
