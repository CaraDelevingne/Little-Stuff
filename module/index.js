/* 2018-4-9 */

// 管理器
const MyModules = (function Manager() {
  var modules = {}
  var defind = function (name, deps, impl) {
    console.log(name + ' : ' + deps)
    for (let i = 0; i < deps.length; i++) {
      console.log(name + ' : ' + i + ' : ' + deps[i])
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(null, deps)
  }
  var get = function (name) {
    return modules[name]
  }

  return {
    defind,
    get
  }
})()

// 定义模块
MyModules.defind('bar', [], function () {
  function hello(who) {
    return 'Let me introduce ' + who
  }
  return {
    hello
  }
})

MyModules.defind('foo', ['bar'], function (bar) {
  var hungry = 'hippo'

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase())
  }
  return {
    awesome
  }
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(bar.hello('cara'))

foo.awesome()