export default function isSameSpeficity(selector1, selector2) {
  const firstSeparatorIndex = selector1.match(/(?<=.{2})(::|:|\s|\.|\[|~|\+)/)
    ?.index
  const secondSeparatorIndex = selector2.match(/(?<=.{2})(::|:|\s|\.|\[|~|\+)/)
    ?.index

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
