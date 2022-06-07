import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $bits, $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
import { reCalculateFieldHeights } from '../../Utils/FormBuilderHelper'
import { loadScript, selectInGrid } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'
import RecaptchaField from '../../resource/js/re-captchaV2'

export const onLoadCallback = () => {
  console.log('on load complete')
}

export default function ReCaptchaV2({ fieldKey, formId, styleClasses }) {
  const bits = useRecoilValue($bits)
  const recaptchaWrapElmRef = useRef(null)
  const grecaptchaElm = useRef(null)
  const recaptchaFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const recaptchaId = useRef(null)

  function onloadCallback() {
    const iframeWindow = document.getElementById('bit-grid-layout').contentWindow
    const recaptcha = iframeWindow.grecaptcha
    recaptchaId.current = recaptcha.render(grecaptchaElm.current, {
      sitekey: bits?.allFormSettings?.gReCaptcha?.siteKey,
      theme: fieldData.theme,
    })
    reCalculateFieldHeights(fieldKey)
  }

  useEffect(() => {
    if (!recaptchaWrapElmRef?.current) {
      recaptchaWrapElmRef.current = selectInGrid(`.${fieldKey}-recaptcha-wrp`)
    }
    const fldConstructor = recaptchaFieldRef.current
    const fldElm = recaptchaWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const iframeWindow = document.getElementById('bit-grid-layout').contentWindow
    if (recaptchaId.current !== null) {
      iframeWindow.grecaptcha.reset(recaptchaId.current)
    }

    iframeWindow.onloadCallback = onloadCallback

    const src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
    const srcData = {
      src,
      integrity: '',
      id: 'bf-recaptcha-script',
      scriptInGrid: true,
      attr: {
        async: true,
        defer: true,
      }
    }

    loadScript(srcData)


    const { theme, size } = fieldData.config
    const configOptions = {
      theme,
      size,
    }

    recaptchaFieldRef.current = new RecaptchaField(fldElm, configOptions)


  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-recaptcha-container ${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <div className={`${fieldKey}-recaptcha-wrp`} ref={recaptchaWrapElmRef}>
          <div className="g-recaptcha" ref={grecaptchaElm} />
        </div>
      </div>
      {/* <script src="https://www.google.com/recaptcha/api.js" /> */}
    </>
  )
}
