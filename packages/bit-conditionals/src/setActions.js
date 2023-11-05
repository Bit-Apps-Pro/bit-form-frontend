import { isRepeatedField, replaceWithField } from './checkLogic'

let rowIndexClass = ''
let rowIndex = ''
const select = (contentId, selector) => document.querySelector(`#form-${contentId} ${rowIndexClass} ${selector}`)
const selectAll = (contentId, selector) => document.querySelectorAll(`#form-${contentId} ${rowIndexClass} ${selector}`)
const getInitPropertyName = (fldKey, props) => {
  const initFldKey = isRepeatedField(fldKey, props) ? `${fldKey}[${rowIndex}]` : fldKey
  if (props.inits && !props.inits[initFldKey]) return fldKey
  return initFldKey
}

const setFieldValue = (props, field, val) => {
  // setFieldValue(props.contentId, props.fields[actionDetail.field], actionValue)
  const { contentId } = props
  const fldData = props.fields[field]
  const { fieldName, typ } = fldData
  const inpType = fldData.inpType || ''

  if (typ === 'radio' || inpType === 'radio') {
    select(contentId, `input[name="${fieldName}"][value="${val}"]`).checked = true
    return
  }

  if (typ === 'check' || inpType === 'checkbox') {
    const regex = new RegExp(`,|${props.configs.bf_separator}`, 'g')
    const vals = val.split(regex)
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

  if (typ === 'rating') {
    const fldKey = getInitPropertyName(field, props)
    if (props.inits && props.inits[fldKey]) {
      props.inits[fldKey].value = val
    }
    return
  }

  const fld = select(contentId, `[name^='${fieldName}']`)
  if (fld.value === val) return
  fld.value = val
  fld.setAttribute('value', val)
}

const setActiveList = (actionDetail, props, fieldValues) => {
  const fldKey = getInitPropertyName(actionDetail.field, props)
  if (props.inits && props.inits[fldKey]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props, rowIndex) : ''
    props.inits[fldKey].activelist = actionValue
  }
}

const handleFormSaveDraft = (actionDetail, props) => {
  if (typeof saveFormProgress !== 'undefined') {
    saveFormProgress(props.contentId)
  }
}

const setDisabled = (fldKey, props, val) => {
  const fldData = props.fields[fldKey]
  const { fieldName, typ } = fldData
  const initPropKey = getInitPropertyName(fldKey, props)
  if (props.inits && props.inits[initPropKey]) {
    props.inits[initPropKey].disabled = val
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
  const initPropKey = getInitPropertyName(fldKey, props)
  if (props.inits && props.inits[initPropKey]) {
    props.inits[initPropKey].readonly = val
  } else {
    select(props.contentId, `.${fldKey}-fld`).readOnly = val
  }
}

const setActionValue = (actionDetail, props, fieldValues) => {
  const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props, rowIndex) : ''
  if (actionDetail.val !== undefined && props.fields[actionDetail.field]) {
    // setFieldValue(props.contentId, props.fields[actionDetail.field], actionValue)
    const actionDetlsFld = actionDetail.field
    setFieldValue(props, actionDetlsFld, actionValue)
  } else if (actionDetail.val !== undefined && actionDetail.field === '_bf_step_no') {
    if (props?.inits?.multi_step_form) props.inits.multi_step_form.step = actionValue
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

const setTextContent = (actionDetail, props, fieldValues) => {
  if (actionDetail.val !== undefined && props.fields[actionDetail.field]) {
    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues, props, rowIndex) : ''
    const fldKey = actionDetail.field
    const selector = select(props.contentId, `.${fldKey}-${actionDetail.action}`)
    if (selector === null) return
    selector.childNodes.forEach((node) => {
      if (node.nodeType === 3 && (node.textContent.trim() !== '' || !node.length)) {
        node.textContent = actionValue
      }
    })
    if (actionDetail.action === 'ct') selector.textContent = actionValue
    // selector.innerText = actionValue
  }
}

// eslint-disable-next-line import/prefer-default-export
export const setActions = (actionDetail, fldKey, props, fieldValues, rowIndx) => {
  rowIndex = rowIndx
  rowIndexClass = (rowIndx && isRepeatedField(actionDetail.field, props)) ? `.rpt-index-${rowIndx}` : ''
  if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
    if (actionDetail.field in props.fields && !props.fields[actionDetail.field].valid) {
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
      case 'writeable':
        if (props.fields[actionDetail.field]) {
          setReadonly(actionDetail.field, props, false)
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
      case 'save_draft':
        if (actionDetail.field === '_bf_form') {
          handleFormSaveDraft(actionDetail, props)
        }
        break
      case 'lbl':
      case 'ct':
      case 'sub-titl':
      case 'hlp-txt':
      case 'title':
        if (props.fields[actionDetail.field]) {
          setTextContent(actionDetail, props, fieldValues)
        }
        break
      default:
        break
    }
  }
}
