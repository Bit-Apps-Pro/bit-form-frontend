/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import BitSignatureField from 'bit-signature-field/src/bit-signature-field'
import { useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useEffect, useRef } from 'react'
import { $bits, $fields, $resizingFld } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { getAbsoluteElmHeight } from '../../Utils/FormBuilderHelper'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'
import { assignNestedObj } from '../style-new/styleHelpers'

export default function SignatureField({ fieldKey, attr, formID, styleClasses }) {
  const signatureFldRef = useRef(null)
  const signatureElemnRef = useRef(null)
  const bits = useAtomValue($bits)
  const resizingFld = useAtomValue($resizingFld)
  const tempResize = useRef({ resize: false })
  const setStyles = useSetAtom($styles)
  const signatureWrpElmRef = useRef(null)
  const reInitFld = useRef(0)
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]

  if (resizingFld.fieldKey === fieldKey) {
    tempResize.current.resize = true
    const wrpElm = selectInGrid(`[data-key="${fieldKey}"]`)
    const currentWrpHeight = getAbsoluteElmHeight(wrpElm)
    if (resizingFld.wrpHeight >= resizingFld.fldHeight) {
      const height = `${resizingFld.fldHeight + (currentWrpHeight - resizingFld.wrpHeight)}px`
      signatureElemnRef.current.style.height = height
    }
  }

  if (tempResize.current.resize && !resizingFld.fieldKey) {
    tempResize.current.resize = false
    const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld->${cssProperty}`
    setStyles(prvStyle => create(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('height'), signatureElemnRef.current.style.height)
      reInitFld.current += 1
    }))
  }

  useEffect(() => {
    if (!signatureElemnRef.current) {
      signatureWrpElmRef.current = selectInGrid(`.${fieldKey}-inp-fld-wrp`)
    }

    const fldConstructor = signatureFldRef.current
    const fldElm = signatureWrpElmRef.current

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
      assetsURL: `${bits.assetsURL}/../static/signature/`,
      isBuilder: true,
    }
    signatureFldRef.current = new BitSignatureField(fldElm, config)
  }, [fieldData, reInitFld.current])

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
          ref={signatureWrpElmRef}
        >
          <canvas
            ref={signatureElemnRef}
            className={`${fieldKey}-signature-pad ${getCustomClsName(fieldKey, 'signature')}`}
            id="canvas"
            {...getCustomAttributes(fieldKey, 'signature-pad')}
            data-testid={`${fieldKey}-signature-pad`}
            data-dev-fld={fieldKey}
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
            {!fieldData?.redoBtnHide && (
              <button
                id="redo"
                className={`${fieldKey}-redo-btn`}
                type="button"
                data-testid={`${fieldKey}-redo-btn`}
                data-dev-redo-btn={fieldKey}
              >
                {fieldData?.redoPreIcn && (
                  <img
                    data-testid={`${fieldKey}-redo-btn-pre-i`}
                    data-dev-redo-btn-pre-i={fieldKey}
                    className={`${fieldKey}-redo-btn-pre-i ${getCustomClsName(fieldKey, 'redo-btn-pre-i')}`}
                    src={fieldData.redoPreIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'redo-btn-pre-i')}
                  />
                )}
                {fieldData.redoBtn}
                {fieldData?.redoSufIcn && (
                  <img
                    data-testid={`${fieldKey}-redo-btn-suf-i`}
                    data-dev-btn-suf-i={fieldKey}
                    className={`${fieldKey}-redo-btn-suf-i ${getCustomClsName(fieldKey, 'redo-btn-suf-i')}`}
                    src={fieldData.redoSufIcn}
                    alt=""
                    {...getCustomAttributes(fieldKey, 'redo-btn-suf-i')}
                  />
                )}
              </button>
            )}
          </div>

          <iframe title="Signature Iframe" className={`${fieldKey}-signature-iframe`} />
        </div>
      </InputWrapper>
    </>
  )
}
