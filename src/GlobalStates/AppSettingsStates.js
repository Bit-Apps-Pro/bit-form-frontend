import { atomWithReset } from 'jotai/utils'

// helper functions
const paymentsState = () => {
  if (!window.bits) return []
  if (window.bits?.allFormSettings?.payments) {
    const pays = window.bits.allFormSettings.payments
    if (Array.isArray(pays)) return pays
    return [pays]
  }
  return []
}

const getReCaptchaState = ver => {
  if (!window.bits) return { siteKey: '', secretKey: '' }
  let captcha
  if (ver === 'v2') captcha = window.bits?.allFormSettings?.gReCaptcha
  else if (ver === 'v3') captcha = window.bits?.allFormSettings?.gReCaptchaV3
  if (captcha) {
    if (Array.isArray(captcha)) {
      return captcha[0]
    }
    return captcha
  }
  return {
    siteKey: '',
    secretKey: '',
  }
}

export const $payments = atomWithReset(paymentsState())
export const $reCaptchaV2 = atomWithReset(getReCaptchaState('v2'))
export const $reCaptchaV3 = atomWithReset(getReCaptchaState('v3'))
