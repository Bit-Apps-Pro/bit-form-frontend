import { replaceWithField } from './checkLogic'

const select = (contentId, selector) => document.querySelector(`#form-${contentId} ${selector}`)
const selectAll = (contentId, selector) => document.querySelectorAll(`#form-${contentId} ${selector}`)

const setFieldValue = (contentId, fldData, val) => {
  const { fieldName, typ } = fldData
  if (typ === 'radio') {
    select(contentId, `input[name="${fieldName}"][value="${val}"]`).checked = true
    return
  }

  if (typ === 'check') {
    const vals = val.split(',')
    selectAll(contentId, `input[name="${fieldName}[]"]`).forEach((el) => {
      el.checked = vals.includes(el.value)
    })
    return
  }

  if (typ === 'decision-box') {
    const fld = select(contentId, `input[name="${fieldName}"]`)
    if (fld) {
      fld.checked = val === fldData.msg.checked
    }
    return
  }

  const fld = select(contentId, `[name^='${fieldName}']`)
  if (fld.value === val) return
  fld.value = val
  fld.setAttribute('value', val)
}

const setActiveList = (actionDetail, props, fieldValues) => {
  const fldKey = actionDetail.field
  if (props.inits && props.inits[fldKey]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props) : ''
    props.inits[fldKey].activelist = actionValue
  }
}

const setDisabled = (fldKey, props, val) => {
  const fldData = props.fields[fldKey]
  const { fieldName, typ } = fldData
  if (props.inits && props.inits[fldKey]) {
    props.inits[fldKey].disabled = val
  } else {
    if (typ === 'check') {
      selectAll(props.contentId, `input[name="${fieldName}[]"]`).forEach((el) => {
        el.disabled = val
      })
      return
    }
    if (typ === 'radio') {
      selectAll(props.contentId, `input[name="${fieldName}"]`).forEach((el) => {
        el.disabled = val
      })
      return
    }
    if (typ === 'decision-box') {
      const fld = select(props.contentId, `input[name="${fieldName}"]`)
      if (fld) {
        fld.disabled = val
      }
      return
    }
    if (typ === 'button') {
      select(props.contentId, `.${fldKey}-btn`).disabled = val
      return
    }
    select(props.contentId, `.${fldKey}-fld`).disabled = val
  }
}

const setReadonly = (fldKey, props, val) => {
  if (props.inits && props.inits[fldKey]) {
    props.inits[fldKey].readonly = val
  } else {
    select(props.contentId, `.${fldKey}-fld`).readonly = val
  }
}

const setActionValue = (actionDetail, props, fieldValues) => {
  if (actionDetail.val !== undefined && props.fields[actionDetail.field]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props) : ''
    setFieldValue(props.contentId, props.fields[actionDetail.field], actionValue)
  }
}

const getHeight = (selector) => {
  const fld = window.getComputedStyle(selector)
  let heightCount = 0
  if (fld.boxSizing === 'border-box') {
    heightCount = selector.scrollHeight
  } else {
    heightCount = (
      parseInt(fld.paddingTop)
      + parseInt(fld.paddingBottom)
      + selector.scrollHeight
      + parseInt(fld.marginTop)
      + parseInt(fld.marginBottom)
      + parseInt(fld.borderTopWidth)
      + parseInt(fld.borderBottomWidth)
    )
  }
  return heightCount
}

const setActionHide = (actionDetail, props, val) => {
  if (props.fields[actionDetail.field]) {
    props.fields[actionDetail.field].valid.hide = val
    const fldKey = actionDetail.field

    const selector = select(props.contentId, `.btcd-fld-itm.${fldKey}`)
    let heightCount = getHeight(selector)
    setStyleProperty(selector, 'height', `${heightCount}px`)
    if (val) {
      setStyleProperty(selector, 'height', '0px')
      selector.classList.add('fld-hide')
    } else {
      selector.classList.remove('fld-hide')
      heightCount = getHeight(selector)
      setStyleProperty(selector, 'height', `${heightCount}px`)
    }
    setTimeout(() => {
      selector.style.removeProperty('height')
    }, 300)
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

      case 'activelist':
        if (props.fields[actionDetail.field]) {
          setActiveList(actionDetail, props, fieldValues)
        }
        break
      default:
        break
    }
  }
}
