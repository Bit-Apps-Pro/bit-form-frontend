import { replaceWithField } from './checkLogic'

const setFieldValue = (fldKey, val) => {
  // first check if the field has same value
  const fld = document.querySelector(`.${fldKey}-fld`)
  if (fld.value === val) return
  fld.value = val
}

const setDisabled = (fldKey, val) => {
  document.querySelector(`.${fldKey}-fld`).disabled = val
}

const setActionValue = (actionDetail, props, fieldValues) => {
  if (actionDetail.val !== undefined && props.fields[actionDetail.field]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props) : ''
    setFieldValue(actionDetail.field, actionValue)
  }
}

const setActionHide = (actionDetail, props, val) => {
  if (props.fields[actionDetail.field]) {
    props.fields[actionDetail.field].valid.hide = val
  }
}

// eslint-disable-next-line import/prefer-default-export
export const setActions = (actionDetail, fldKey, props, fieldValues) => {
  if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
    if (!props.fields[actionDetail.field].valid) {
      props.fields[actionDetail.field].valid = {}
    }
    switch (actionDetail.action) {
      case 'value':
        return setActionValue(actionDetail, props, fieldValues)

      case 'hide':
        return setActionHide(actionDetail, props, true)

      case 'disable':
        if (props.fields[actionDetail.field]) {
          props.fields[actionDetail.field].valid.disabled = true
          setDisabled(actionDetail.field, true)
        }
        break

      case 'readonly':
        if (props.fields[actionDetail.field]) {
          props.fields[actionDetail.field].valid.readonly = true
        }
        break

      case 'enable':
        if (props.fields[actionDetail.field]) {
          props.fields[actionDetail.field].valid.disabled = false
          setDisabled(actionDetail.field, false)
        }
        break

      case 'show':
        if (props.fields[actionDetail.field]) {
          props.fields[actionDetail.field].valid.hide = false
          if (props.fields[actionDetail.field].typ === 'hidden') {
            props.fields[actionDetail.field].typ = 'text'
          }
        }
        break
      default:
        break
    }
  }
}
