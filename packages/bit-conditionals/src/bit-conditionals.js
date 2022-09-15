import { checkLogic } from './checkLogic'
import { setActions } from './setActions'

const getFieldKeyByFldName = (fldName, fields) => {
  const fieldKey = Object.keys(fields).find(key => fields[key].fieldName === fldName)
  return fieldKey
}

export default function onBlurHandler(event) {
  if (!event?.target?.form) {
    return
  }

  let maybeReset = false
  let isInteracted = false
  const dataToSet = []
  let element
  let form
  if (event.target) {
    element = event.target
    form = event.target.form
    isInteracted = true
  } else {
    element = event
    if (element.type === 'dropdown' && element.userinput) {
      isInteracted = true
    }
    form = document.getElementById(`form-${props.contentID}`)
  }
  const contentId = form.id.slice(event.target.id.indexOf('-') + 1)
  const props = window.bf_globals[contentId]

  const newData = JSON.parse(JSON.stringify(props.fields))
  // if (resetFieldValue) {
  //   setresetFieldValue(false)
  // }
  let targetFieldName
  const fieldValues = []
  const fieldNameToQuery = element.name
  if (element.name && element.name.indexOf('[]') !== -1 && element.name.indexOf('[]') === element.name.length - 2) {
    targetFieldName = element.name.substring(0, element.name.length - 2)
  } else {
    targetFieldName = element.name
  }
  if (newData[props.fieldsKey[targetFieldName]] && newData[props.fieldsKey[targetFieldName]].error) {
    delete newData[props.fieldsKey[targetFieldName]].error
    dataToSet[props.fieldsKey[targetFieldName]] = newData[props.fieldsKey[targetFieldName]]
    maybeReset = true
  }
  if (newData[props.fieldsKey[targetFieldName]] && !newData[props.fieldsKey[targetFieldName]].userinput && isInteracted) {
    newData[props.fieldsKey[targetFieldName]].userinput = isInteracted
    dataToSet[props.fieldsKey[targetFieldName]] = newData[props.fieldsKey[targetFieldName]]
    maybeReset = true
  }

  Object.keys(props.fields).forEach(fldKey => {
    const { fieldName } = props.fields[fldKey]
    let currentField
    if (targetFieldName === fieldName) {
      currentField = fieldNameToQuery
    } else {
      currentField = fieldName
    }
    const fieldDetails = form.querySelectorAll(`[name^='${currentField}']`)
    // const fieldDetails = document.getElementsByName(currentField)
    if (fieldDetails.length > 0) {
      let value
      let multiple
      let { type } = fieldDetails[0]
      if (fieldDetails[0].name === element.name && type !== 'checkbox') {
        value = element.value
        multiple = element.multiple
        type = element.type
      } else if (type === 'checkbox' || type === 'select-multiple' || type === 'select-one' || type === 'radio') {
        switch (type) {
          case 'checkbox':
            // eslint-disable-next-line no-case-declarations
            const checkedValue = []
            fieldDetails.forEach(option => {
              option.checked && option.value && checkedValue.push(option.value)
            })
            value = checkedValue
            multiple = true
            break

          case 'select-multiple':
            // eslint-disable-next-line no-case-declarations
            const selectedValue = []
            if (fieldDetails[0].slim) {
              fieldDetails[0].slim.data.data.forEach((option => {
                option.selected && option.value && selectedValue.push(option.value)
              }))
            } else {
              fieldDetails[0].childNodes.forEach((option => {
                option.selected && option.value && selectedValue.push(option.value)
              }))
            }
            value = selectedValue
            multiple = true
            break

          case 'select-one':
            value = fieldDetails[0].value
            break

          case 'radio':
            fieldDetails.forEach(option => {
              if (option.checked && option.value) value = option.value
            })
            break

          default:
            break
        }
      } else if (fieldDetails[0].type === 'hidden' && fieldDetails[0].value && fieldDetails[0].nextElementSibling && fieldDetails[0].nextElementSibling.hasAttribute('data-msl')) {
        value = fieldDetails[0].value.split(',')
        multiple = value && value.length > 0
      } else {
        value = fieldDetails[0].value
        multiple = fieldDetails[0].multiple
      }
      fieldValues[fieldName] = {
        type,
        value,
        multiple,
      }
    }
  })

  const fldKey = getFieldKeyByFldName(targetFieldName, props.fields)

  if (!fldKey) return

  const conditionsStatus = []

  const { onfieldCondition } = props

  if (!onfieldCondition) return

  const oninputConds = onfieldCondition.filter(cond => cond.event_type === 'on_input')

  const oninputCondsForField = oninputConds.filter(cond => cond.conditions.some(c => c?.logics?.some(lgc => lgc.field === fldKey)))

  if (!oninputCondsForField.length) return

  oninputCondsForField.forEach((workflow, workflowIndx) => {
    const { conditions } = workflow
    for (let condIndx = 0; condIndx < conditions.length; condIndx += 1) {
      const condition = conditions[condIndx]
      let logicStatus = false
      if (['if', 'else-if'].includes(condition.cond_type)) {
        const { logics } = condition
        logicStatus = checkLogic(logics, fieldValues, props)
        if (logicStatus) {
          conditionsStatus.push({ workflowIndx, condIndx, logicStatus: logicStatus ? 1 : 0 })
          break
        }
      }
      conditionsStatus.push({ workflowIndx, condIndx, logicStatus: logicStatus ? 1 : 0 })
    }
  })

  const alreadySetActions = {}

  conditionsStatus.reverse()

  conditionsStatus.forEach(({ workflowIndx, condIndx, logicStatus }) => {
    const { conditions } = oninputCondsForField[workflowIndx]
    const elseActions = conditions.find(cond => cond.cond_type === 'else') || {}
    const condActions = logicStatus ? conditions[condIndx].actions : elseActions.actions

    condActions?.fields?.forEach(actionDetail => {
      if (!alreadySetActions[actionDetail.field]) {
        alreadySetActions[actionDetail.field] = []
      }
      if (!alreadySetActions[actionDetail.field].includes(actionDetail.action)) {
        alreadySetActions[actionDetail.field].push(actionDetail.action)
        setActions(actionDetail, fldKey, props, fieldValues)
      }
    })
  })
}
