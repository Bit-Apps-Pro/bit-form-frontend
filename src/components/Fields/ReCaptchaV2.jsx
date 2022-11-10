import { useContext, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { loadScript, removeScript, selectInGrid } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'

export default function ReCaptchaV2({ fieldKey, formId, styleClasses }) {
  const recaptchaWrapElmRef = useRef(null)
  const recaptchaResetIntervalRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const recaptchaId = useRef(null)
  const appSettingsContext = useContext(AppSettings)
  const { siteKey = '' } = appSettingsContext?.reCaptchaV2 || {}

  useEffect(() => {
    const src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    const srcData = {
      src,
      integrity: '',
      id: 'bf-recaptcha-script',
      async: true,
      defer: true,
    }

    loadScript(srcData)

    return () => {
      clearInterval(recaptchaResetIntervalRef.current)
      removeScript(srcData.id)
    }
  }, [])

  function onloadCallback() {
    let recaptchaElm = selectInGrid(`.${fieldKey}-recaptcha`)
    if (recaptchaId.current !== null) {
      recaptchaElm?.remove()
      window.grecaptcha.reset(recaptchaId.current)
      recaptchaElm = document.createElement('div')
      recaptchaElm.classList.add(`${fieldKey}-recaptcha`)
      recaptchaWrapElmRef.current.appendChild(recaptchaElm)
    }
    recaptchaId.current = window.grecaptcha.render(recaptchaElm, {
      sitekey: siteKey,
      theme: fieldData.config.theme,
      size: fieldData.config.size,
    })
    reCalculateFldHeights(fieldKey)
    if (recaptchaResetIntervalRef.current) {
      clearInterval(recaptchaResetIntervalRef.current)
    }
    recaptchaResetIntervalRef.current = setInterval(() => {
      window.grecaptcha.reset(recaptchaId.current)
    }, 36000)
  }

  useEffect(() => {
    if (window.grecaptcha) onloadCallback()
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-recaptcha-container ${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <div className={`${fieldKey}-recaptcha-wrp`} ref={recaptchaWrapElmRef}>
          <div className={`${fieldKey}-recaptcha`} />
        </div>
      </div>
    </>
  )
}
