export const checkLogic = (logics, fields) => {
  if (Array.isArray(logics)) {
    let conditionSatus = false;
    for (let sskey = 0; sskey < logics.length; sskey += 1) {
      const ssvalue = logics[sskey]
      if (typeof ssvalue !== 'string') {
        const isCondition = checkLogic(ssvalue, fields)
        if (sskey === 0) {
          conditionSatus = isCondition
        }
        /* if (isCondition && logics[sskey + 1] !== undefined && typeof logics[sskey + 1] === 'string' && logics[sskey + 1].toLowerCase() === 'or') {
          conditionSatus = isCondition
          break
        } */
        if (sskey - 1 >= 0 && typeof logics[sskey - 1] === 'string') {
          switch (logics[sskey - 1].toLowerCase()) {
            case 'or':
              conditionSatus = conditionSatus || isCondition
              break

            case 'and':
              conditionSatus = conditionSatus && isCondition
              break

            default:
              break
          }
        }
      }
    }
    return conditionSatus
  }
  if (fields[logics.field] !== undefined) {
    const logicsVal = replaceWithField(logics.val, fields)
    let { value } = fields[logics.field]
    if (typeof logicsVal === 'number') {
      value = parseInt(value, 10)
    }
    const targetFieldValue = value
    // console.log('logicsCC', logicsVal, typeof logicsVal, targetFieldValue, typeof fields[logics.field].value)
    switch (logics.logic) {
      case 'equal':
        if (!fields[logics.field].value) {
          return false
        }
        if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
          || targetFieldValue === 'check'
        ) {
          const fieldValue = Array.isArray(targetFieldValue)
            ? targetFieldValue
            : JSON.parse(targetFieldValue)
          const valueToCheck = logicsVal.split(',')
          let checker = 0
          fieldValue.forEach(value => {
            if (fieldValue.length > 0 && valueToCheck.indexOf(value) !== -1) {
              checker += 1
            }
          })
          if (checker === valueToCheck.length && valueToCheck.length === fieldValue.length) {
            return true
          }
          return false
        }
        return targetFieldValue === logicsVal

      case 'not_equal':
        if (!targetFieldValue) {
          return false
        }
        if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
          || targetFieldValue === 'check'
        ) {
          const fieldValue = Array.isArray(targetFieldValue)
            ? targetFieldValue
            : JSON.parse(targetFieldValue)
          const valueToCheck = logicsVal.split(',')
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue.indexOf(value) === -1) {
              return true
            }
          })
          return targetFieldValue !== logicsVal
        }
        return targetFieldValue !== logicsVal

      case 'null':
        return targetFieldValue.length === 0

      case 'not_null':
        return targetFieldValue.length > 0

      case 'contain':
        if (!targetFieldValue) {
          return false
        }
        if ((fields[logics.field].multiple !== undefined && fields[logics.field].multiple)
          || targetFieldValue === 'check'
        ) {
          const fieldValue = Array.isArray(targetFieldValue)
            ? targetFieldValue
            : JSON.parse(targetFieldValue)
          const valueToCheck = logicsVal.split(',')
          let checker = 0
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue.indexOf(value) !== -1) {
              checker += 1
            }
          })
          if (checker > 0) {
            return true
          }
          return false
        }
        return targetFieldValue !== '' && targetFieldValue.indexOf(logicsVal) !== -1

      case 'not_contain':
        if (!targetFieldValue) {
          return false
        }
        if ((fields[logics.field].multipletiple !== undefined && fields[logics.field].multipletiple)
          || targetFieldValue === 'check'
        ) {
          const fieldValue = Array.isArray(targetFieldValue)
            ? targetFieldValue
            : JSON.parse(targetFieldValue)
          const valueToCheck = logicsVal.split(',')
          let checker = 0
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue.indexOf(value) === -1) {
              checker += 1
            }
          })
          if (checker === valueToCheck.length) {
            return true
          }
          return false
        }
        return logicsVal.length > 0 && targetFieldValue.indexOf(logicsVal) === -1

      case 'greater':
        if (!targetFieldValue) {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return targetFieldValue !== '' && Number(targetFieldValue) > Number(logicsVal)
        }
        return targetFieldValue !== '' && targetFieldValue > logicsVal


      case 'less':
        if (!targetFieldValue) {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return targetFieldValue !== '' && Number(targetFieldValue) < Number(logicsVal)
        }
        return targetFieldValue !== '' && targetFieldValue < logicsVal


      case 'greater_or_equal':
        if (!targetFieldValue) {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return targetFieldValue !== '' && Number(targetFieldValue) >= Number(logicsVal)
        }
        return targetFieldValue !== '' && targetFieldValue >= logicsVal


      case 'less_or_equal':
        if (!targetFieldValue) {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return targetFieldValue !== '' && Number(targetFieldValue) <= Number(logicsVal)
        }
        return targetFieldValue !== '' && targetFieldValue <= logicsVal


      case 'start_with':
        if (!targetFieldValue) {
          return false
        }
        return targetFieldValue !== '' && targetFieldValue.indexOf(logicsVal) === 0

      case 'end_with':
        if (!targetFieldValue) {
          return false
        }
        return logicsVal === targetFieldValue.substr(targetFieldValue.length - logicsVal.length, targetFieldValue.length)


      default:
        return false
    }
  } else {
    return false
  }
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
      const fieldName = field.substring(2, field.length - 1)
      if (fieldValues[fieldName]) {
        mutatedString = mutatedString.replace(field, fieldValues[fieldName].value)
      }
    })
    mutatedString = evalMathExpression(mutatedString)
  }

  return mutatedString
}

export const evalMathExpression = (stringToReplace) => {
  if (!stringToReplace) {
    return stringToReplace
  }
  let mutatedString = stringToReplace
  const isMathEpr = stringToReplace.match(/[\+\-\*\/\%]/g)
  if (isMathEpr && isMathEpr.length > 0) {
    const mathEpr = stringToReplace.match(/\w+/g)
    if (!mathEpr) {
      return stringToReplace
    }
    const isInvalid = mathEpr.filter(v => isNaN(v))
    if (isInvalid && isInvalid.length > 0) {
      return mutatedString
    }
    mutatedString = mutatedString.replace(/\{|\[/g, '(')
    mutatedString = mutatedString.replace(/\}|\]/g, ')')
    try {
      mutatedString = Function(`"use strict";return (${mutatedString})`)()
    } catch (error) {
      console.log('errorMathexpr', error)
      return stringToReplace
    }
  }
  return mutatedString
}
