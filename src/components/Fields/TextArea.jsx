/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import produce from 'immer'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import validateForm from '../../user-frontend/validation'
import { getCustomAttributes, getCustomClsName, observeElement, select } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'
import { assignNestedObj, getNumFromStr } from '../style-new/styleHelpers'

export default function TextArea({
  fieldKey, attr, onBlurHandler, resetFieldValue, formID, styleClasses, resizingFld,
}) {
  const [value, setValue] = useState(attr.val)
  const areaRef = useRef(null)
  const tempResize = useRef({ resize: false })
  const setStyles = useSetRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const inputFldWrp = areaRef.current
  const fldWrp = inputFldWrp?.parentElement?.parentElement
  const lblWrp = fldWrp?.children[0]
  const labelWrpHeight = lblWrp?.offsetHeight
  const hlpTxt = inputFldWrp?.parentElement?.children[1]
  const hlpTxtHeight = hlpTxt?.offsetHeight || 0
  const fld = inputFldWrp?.children[0]
  const parentHight = getNumFromStr(fldWrp?.parentElement?.style.height) || 0
  let height = ''
  const convertStrToNum = (str) => Number(getNumFromStr(str)) || 0

  if (resizingFld.fieldKey === fieldKey) {
    tempResize.current.resize = true

    const fldSpacing = window.getComputedStyle(fld)
    const { paddingTop: fldWrpPaddingTop,
      paddingBottom: fldWrapPaddingBottom } = window.getComputedStyle(fldWrp) || {}
    let lblWrpSpacing = {}
    if (attr.lbl && themeVars['--fld-wrp-dis'] === 'block') {
      lblWrpSpacing = window.getComputedStyle(lblWrp)
      lblWrpSpacing.clientHeight = labelWrpHeight
    }
    let hlpTxtSpacing = {}
    if (attr.helperTxt || attr.hlpPreIcn || attr.hlpSufIcn) {
      hlpTxtSpacing = window.getComputedStyle(hlpTxt)
    }

    const removableSpace = (
      Number(lblWrpSpacing?.clientHeight || 0)
      + Number(hlpTxtHeight || 0)
      + convertStrToNum(fldWrpPaddingTop)
      + convertStrToNum(fldWrapPaddingBottom)
      + convertStrToNum(lblWrpSpacing?.marginTop)
      + convertStrToNum(lblWrpSpacing?.marginBottom)
      + convertStrToNum(lblWrpSpacing?.paddingTop)
      + convertStrToNum(lblWrpSpacing?.paddingBottom)
      + convertStrToNum(hlpTxtSpacing?.marginTop)
      + convertStrToNum(hlpTxtSpacing?.marginBottom)
      + convertStrToNum(hlpTxtSpacing?.paddingTop)
      + convertStrToNum(hlpTxtSpacing?.paddingBottom)
      + convertStrToNum(fldSpacing?.borderTopWidth)
      + convertStrToNum(fldSpacing?.borderBottomWidth)
      + convertStrToNum(fldSpacing?.marginTop)
      + convertStrToNum(fldSpacing?.marginBottom)
    )

    const fieldHeight = Math.ceil(Number(parentHight) - removableSpace)
    height = `${fieldHeight}px`
    inputFldWrp.children[0].style.height = height
  }
  if (tempResize.current.resize && !resizingFld.fieldKey) {
    tempResize.current.resize = false
    const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld->${cssProperty}`
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('height'), height)
    }))
  }

  const textAreaRef = useRef(null)
  useEffect(() => {
    if (attr.val !== undefined && !attr.userinput) {
      setValue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      setValue(attr.defaultValue || '')
    } else if (attr.conditional) {
      setValue(attr.val)
    }
  }, [attr.val, attr.defaultValue, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setValue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = textAreaRef
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeHandler = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    const textFld = select(`#${fieldKey}`)
    if (textFld) {
      observeElement(textFld, 'value', (oldVal, newVal) => setValue(newVal))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBlur = e => {
    validateForm({ input: e.target })
  }

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div
          ref={areaRef}
          data-testid={`${fieldKey}-inp-fld-wrp`}
          data-dev-inp-fld-wrp={fieldKey}
          className={`${fieldKey}-inp-fld-wrp ${getCustomClsName(fieldKey, 'inp-fld-wrp')}`}
          {...getCustomAttributes(fieldKey, 'inp-fld-wrp')}
        >
          <textarea
            data-testid={fieldKey}
            data-dev-fld={fieldKey}
            id={fieldKey}
            className={`${fieldKey}-fld ${getCustomClsName(fieldKey, 'fld')}`}
            // style={{ height: 'calc(100% - 30px)' }}
            {...getCustomAttributes(fieldKey, 'fld')}
            ref={textAreaRef}
            {...'disabled' in attr && { disabled: attr.disabled }}
            {...'readonly' in attr && { readOnly: attr.readonly }}
            {...'ph' in attr && { placeholder: attr.ph }}
            {...'ac' in attr && { autoComplete: attr.ac }}
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr.valid && { readOnly: attr.valid.disabled }}
            {...'name' in attr && { name: attr.name }}
            {...onBlurHandler && { onInput: onBlurHandler }}
            onBlur={handleBlur}
            {...{ value }}
            onChange={onChangeHandler}
          />
          {attr.prefixIcn && (
            <img
              data-dev-pre-i={fieldKey}
              className={`${fieldKey}-pre-i ${getCustomClsName(fieldKey, 'pre-i')}`}
              height="90%"
              src={attr.prefixIcn}
              alt=""
              {...getCustomAttributes(fieldKey, 'pre-i')}
            />
          )}
          {attr.suffixIcn && (
            <img
              data-dev-suf-i={fieldKey}
              className={`${fieldKey}-suf-i ${getCustomClsName(fieldKey, 'suf-i')}`}
              height="90%"
              src={attr.suffixIcn}
              alt=""
              {...getCustomAttributes(fieldKey, 'suf-i')}
            />
          )}
        </div>
      </InputWrapper>
    </>
  )
}
