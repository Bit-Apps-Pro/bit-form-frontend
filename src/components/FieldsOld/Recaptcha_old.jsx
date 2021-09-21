/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import OldInputWrapper from '../OldInputWrapper'

let captcha

export const resetCaptcha = () => {
  captcha.reset()
}

export default function ReCaptcha_old({ formID, attr }) {
  const [render, setrender] = useState(true)

  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1)
  }, [attr.theme])

  return (
    <OldInputWrapper
      formID={formID}
      fieldData={attr}
      noLabel
    >
      <div className="drag btcd-flx j-c-c" style={{ minHeight: 'inherit' }}>
        {render && (
          <ReCAPTCHA
            // eslint-disable-next-line no-return-assign
            ref={r => captcha = r}
            theme={attr.theme}
            sitekey={attr.siteKey || 'non'}
          />
        )}
      </div>
    </OldInputWrapper>
  )
}
