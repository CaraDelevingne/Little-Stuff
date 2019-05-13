// 传入参数 n, m; 将 n - 1 平均分成 m 个组


// function dispatch (n, m) {
// 	let arr = [];
// 	for (let i = 0; i < m; i++) {
// 		arr[i] = []
// 	}
// 	for (let i = 1, k = 0; i <= n; i++, k = (k + 1) % m) {
// 		arr[k].push(i)
// 	}
// 	return arr
// }

const dispatch = (n, m) => {
  let restCount = n % m
  let leastCount = Math.floor(n / m)
  let result = []
  let allArr = new Array(n).fill(1).map((i, index) => index)
  for (let i = 0; i < (m - restCount) * leastCount; i += leastCount) {
      result.push(allArr.slice(i, i + leastCount))
  }
  for (let j = (m - restCount) * leastCount; j < n; j += leastCount + 1) {
      result.push(allArr.slice(j, j + leastCount + 1))
  }
  return result
}
// console.log(dispatch(5, 2))
// console.log(dispatch(10, 6))
console.log(dispatch(20, 9))
// console:
// [ [ 0, 1 ],
//   [ 2, 3 ],
//   [ 4, 5 ],
//   [ 6, 7 ],
//   [ 8, 9 ],
//   [ 10, 11 ],
//   [ 12, 13 ],
//   [ 14, 15, 16 ],
//   [ 17, 18, 19 ] ]