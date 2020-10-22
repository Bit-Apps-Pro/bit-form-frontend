import { createContext, useState } from 'react';

export const AppSettings = createContext()

export default function AppSettingsProvider({ children }) {
  const [reCaptchaV2, setreCaptchaV2] = useState(
    // eslint-disable-next-line no-undef
    typeof bits !== 'undefined' && bits.allFormSettings && bits.allFormSettings.gReCaptcha ? bits.allFormSettings.gReCaptcha :
      {
        siteKey: '',
        secretKey: '',
      },
  )
  return (
    <AppSettings.Provider value={{ reCaptchaV2, setreCaptchaV2 }}>
      {children}
    </AppSettings.Provider>
  )
}
