export default function checkLogic(logics, fields) {
  if (Array.isArray(logics)) {
    let conditionSatus
    for (let sskey = 0; sskey < logics.length; sskey += 1) {
      const ssvalue = logics[sskey]
      if (typeof ssvalue !== 'string') {
        const isCondition = checkLogic(ssvalue, fields)
        if (sskey === 0) {
          conditionSatus = isCondition
        }
        if (isCondition && logics[sskey + 1] !== undefined && typeof logics[sskey + 1] === 'string' && logics[sskey + 1].toLowerCase() === 'or') {
          conditionSatus = isCondition
          break
        }
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
    switch (logics.logic) {
      case 'equal':
        if (fields[logics.field].value === '') {
          return false
        }
        if ((fields[logics.field].mul !== undefined && fields[logics.field].mul)
                    || fields[logics.field].value === 'check'
        ) {
          const fieldValue = Array.isArray(fields[logics.field].value)
            ? fields[logics.field].value
            : JSON.parse(fields[logics.field].value)
          const valueToCheck = logics.val.split(',')
          let checker = 0
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue[value] !== undefined) {
              checker += 1
            }
          })
          if (checker === valueToCheck.length) {
            return true
          }
          return false
        }
        return fields[logics.field].value === logics.val

      case 'not_equal':
        if (fields[logics.field].value === '') {
          return false
        }
        if ((fields[logics.field].mul !== undefined && fields[logics.field].mul)
                    || fields[logics.field].value === 'check'
        ) {
          const fieldValue = Array.isArray(fields[logics.field].value)
            ? fields[logics.field].value
            : JSON.parse(fields[logics.field].value)
          const valueToCheck = logics.val.split(',')
          valueToCheck.forEach(value => {
            if (fieldValue[value] === undefined) {
              return false
            }
          })
          return fields[logics.field].value !== logics.val
        }
        return fields[logics.field].value !== logics.val

      case 'null':
        return fields[logics.field].value.length === 0

      case 'not_null':
        return fields[logics.field].value.length > 0

      case 'contain':
        if (fields[logics.field].value === '') {
          return false
        }
        if ((fields[logics.field].mul !== undefined && fields[logics.field].mul)
                    || fields[logics.field].value === 'check'
        ) {
          const fieldValue = Array.isArray(fields[logics.field].value)
            ? fields[logics.field].value
            : JSON.parse(fields[logics.field].value)
          const valueToCheck = logics.val.split(',')
          let checker = 0
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue[value] !== undefined) {
              checker += 1
            }
          })
          if (checker > 0) {
            return true
          }
          return false
        }
        return fields[logics.field].value !== '' && fields[logics.field].value.indexOf(logics.val) !== -1

      case 'not_contain':
        if (fields[logics.field].value === '') {
          return false
        }
        if ((fields[logics.field].mul !== undefined && fields[logics.field].mul)
                    || fields[logics.field].value === 'check'
        ) {
          const fieldValue = Array.isArray(fields[logics.field].value)
            ? fields[logics.field].value
            : JSON.parse(fields[logics.field].value)
          const valueToCheck = logics.val.split(',')
          let checker = 0
          valueToCheck.forEach(value => {
            if (fieldValue.length > 0 && fieldValue[value] === undefined) {
              checker += 1
            }
          })
          if (checker === valueToCheck.length) {
            return true
          }
          return false
        }
        return logics.val.length > 0 && fields[logics.field].value.indexOf(logics.val) !== -1

      case 'greater':
        if (fields[logics.field].value === '') {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return fields[logics.field].value !== '' && Number(fields[logics.field].value) > Number(logics.val)
        }
        return fields[logics.field].value !== '' && fields[logics.field].value > logics.val


      case 'less':
        if (fields[logics.field].value === '') {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return fields[logics.field].value !== '' && Number(fields[logics.field].value) < Number(logics.val)
        }
        return fields[logics.field].value !== '' && fields[logics.field].value < logics.val


      case 'greater_or_equal':
        if (fields[logics.field].value === '') {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return fields[logics.field].value !== '' && Number(fields[logics.field].value) >= Number(logics.val)
        }
        return fields[logics.field].value !== '' && fields[logics.field].value >= logics.val


      case 'less_or_equal':
        if (fields[logics.field].value === '') {
          return false
        }
        if (fields[logics.field].type === 'number') {
          return fields[logics.field].value !== '' && Number(fields[logics.field].value) <= Number(logics.val)
        }
        return fields[logics.field].value !== '' && fields[logics.field].value <= logics.val


      case 'start_with':
        if (fields[logics.field].value === '') {
          return false
        }
        return fields[logics.field].value !== '' && fields[logics.field].value.indexOf(logics.val) === 0

      case 'end_with':
        if (fields[logics.field].value === '') {
          return false
        }
        return logics.val === fields[logics.field].value.substr(fields[logics.field].value.length - logics.val.length, fields[logics.field].value.length)


      default:
        return false
    }
  } else {
    return false
  }
}
