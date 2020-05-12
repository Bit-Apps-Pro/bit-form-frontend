import React, { createContext, useState } from 'react'

export const AppSettings = createContext()

export default function AppSettingsProvider({ children }) {
  const [reCaptchaV2, setreCaptchaV2] = useState({
    siteKey: '6LesGvYUAAAAAKhQ4Aj2GeAQOtHCHyFiREHVOp3t',
    secretKey: '',
  })
  return (
    <AppSettings.Provider value={{ reCaptchaV2, setreCaptchaV2 }}>
      {children}
    </AppSettings.Provider>
  )
}
