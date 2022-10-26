/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import produce from 'immer'
import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import validateForm from '../../user-frontend/validation'
import { getAbsoluteElmHeight } from '../../Utils/FormBuilderHelper'
import { getCustomAttributes, getCustomClsName, observeElement, select, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'
import { assignNestedObj } from '../style-new/styleHelpers'

export default function TextArea({
  fieldKey, attr, onBlurHandler, resetFieldValue, formID, styleClasses, resizingFld,
}) {
  const [value, setValue] = useState(attr.val)
  const textAreaRef = useRef(null)
  const tempResize = useRef({ resize: false })
  const setStyles = useSetRecoilState($styles)

  useEffect(() => {
    if (resizingFld.fieldKey === fieldKey) {
      tempResize.current.resize = true
      const wrpElm = selectInGrid(`[data-key="${fieldKey}"]`)
      const currentWrpHeight = getAbsoluteElmHeight(wrpElm)
      if (resizingFld.wrpHeight < resizingFld.fldHeight) return
      const height = `${resizingFld.fldHeight + (currentWrpHeight - resizingFld.wrpHeight)}px`
      textAreaRef.current.style.height = height
    }

    if (tempResize.current.resize && !resizingFld.fieldKey) {
      tempResize.current.resize = false
      const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld->${cssProperty}`
      setStyles(prvStyle => produce(prvStyle, drftStyle => {
        assignNestedObj(drftStyle, getPropertyPath('height'), textAreaRef.current.style.height)
      }))
    }
  }, [resizingFld])

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
