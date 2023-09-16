export default function scrollToFld(elm) {
  // Check if the element is inside a modal or scrollable div
  let parent = elm.parentElement

  while (parent) {
    const computedStyle = getComputedStyle(parent)

    // Check if the parent is an absolute positioned modal or a scrollable container
    if (
      computedStyle.position === 'absolute'
      || computedStyle.overflow === 'auto'
      || computedStyle.overflow === 'scroll'
    ) {
      if (!isElementInViewport(elm, parent)) {
        // Calculate the relative position of elm with respect to parent
        const rectElm = elm.getBoundingClientRect()
        const rectParent = parent.getBoundingClientRect()

        // Calculate the scroll offsets
        const scrollLeft = rectElm.left - rectParent.left + parent.scrollLeft
        const scrollTop = rectElm.top - rectParent.top + parent.scrollTop

        // Scroll to the element's position within the parent
        parent.scrollTo({
          top: scrollTop,
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }

    parent = parent.parentElement
  }

  // If no special parent found or the element is not already in the viewport, scroll the window to the element
  if (!isElementInViewport(elm, document.documentElement)) {
    elm.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }
}

function isElementInViewport(element, container) {
  const elementRect = element.getBoundingClientRect()
  const containerRect = container === document.documentElement
    ? { top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth }
    : container.getBoundingClientRect()

  return (
    elementRect.top >= containerRect.top
    && elementRect.left >= containerRect.left
    && elementRect.bottom <= containerRect.bottom
    && elementRect.right <= containerRect.right
  )
}
