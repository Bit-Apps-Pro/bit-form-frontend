import React, { createContext, useState } from 'react'

export const AppSettings = createContext()

export default function AppSettingsProvider({ children }) {
  const [reCaptchaV2, setreCaptchaV2] = useState(
    bits && bits.allFormSettings && bits.allFormSettings.gReCaptcha ? bits.allFormSettings.gReCaptcha :
      {
        siteKey: '',
        secretKey: '',
      })
      console.log('cap', bits.allFormSettings.gReCaptcha)
  return (
    <AppSettings.Provider value={{ reCaptchaV2, setreCaptchaV2 }}>
      {children}
    </AppSettings.Provider>
  )
}
