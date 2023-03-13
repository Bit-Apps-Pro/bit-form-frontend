function getFirstSelectorIndex(selector) {
  const firstDot = selector.startsWith('.')
  const newSelector = firstDot ? selector.slice(1) : selector
  const firstSeperator = newSelector.match(/^([^:\s.[~+]+)/)?.[0]
  if (!firstSeperator) {
    return 0
  }
  return firstDot ? firstSeperator.length + 1 : firstSeperator.length
}

export default function isSameSpeficity(selector1, selector2) {
  const firstSeparatorIndex = getFirstSelectorIndex(selector1)
  const secondSeparatorIndex = getFirstSelectorIndex(selector2)

  if (
    firstSeparatorIndex === undefined
    && firstSeparatorIndex === secondSeparatorIndex
    && selector1[0] === selector2[0]
  ) {
    return true
  }

  if (
    (!firstSeparatorIndex && secondSeparatorIndex)
    || (!secondSeparatorIndex && firstSeparatorIndex)
  ) {
    return false
  }

  const selector1Ext = selector1.slice(firstSeparatorIndex, selector1.length)
  const selector2Ext = selector2.slice(secondSeparatorIndex, selector2.length)

  return selector1Ext === selector2Ext
}
