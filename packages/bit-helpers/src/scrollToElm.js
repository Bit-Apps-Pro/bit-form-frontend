function debounce(func, delay) {
  let timer
  const debouncedFunction = function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }

  debouncedFunction.cancel = function () {
    clearTimeout(timer)
  }

  return debouncedFunction
}

function isInViewport(element, threshold = 10) {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= threshold
    && rect.left >= threshold
    && rect.bottom <= windowHeight - threshold
    && rect.right <= windowWidth - threshold
  )
}

function scrollToParentIfNeeded(element) {
  let parent = element.parentElement
  while (parent && parent !== document.body) {
    if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) {
      parent.scrollIntoView({ behavior: 'smooth' })
      break
    }
    parent = parent.parentElement
  }
}

const internalScrollToElm = function (elm) {
  if (!isInViewport(elm)) {
    scrollToParentIfNeeded(elm)
    elm.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }
}

const debouncedScrollToElm = debounce(internalScrollToElm, 300)

export default function scrollToElement(elm, { immediate = false } = {}) {
  debouncedScrollToElm.cancel()

  if (immediate) {
    internalScrollToElm(elm)
  } else {
    debouncedScrollToElm(elm)
  }
}
