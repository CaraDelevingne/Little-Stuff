/* 对象使用 for of 需要手动添加 @@iterator 属性, 
  而数组内置就有该属性
  2018.5.16
 */

let obj = {
  name: 'cara',
  age: 18
}

// 手动添加 iterator
Object.defineProperty(obj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    let o = this
    let idx = 0
    let ks = Object.keys(o)

    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

let it = obj[Symbol.iterator]()
console.log(it.next()) // { value: 'cara', done: false }
console.log(it.next()) // { value: 18, done: false }
console.log(it.next()) // { value: undefined, done: true }

for (let o of obj) {
  console.log(o) // cara 18
}

/* 普通对象则直接报错 */
// let normalObj = {
// 	a: '1',
// 	b: '2'
// }

// for (let o of normalObj) {
// 	console.log(o)
// }

const AUTH = {
  TRANSFER: 'transfer',
  VERIFY: 'verify',
  OPERATOR: 'operator'
}

const tactic = {
  'transfer'() {
    return 1
  },
  'verify'() {
    return 2
  },
  'operator'() {
    return 3
  }
}

const fn = () => {
  const { authority } = this.props.user
  let type
  if (authority.includes(AUTH.TRANSFER)) {
    type = AUTH.TRANSFER
  }
  if (authority.includes(AUTH.VERIFY)) {
    type = AUTH.VERIFY
  }
  if (authority.includes(AUTH.OPERATOR)) {
    type = AUTH.OPERATOR
  }
  this.setState({
    jurisdiction: tactic[type]
  })
}

