// 函数节流
const throttle = (fn, interval = 500) => {
  let originFn = fn,
    isFirstTime = true,
    timer

  return function () {
    let args = arguments,
      that = this
    if (isFirstTime) {
      originFn.apply(that, args)
    }
    if (timer) {
      return false
    }
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      originFn.apply(that, args)
    }, interval)
  }
}