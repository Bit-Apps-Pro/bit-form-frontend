import { replaceWithField } from './checkLogic'

const setFieldValue = (fldKey, val) => {
  const fld = document.querySelector(`[name^='${fldKey}']`)
  if (fld.value === val) return
  fld.value = val
}

const setDisabled = (fldKey, props, val) => {
  if (props.inits && props.inits[fldKey]) {
    props.inits[fldKey].disabled = val
  } else {
    document.querySelector(`.${fldKey}-fld`).disabled = val
  }
}

const setReadonly = (fldKey, props, val) => {
  if (props.inits && props.inits[fldKey]) {
    props.inits[fldKey].readonly = val
  } else {
    document.querySelector(`.${fldKey}-fld`).readonly = val
  }
}

const setActionValue = (actionDetail, props, fieldValues) => {
  if (actionDetail.val !== undefined && props.fields[actionDetail.field]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props) : ''
    setFieldValue(props.fields[actionDetail.field].fieldName, actionValue)
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
          setDisabled(actionDetail.field, props, true)
        }
        break

      case 'readonly':
        if (props.fields[actionDetail.field]) {
          setReadonly(actionDetail.field, props, true)
        }
        break

      case 'enable':
        if (props.fields[actionDetail.field]) {
          setDisabled(actionDetail.field, props, false)
        }
        break

      case 'show':
        if (props.fields[actionDetail.field]) {
          return setActionHide(actionDetail, props, false)
        }
        break
      default:
        break
    }
  }
}
