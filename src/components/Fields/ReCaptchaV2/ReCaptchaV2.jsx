import { useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $breakpoint, $builderHookStates, $fields, $flags } from '../../../GlobalStates/GlobalStates'
import { loadScript, selectInGrid } from '../../../Utils/globalHelpers'
import RenderStyle from '../../style-new/RenderStyle'
import RecaptchaField from './re-captchaV2'

export default function ReCaptchaV2({ fieldKey, formId, styleClasses }) {
  const bits = useRecoilValue($bits)
  const recaptchaWrapElmRef = useRef(null)
  const recaptchaFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const setBuilderFldWrpHeight = () => {
    setBuilderHookState(olds => ({ ...olds, reCalculateSpecificFldHeight: { fieldKey, counter: olds.reCalculateSpecificFldHeight.counter + 1 } }))
  }

  useEffect(() => {
    if (!recaptchaWrapElmRef?.current) {
      recaptchaWrapElmRef.current = selectInGrid(`.${fieldKey}-recaptcha-wrp`)
    }
    // const fldConstructor = recaptchaFieldRef.current
    const fldElm = recaptchaWrapElmRef.current
    // if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
    //   fldConstructor.destroy()
    // }

    const { theme, size } = fieldData.config
    const configOptions = {
      theme,
      size,
    }
    recaptchaFieldRef.current = new RecaptchaField(fldElm, configOptions)
    const src = 'https://www.google.com/recaptcha/api.js'
    const srcData = {
      src,
      integrity: '',
      id: 'bf-recaptcha-script',
      scriptInGrid: true,
    }

    loadScript(srcData).then(() => {
      setBuilderFldWrpHeight()
    })
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-recaptcha-container ${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <div className={`${fieldKey}-recaptcha-wrp`} ref={recaptchaWrapElmRef}>
          <div className="g-recaptcha" data-sitekey={bits?.allFormSettings?.gReCaptcha?.siteKey} />
        </div>
      </div>
      {/* <script src="https://www.google.com/recaptcha/api.js" /> */}
    </>
  )
}
