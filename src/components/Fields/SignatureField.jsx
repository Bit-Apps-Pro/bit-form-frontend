/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import BitSignatureField from 'bit-signature-field/src/bit-signature-field'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function SignatureField({ fieldKey, attr, formID, styleClasses }) {
  const signatureFldRef = useRef(null)
  const signatureElemnRef = useRef(null)

  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]

  // if (resizingFld.fieldKey === fieldKey) {
  //   tempResize.current.resize = true
  //   const wrpElm = selectInGrid(`[data-key="${fieldKey}"]`)
  //   const currentWrpHeight = getAbsoluteElmHeight(wrpElm)

  //   if (resizingFld.wrpHeight >= resizingFld.fldHeight) {
  //     const height = `${resizingFld.fldHeight + (currentWrpHeight - resizingFld.wrpHeight)}px`
  //     console.log('height', height)
  //     signatureFldRef.current.style.height = height
  //   }
  // }

  // if (tempResize.current.resize && !resizingFld.fieldKey) {
  //   tempResize.current.resize = false
  //   const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-signature->${cssProperty}`
  //   setStyles(prvStyle => create(prvStyle, drftStyle => {
  //     assignNestedObj(drftStyle, getPropertyPath('height'), signatureFldRef.current.style.height)
  //   }))
  // }

  useEffect(() => {
    if (!signatureElemnRef.current) {
      signatureElemnRef.current = selectInGrid(`.${fieldKey}-signature-pad`)
    }

    const fldConstructor = signatureFldRef.current
    const fldElm = signatureElemnRef.current

    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }
    const { maxWidth, penColor, backgroundColor } = fieldData.config
    const config = {
      maxWidth,
      penColor,
      backgroundColor,
      document: document.getElementById('bit-grid-layout')?.contentDocument,
      fieldKey,
    }
    signatureFldRef.current = new BitSignatureField(fldElm, config)
  }, [fieldData])

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
          <canvas
            ref={signatureFldRef}
            className={`${fieldKey}-signature-pad ${getCustomClsName(fieldKey, 'signature')}`}
            id="canvas"
            {...getCustomAttributes(fieldKey, 'signature-pad')}
            data-testid={`${fieldKey}-signature-pad`}
            data-dev-signature-pad={fieldKey}
          />

          <div className={`${fieldKey}-ctrl`}>
            {!fieldData?.clrBtnHide && (
              <button
                id="clear"
                className={`${fieldKey}-clr-btn`}
                type="button"
                data-testid={`${fieldKey}-clr-btn`}
                data-dev-clr-btn={fieldKey}
              >
                {fieldData.clrPreIcn && (
                  <img
                    data-testid={`${fieldKey}-clr-btn-pre-i`}
                    data-dev-clr-btn-pre-i={fieldKey}
                    className={`${fieldKey}-clr-btn-pre-i ${getCustomClsName(fieldKey, 'clr-btn-pre-i')}`}
                    src={fieldData.clrPreIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'clr-btn-pre-i')}
                  />
                )}
                {fieldData.clrBtn}
                {fieldData.clrSufIcn && (
                  <img
                    data-testid={`${fieldKey}-clr-btn-suf-i`}
                    data-dev-clr-btn-suf-i={fieldKey}
                    className={`${fieldKey}-clr-btn-suf-i ${getCustomClsName(fieldKey, 'clr-btn-suf-i')}`}
                    src={fieldData.clrSufIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'clr-btn-suf-i')}
                  />
                )}
              </button>
            )}
            {!fieldData?.undoBtnHide && (
              <button
                id="undo"
                className={`${fieldKey}-undo-btn`}
                type="button"
                data-testid={`${fieldKey}-undo-btn`}
                data-dev-undo-btn={fieldKey}
              >
                {fieldData?.undoPreIcn && (
                  <img
                    data-testid={`${fieldKey}-undo-btn-pre-i`}
                    data-dev-undo-btn-pre-i={fieldKey}
                    className={`${fieldKey}-undo-btn-pre-i ${getCustomClsName(fieldKey, 'undo-btn-pre-i')}`}
                    src={fieldData.undoPreIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'undo-btn-pre-i')}
                  />
                )}
                {fieldData.undoBtn}
                {fieldData?.undoSufIcn && (
                  <img
                    data-testid={`${fieldKey}-undo-btn-suf-i`}
                    data-dev-btn-suf-i={fieldKey}
                    className={`${fieldKey}-undo-btn-suf-i ${getCustomClsName(fieldKey, 'undo-btn-suf-i')}`}
                    src={fieldData.undoSufIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'undo-btn-suf-i')}
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
