// 缓存代理模式
const miniConsole = (function () {
  const cache = []

  const handler = (ev) => {
    if (ev.keyCode === 113) {
      cache.forEach((fn) => fn())
      document.removeEventListener('keydown', handler)
    }
  }

  document.addEventListener('keydown', handler)

  return {
    log() {
      const arg = arguments
      cache.push(() => {
        return console.log(Array.prototype.join.call(arg))
      })
    }
  }
})()

miniConsole.log(2)
miniConsole.log(5)