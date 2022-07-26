import { expressAndCompressColors, expressCssVar, isCssColor } from './utils'

export default function expressAndCleanCssVars(cssVars) {
  const mixedCssVariables = { ...cssVars }
  const cleanCssVariables = {}
  const varNames = Object.keys(mixedCssVariables)
  const varNamesCount = varNames.length
  for (let i = 0; i < varNamesCount; i += 1) {
    const varName = varNames[i]
    if (Object.hasOwnProperty.call(mixedCssVariables, varName)) {
      let variableValue = mixedCssVariables[varName]
      if (typeof variableValue === 'number') variableValue = variableValue.toString()
      variableValue = variableValue.trim()
      variableValue = variableValue.replace(/\s{2,}/g, ' ') // replace multiple whitespace into single whitespace
      if (variableValue.includes('var')) {
        const { value: cssVarValue } = expressCssVar(variableValue, mixedCssVariables)
        variableValue = cssVarValue
      }
      // if hsla or rgb color then remove whitespace
      if (isCssColor(variableValue)) {
        variableValue = expressAndCompressColors(variableValue, mixedCssVariables)
        variableValue = variableValue
          .replace(/,\s+/g, ',')
          .replace(/\s+\)/g, ')')
          .replace(/\(\s+/g, '(')
      }
      if (variableValue[variableValue.length - 1] === ';') {
        variableValue = variableValue.substring(0, variableValue.length - 1)
      }
      const trimmedVarName = varName.trim()
      cleanCssVariables[trimmedVarName] = variableValue
    }
  }
  return cleanCssVariables
}
