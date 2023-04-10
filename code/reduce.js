//统计字符串出现次数
const repect = ["cat", "dog", "fish", "dog", "dog", "cat"].reduce(
  (total, name) => {
    console.log(total[name])
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
