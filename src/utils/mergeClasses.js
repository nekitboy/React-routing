const mergeClasses = (...args) => {
  const classList = []
  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0]
  }
  args.forEach(className => {
    if (typeof className === 'string') {
      classList.push(className)
    }
  })
  return classList.join(' ')
}

export default mergeClasses
