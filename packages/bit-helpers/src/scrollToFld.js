export default function scrollToFld(elm) {
  const ancestor = findScrollableAncestor(elm)
  const scrollWindow = ancestor || window
  const scrollBody = ancestor || document.body
  const elmRect = elm.getBoundingClientRect()
  const scrollElementRect = scrollBody.getBoundingClientRect()
  const scrollTop = scrollElementRect.top
  const elmTop = elmRect.top + (ancestor ? scrollBody.scrollTop : 0)
  const offsetTop = elmTop - scrollTop
  if (isInViewport(elm, scrollBody)) return
  scrollWindow.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  })
}

function isInViewport(element, parent) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (parent.innnrHeight || parent.clientHeight)
    && rect.right <= (parent.innnrWidth || parent.clientWidth)
  )
}

function hasScrollBar(el) {
  const dir = 'scrollTop'
  const elm = el
  let result = !!elm[dir]

  if (!result) {
    elm[dir] = 1
    result = !!elm[dir]
    elm[dir] = 0
  }
  return result
}

function findScrollableAncestor(elm) {
  let parent = elm.parentNode

  while (parent !== null && parent !== document.body) {
    if (hasScrollBar(parent)) {
      return parent
    }

    parent = parent.parentNode
  }

  return null
}
