const checkLogicalOperator = (operator, value1, value2) => {
  switch (operator) {
    case 'and':
      return value1 && value2
    case 'or':
      return value1 || value2
    default:
      return false
  }
}

const compareValueLogic = (logics, fields, targetFieldValue, logicsVal) => {
  switch (logics.logic) {
    case 'equal':
      return checkEqualLogic(logics, fields, targetFieldValue, logicsVal)
    case 'not_equal':
      return checkNotEqualLogic(logics, fields, targetFieldValue, logicsVal)
    case 'null':
      return targetFieldValue && targetFieldValue.length === 0
    case 'not_null':
      return targetFieldValue && targetFieldValue.length > 0
    case 'contain':
      return checkContainLogic(logics, fields, targetFieldValue, logicsVal)
    case 'contain_all':
      return checkContainAllLogic(logics, fields, targetFieldValue, logicsVal)
    case 'not_contain':
      return checkNotContainLogic(logics, fields, targetFieldValue, logicsVal)
    case 'greater':
      return checkGreaterLogic(logics, fields, targetFieldValue, logicsVal)
    case 'less':
      return checkLessLogic(logics, fields, targetFieldValue, logicsVal)
    case 'greater_or_equal':
      return checkGreaterOrEqualLogic(logics, fields, targetFieldValue, logicsVal)
    case 'less_or_equal':
      return checkLessOrEqualLogic(logics, fields, targetFieldValue, logicsVal)
    case 'start_with':
      return checkStartWithLogic(logics, fields, targetFieldValue, logicsVal)
    case 'end_with':
      return checkEndWithLogic(logics, fields, targetFieldValue, logicsVal)
    case 'between':
      return checkBetweenLogic(logics, fields, targetFieldValue, logicsVal)
    default:
      return false
  }
}

const checkEqualLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!fields[logics.field].value) {
    return false
  }
  if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
    || targetFieldValue === 'check' || Array.isArray(targetFieldValue)
  ) {
    const fieldValue = Array.isArray(targetFieldValue)
      ? targetFieldValue
      : JSON.parse(targetFieldValue)
    const valueToCheck = logicsVal.split(',')
    let checker = 0
    fieldValue.forEach(fValue => {
      if (fieldValue.length > 0 && valueToCheck.indexOf(fValue) !== -1) {
        checker += 1
      }
    })
    return checker === valueToCheck.length && valueToCheck.length === fieldValue.length
  }
  return targetFieldValue === logicsVal
}

const checkNotEqualLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
    || targetFieldValue === 'check' || Array.isArray(targetFieldValue)
  ) {
    const fieldValue = Array.isArray(targetFieldValue)
      ? targetFieldValue
      : JSON.parse(targetFieldValue)
    const valueToCheck = logicsVal.split(',')
    if (fieldValue.length !== valueToCheck.length) {
      return true
    }
    let checker = 0
    valueToCheck.forEach(chkValue => {
      if (fieldValue.length > 0 && fieldValue.indexOf(chkValue) === -1) {
        checker += 1
      }
    })
    return valueToCheck.length === checker
  }
  return targetFieldValue !== logicsVal
}

const checkContainLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  const valueToCheck = logicsVal.split(',')
  let checker = 0
  if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
    || targetFieldValue === 'check' || Array.isArray(targetFieldValue)
  ) {
    const fieldValue = Array.isArray(targetFieldValue)
      ? targetFieldValue
      : JSON.parse(targetFieldValue)
    valueToCheck.forEach(singleToken => {
      if (fieldValue.length > 0 && fieldValue.indexOf(singleToken) !== -1) {
        checker += 1
      }
    })
    if (checker > 0) {
      return true
    }
    return false
  }
  valueToCheck.forEach(singleToken => {
    if (targetFieldValue.length > 0 && targetFieldValue.indexOf(singleToken) !== -1) {
      checker += 1
    }
  })
  return checker > 0
}

const checkContainAllLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  const valueToCheck = logicsVal.split(',')
  let checker = 0
  if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
    || targetFieldValue === 'check' || Array.isArray(targetFieldValue)
  ) {
    const fieldValue = Array.isArray(targetFieldValue)
      ? targetFieldValue
      : JSON.parse(targetFieldValue)
    valueToCheck.forEach(singleToken => {
      if (fieldValue.length > 0 && fieldValue.indexOf(singleToken) !== -1) {
        checker += 1
      }
    })
    if (checker >= valueToCheck.length) {
      return true
    }
    return false
  }
  return false
}

const checkNotContainLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  const valueToCheck = logicsVal.split(',')
  let checker = 0
  if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
    || targetFieldValue === 'check' || Array.isArray(targetFieldValue)
  ) {
    const fieldValue = Array.isArray(targetFieldValue)
      ? targetFieldValue
      : JSON.parse(targetFieldValue)
    valueToCheck.forEach(ckValue => {
      if (fieldValue.length > 0 && fieldValue.indexOf(ckValue) === -1) {
        checker += 1
      }
    })
    return checker === valueToCheck.length
  }
  valueToCheck.forEach(singleToken => {
    if (targetFieldValue.length > 0 && targetFieldValue.indexOf(singleToken) === -1) {
      checker += 1
    }
  })
  return checker === valueToCheck.length
}

const checkGreaterLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  if (fields[logics.field].type === 'number') {
    return targetFieldValue !== '' && Number(targetFieldValue) > Number(logicsVal)
  }
  return targetFieldValue !== '' && targetFieldValue > logicsVal
}

const checkLessLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  if (fields[logics.field].type === 'number') {
    return targetFieldValue !== '' && Number(targetFieldValue) < Number(logicsVal)
  }
  return targetFieldValue !== '' && targetFieldValue < logicsVal
}

const checkGreaterOrEqualLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  if (fields[logics.field].type === 'number') {
    return targetFieldValue !== '' && Number(targetFieldValue) >= Number(logicsVal)
  }
  return targetFieldValue !== '' && targetFieldValue >= logicsVal
}

const checkLessOrEqualLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  if (fields[logics.field].type === 'number') {
    return targetFieldValue !== '' && Number(targetFieldValue) <= Number(logicsVal)
  }
  return targetFieldValue !== '' && targetFieldValue <= logicsVal
}

const checkStartWithLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  return targetFieldValue !== '' && targetFieldValue.indexOf(logicsVal) === 0
}

const checkEndWithLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }
  return logicsVal === targetFieldValue.substr(targetFieldValue.length - logicsVal.length, targetFieldValue.length)
}

const checkBetweenLogic = (logics, fields, targetFieldValue, logicsVal) => {
  if (!targetFieldValue) {
    return false
  }

  let targetVal = targetFieldValue
  let minVal = logicsVal.min
  let maxVal = logicsVal.max
  if (fields[logics.field].type === 'number') {
    targetVal = Number(targetFieldValue)
    minVal = Number(logicsVal.min)
    maxVal = Number(logicsVal.max)
  }

  return targetVal >= minVal && targetVal <= maxVal
}

export const checkLogic = (logics, fields, props) => {
  if (Array.isArray(logics)) {
    let conditionStatus = false
    for (let lgcIndx = 0; lgcIndx < logics.length; lgcIndx += 1) {
      const lgc = logics[lgcIndx]
      if (typeof lgc !== 'string') {
        const isCondition = checkLogic(lgc, fields, props)
        if (lgcIndx === 0) {
          conditionStatus = isCondition
        }
        if (lgcIndx - 1 >= 0 && typeof logics[lgcIndx - 1] === 'string') {
          const operator = logics[lgcIndx - 1].toLowerCase()
          conditionStatus = checkLogicalOperator(operator, conditionStatus, isCondition)
        }
      }
    }
    return conditionStatus
  }

  const logicsVal = replaceWithField(logics.val, fields)
  const smartFields = Object.entries(props.smartTags).reduce((acc, [key, value]) => ({ ...acc, [`\${${key}${typeof value === 'string' ? '' : '()'}}`]: { value: typeof value === 'string' ? value : (value?.[logics?.smartKey] || ''), type: 'text', multiple: false } }), {})
  const flds = { ...fields, ...smartFields }
  if (flds[logics.field] !== undefined) {
    const targetFieldValue = flds[logics.field].value
    return compareValueLogic(logics, flds, targetFieldValue, logicsVal)
  }
  return false
}

export const replaceWithField = (stringToReplace, fieldValues) => {
  if (!stringToReplace) {
    return stringToReplace
  }
  let mutatedString
  if (typeof stringToReplace === 'object') {
    mutatedString = JSON.stringify(stringToReplace)
  } else {
    mutatedString = JSON.parse(JSON.stringify(stringToReplace))
  }
  if (typeof mutatedString !== 'string') {
    return stringToReplace
  }
  const matchedFields = mutatedString.match(/\${\w[^${}]*}/g)
  if (matchedFields) {
    matchedFields.map(field => {
      let fieldName = field
      if (!fieldValues[fieldName]) {
        fieldName = field.substring(2, field.length - 1)
      }
      if (fieldValues[fieldName]) {
        let val2Rplc = fieldValues[fieldName].value
        if (Array.isArray(fieldValues[fieldName].value) && !Number.isNaN(fieldValues[fieldName].value[0])) {
          val2Rplc = 0
          fieldValues[fieldName].value.map(sV => {
            val2Rplc += Number(sV)
          })
        }
        mutatedString = mutatedString.replace(field, val2Rplc)
      }
    })
  }

  return evalMathExpression(mutatedString)
}

export const evalMathExpression = (stringToReplace) => {
  if (!stringToReplace) {
    return stringToReplace
  }
  let mutatedString = stringToReplace
  const isMathEpr = stringToReplace.match(/[\\+\-\\*\\/\\%]/g)
  if (isMathEpr && isMathEpr.length > 0) {
    const mathEpr = stringToReplace.match(/\w+/g)
    if (!mathEpr) {
      return stringToReplace
    }
    const isInvalid = mathEpr.filter(v => Number.isNaN(v))
    if (isInvalid && isInvalid.length > 0) {
      return mutatedString
    }
    mutatedString = mutatedString.replace(/\{|\[/g, '(')
    mutatedString = mutatedString.replace(/\}|\]/g, ')')
    try {
      // eslint-disable-next-line no-new-func
      mutatedString = Function(`"use strict"; return (${mutatedString})`)()
    } catch (error) {
      return stringToReplace
    }
  }
  return mutatedString
}
