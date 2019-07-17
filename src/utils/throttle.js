export const timeoutThrottle = (func, ms) => {
  let timeout = null

  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...arguments)
        timeout = null
      }, ms)
    }
  }
}
