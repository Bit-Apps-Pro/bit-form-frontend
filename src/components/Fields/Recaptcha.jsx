import React, { useEffect, useContext, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { AppSettings } from '../../Utils/AppSettingsContext'

export default function ReCaptcha(attr) {
  const [render, setrender] = useState(true)
  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1);
  }, [attr.theme])
  const { reCaptchaV2 } = useContext(AppSettings)
  return (
    <div className="drag" style={{ display: 'flex', justifyContent: 'center' }}>
      {render && (
        <ReCAPTCHA
          theme={attr.theme}
          sitekey={reCaptchaV2.siteKey}
        // onChange={onChange}
        />
      )}
    </div>
  )
}
