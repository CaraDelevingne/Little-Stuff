/* Proxy created on 2018-4-12 by cara */

// 读取数组负数索引
const createdArray = (...element) => {
  let handler = {
    get(target, key, proxy) {
      let index = +key
      if (index < 0) {
        key = `${target.length + index}`
      }
      return Reflect.get(target, key, proxy)
    }
  }

  let target = []
  target.push(...element)
  return new Proxy(target, handler)
}

let arr = createdArray('c', 'a', 'r', 'a')
console.log(arr[-2]) // 'r'

// 链式操作
const pipe = (() => {
  return (value) => {
    let funcStack = []
    const proxy = new Proxy({}, {
      get(target, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce((prev, curr) => {
            return curr(prev)
          }, value)
        }
        funcStack.push(calc[fnName])
        return proxy
      }
    })
    return proxy
  }
})()

const calc = {
  double(n) {
    return n * 2
  },
  pow(n) {
    return n * n
  }
}
console.log(pipe(3).double.pow.get) // 36