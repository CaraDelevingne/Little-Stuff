// 展开多维数组
const twoDimensionalArray = [
  [32, 1, 14, 55, 12],
  [44, 23, 54, 11, 23, 65],
  [6, 43, 76, 23, 2],
  [10, [2, 3]]
]

// 常规方法
const flattenArray = function(array) {
  if (!array || !(array instanceof Array)) return
  const results = []
  return function(array) {
    array.map(item => {
      item instanceof Array
        ? arguments.callee(item)
        : results.push(item)
    })
    return results
  }(array)
}

console.log(flattenArray(twoDimensionalArray))

// contact 方法
const concatArray = (array) => {
  let results = []
  array.map(item => {
    if (item instanceof Array) {
      results = results.concat(concatArray(item))
    } else {
      results.push(item)
    }
  })
  return results
}

console.log(concatArray(twoDimensionalArray))

// 归并方法
const flatten = arr => {
  return arr.reduce((prev, value) =>
    prev.concat(Array.isArray(value) ? flatten(value) : value), [])
}
console.log(flatten(twoDimensionalArray))