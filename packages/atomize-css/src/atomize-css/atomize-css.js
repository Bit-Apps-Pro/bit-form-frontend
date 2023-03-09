import sortJson from 'sort-json'
import XRegExp from 'xregexp'
import deepCopy from './helpers/deepCopy'
import generateCssClass from './helpers/generateNewClassName'
import isSameSpeficity from './helpers/isSameSpeficity'

export function atomizeCss(
  stylesObj,
  { selectorSplitCount = 1,
    classPrefix = '',
    classSuffix = '',
    atomicClassStart } = {},
) {
  const selectorObj = sortJson(deepCopy(stylesObj))
  const atomicClasses = {}
  const classMaps = {}
  const classGen = generateCssClass({ start: atomicClassStart })
  const selectors = Object.keys(selectorObj)
  const selectorsCount = selectors.length
  for (let i = 0; i < selectorsCount; i += 1) {
    const selector = selectors[i]
    if (!Object.prototype.hasOwnProperty.call(selectorObj, selector)) continue
    const definations = selectorObj[selector]
    const props = Object.keys(definations)
    const propsCount = props.length

    for (let j = 0; j < propsCount; j += 1) {
      const prop = props[j]
      const value = definations[prop]
      if (!Object.prototype.hasOwnProperty.call(definations, prop)) continue
      const samePVSelectors = findSelectorBySamePropValue({
        targetSelectorSpeficity: selector,
        targetProp: prop,
        targetValue: value,
        selectorsObj: selectorObj,
      })
      if (samePVSelectors.length - 1 < selectorSplitCount) continue

      const atomicClass = findSelectorBySamePropValue({
        targetSelectorSpeficity: selector,
        targetProp: prop,
        targetValue: value,
        selectorsObj: atomicClasses,
        findOne: true,
      })

      if (atomicClass) {
        const atomicClassName = getFirstSelctorWithoutPseudo(atomicClass)
        samePVSelectors.forEach((selectr) => {
          const selectorWithoutPseudo = getFirstSelctorWithoutPseudo(selector)
          if (!classMaps[selectorWithoutPseudo]) {
            classMaps[selectorWithoutPseudo] = [atomicClassName]
          } else if (
            Array.isArray(classMaps[selectorWithoutPseudo])
            && classMaps[selectorWithoutPseudo].length
            && !classMaps[selectorWithoutPseudo].includes(atomicClassName)
          ) {
            classMaps[selectorWithoutPseudo].push(atomicClassName)
          }
          delete selectorObj[selectr][prop]
        })
        continue
      }

      const newAtomicClassName = classPrefix + classGen.next().value + classSuffix
      const newAtomicSelectorWithPseudo = `.${newAtomicClassName}${getSelctorPseudo(selector)}`

      atomicClasses[newAtomicSelectorWithPseudo] = { [prop]: value }

      samePVSelectors.forEach((selectr) => {
        const selectorWithoutPseudo = getFirstSelctorWithoutPseudo(selectr)
        if (!classMaps[selectorWithoutPseudo]) {
          classMaps[selectorWithoutPseudo] = [newAtomicClassName]
        } else if (
          Array.isArray(classMaps[selectorWithoutPseudo])
          && classMaps[selectorWithoutPseudo].length
          && !classMaps[selectorWithoutPseudo].includes(newAtomicClassName)
        ) {
          classMaps[selectorWithoutPseudo].push(newAtomicClassName)
        }
        delete selectorObj[selectr][prop]
      })
    }
  }

  // add atomic alias to all class for rest of styles
  const filteredSelectors = Object.keys(selectorObj)
  const filteredSelectorsCount = filteredSelectors.length
  for (let i = 0; i < filteredSelectorsCount; i += 1) {
    const slector = selectors[i]
    if (!Object.prototype.hasOwnProperty.call(selectorObj, slector)) continue
    const definations = selectorObj[slector]
    if (!Object.entries(definations).length) {
      delete selectorObj[slector]
      continue
    }
    const newAtomicClassName = classPrefix + classGen.next().value + classSuffix
    const newAtomicSelectorWithPseudo = `.${newAtomicClassName}${getSelctorPseudo(slector)}`
    atomicClasses[newAtomicSelectorWithPseudo] = definations
    const selectorWithoutPseudo = getFirstSelctorWithoutPseudo(slector)
    if (!classMaps[selectorWithoutPseudo]) {
      classMaps[selectorWithoutPseudo] = [newAtomicClassName]
    } else if (Array.isArray(classMaps[selectorWithoutPseudo])) {
      classMaps[selectorWithoutPseudo].push(newAtomicClassName)
    }
    delete selectorObj[selectorWithoutPseudo]
  }

  return {
    atomicClasses,
    classMaps,
    nextAtomicClass: classGen.next().value,
  }
}

export function findSelectorBySamePropValue({ targetSelectorSpeficity,
  targetProp,
  targetValue,
  selectorsObj,
  findOne = false,
  withSameSpeficity = true }) {
  const samePropValueSelectors = []
  const selectors = Object.keys(selectorsObj)
  const selectorsCount = selectors.length
  for (let i = 0; i < selectorsCount; i += 1) {
    const selector = selectors[i]
    if (!Object.prototype.hasOwnProperty.call(selectorsObj, selector)) continue
    if (withSameSpeficity && !isSameSpeficity(selector, targetSelectorSpeficity)) continue

    const definations = selectorsObj[selector]
    const props = Object.keys(definations)
    const propsCount = props.length
    for (let j = 0; j < propsCount; j += 1) {
      const prop = props[j]
      const value = definations[prop]
      if (!Object.prototype.hasOwnProperty.call(definations, prop)) continue
      if (targetProp === prop && targetValue === value) {
        if (findOne) return selector
        samePropValueSelectors.push(selector)
      }
    }
  }
  if (!samePropValueSelectors.length && findOne) return null
  return samePropValueSelectors
}

function getFirstSelctorWithoutPseudo(selector) {
  const firstSeparatorIndex = selector.match(XRegExp('(?<=.{2})(::|:|\\s|\\.|\\[|~|\\+)'))
    ?.index
  if (!firstSeparatorIndex) {
    return selector
  }
  return selector.slice(0, firstSeparatorIndex)
}

function getSelctorPseudo(selector) {
  const firstSeparatorIndex = selector.match(XRegExp('(?<=.{2})(::|:|\\s|\\.|\\[|~|\\+)'))
    ?.index
  if (!firstSeparatorIndex) {
    return ''
  }
  return selector.slice(firstSeparatorIndex, selector.length)
}
