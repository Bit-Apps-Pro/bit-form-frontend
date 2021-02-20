/* eslint-disable no-undef */
import { createContext, useState } from 'react';

export const AppSettings = createContext()

export default function AppSettingsProvider({ children }) {
  const [reCaptchaV2, setreCaptchaV2] = useState(
    // eslint-disable-next-line no-undef
    bits?.allFormSettings?.gReCaptcha ? bits.allFormSettings.gReCaptcha
      : {
        siteKey: '',
        secretKey: '',
      },
  )

  const paymentsState = () => {
    if (bits?.allFormSettings?.payments) {
      const pays = bits.allFormSettings.payments
      if (Array.isArray(pays)) return pays
      return [pays]
    }
    return []
  }

  const [payments, setPayments] = useState(paymentsState())
  return (
    <AppSettings.Provider value={{ reCaptchaV2, setreCaptchaV2, payments, setPayments }}>
      {children}
    </AppSettings.Provider>
  )
}
