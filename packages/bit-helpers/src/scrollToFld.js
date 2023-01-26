export default function scrollToFld(elm) {
  const bodyRect = document.body.getBoundingClientRect()
  const fldRect = elm.getBoundingClientRect()
  const offsetTop = fldRect.top - bodyRect.top
  if (!isElementInViewport(elm)) window.scroll({ top: offsetTop, behavior: 'smooth' })
}

const isElementInViewport = elm => {
  const rect = elm.getBoundingClientRect()
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
