// 观察者模式
const event = {
  clientList: [],
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments)
    const fns = this.clientList[key]

    if (!fns || fns.length === 0) return

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove(key, callback) {
    const fns = this.clientList[key]

    if (!fns) return
    if (!callback) {
      fns && (fns.length = 0)
    } else {
      fns.forEach((_fn, i) => {
        if (_fn === callback) {
          fns.splice(i, 1)
        }
      })
    }
  }
}

const installEvent = (obj) => {
  for (let i in event) {
    obj[i] = event[i]
  }
}

const salesOffices = {}
installEvent(salesOffices)

salesOffices.listen('squareMeter88', fn1 = (price) => console.log('price = ' + price))
salesOffices.listen('squareMeter88', fn2 = (price) => console.log('price2 = ' + price))
salesOffices.listen('squareMeter100', (price) => console.log('price = ' + price))

salesOffices.remove('squareMeter88', fn1)

salesOffices.trigger('squareMeter88', 20000)
salesOffices.trigger('squareMeter100', 30000)

event.listen('squareMeter100', (price) => console.log('price = ' + price))
event.trigger('squareMeter100', 40000)


// 全局观察者模式
const Event = (function () {
  let global = this,
    Event,
    _default = 'default'

  Event = function () {
    let _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCahche = {},
      _create,
      find,
      each = function (ary, fn) {
        var ret
        for (let i = 0, l = ary.length; i < l; i++) {
          let n = ary[i]
          ret = fn.call(n, i, n)
        }
        return ret
      }

    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }

    _trigger = function () {
      const cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        stack = cache[key]

      if (!stack || !stack.length) {
        return
      }

      return each(stack, function () {
        return this.apply(_self, args)
      })
    }

    _create = function (_namespace) {
      const namespace = _namespace || _default
      const cache = {}
      let offlineStack = [],
        ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache)

            if (offlineStack === null) {
              return
            }

            if (last === 'last') {
              offlineStack.length && offlineStack.pop()()
            } else {
              each(offlineStack, function () {
                this()
              })
            }

            offlineStack = null
          },
          trigger: function () {
            const _self = this
            let fn,
              args

            _unshift.call(arguments, cache)
            args = arguments
            fn = function () {
              return _trigger.apply(_self, args)
            }

            if (offlineStack) {
              return offlineStack.push(fn)
            }

            return fn()
          }
        }

      return namespace
        ? (namespaceCahche[namespace]
          ? namespaceCahche[namespace]
          : namespaceCahche[namespace] = ret
        )
        : ret
    }

    return {
      create: _create,
      listen: function (key, fn, last) {
        this.create().listen(key, fn, last)
      },
      trigger: function () {
      }
    }

  }()

  return Event
})()

Event.trigger('click', 1)
Event.listen('click', function (a) {
  console.log(a)
})