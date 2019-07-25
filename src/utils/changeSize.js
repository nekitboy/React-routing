function sizeChangeEventEmittable (elem, trrottle = 0) {
  let { width, height } = elem.getBoundingClientRect()

  let timestamp = 0
  let _raf = null

  const rafFunction = (curTimestamp) => {
    if (curTimestamp - timestamp > trrottle) {
      timestamp = curTimestamp
      const { width: curWidth, height: curHeight } = elem.getBoundingClientRect()
      if (curWidth !== width || curHeight !== height) {
        width = curWidth
        height = curHeight

        elem.dispatchEvent(new CustomEvent('sizechange', { detail: { width, height } }))
      }
    }
    _raf = requestAnimationFrame(rafFunction)
  }

  _raf = requestAnimationFrame(rafFunction)

  return () => {
    cancelAnimationFrame(_raf)
  }
}

export default sizeChangeEventEmittable
