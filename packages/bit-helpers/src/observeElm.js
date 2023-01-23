export default function observeElm(element, property, callback, delay = 0) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === property) {
        const { oldValue } = mutation
        const newValue = mutation.target[property]
        if (typeof callback === 'function') {
          setTimeout(callback.call(this, oldValue, newValue), delay)
        }
      }
    })
  })
  const config = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [property],
  }
  observer.observe(element, config)
  return observer
}
