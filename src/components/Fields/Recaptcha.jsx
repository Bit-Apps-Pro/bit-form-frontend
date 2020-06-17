import React, { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReCaptcha({ attr }) {
  const [render, setrender] = useState(true)
  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1);
  }, [attr.theme])
  return (
    <div className="drag btcd-flx j-c-c" style={{ minHeight: 'inherit' }}>
      {render && (
        <ReCAPTCHA
          theme={attr.theme}
          sitekey={attr.siteKey || 'non'}
        // onChange={onChange}
        />
      )}
    </div>
  )
}
