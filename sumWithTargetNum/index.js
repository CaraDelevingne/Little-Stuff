const testArray = [2, 11, 15, 7]
const target = 9

const sumIndexArr = (arr, target) => {
  let mapHash = {}
  let result = []
  let rest
  for (let i = 0, len = arr.length; i < len; i++) {
    rest = target - arr[i]
    if (mapHash[rest]) {
      result[0] = mapHash[rest]
      result[1] = i
      return result
    }
    mapHash[arr[i]] = i
  }
}

console.log(sumIndexArr(testArray, target)) // [0, 3] => 2 + 7 = 9