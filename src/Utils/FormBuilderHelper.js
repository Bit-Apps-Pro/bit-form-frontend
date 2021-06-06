import { __ } from './i18nwrap'

export const sortLayoutByXY = (layoutArr) => layoutArr.sort((first, second) => {
  const n = first.y - second.y
  if (n !== 0) {
    return n
  }
  return first.x - second.x
})
export const propertyValueSumX = (propertyValue = '') => {
  let arr = propertyValue?.replace(/px|em|rem|!important/g, '').split(' ')
  if (arr.length === 1) { arr = Array(4).fill(arr[0]) }
  if (arr.length === 2) { arr = [arr[0], arr[1], arr[0], arr[1]] }
  if (arr.length === 3) { arr = [arr[0], arr[1], arr[2], arr[1]] }
  arr = [arr[1], arr[3]]
  const summ = arr?.reduce((pv, cv) => Number(pv) + Number(cv), 0)
  return summ || 0
}

export const validateField = (field, allFields, extraFieldsAttr, paymentsIntegs = [], setProModal, setModal, formSettings) => {
  if (extraFieldsAttr[field.typ]?.pro && !bits.isPro) {
    setProModal({ show: true, msg: __(`${field.typ} field is available in Pro Version!`, 'bitform') })
    return { validationMsg: 'pro' }
  }
  if (extraFieldsAttr[field.typ]?.onlyOne) {
    if (Object.values(allFields).find(fld => fld.typ === field.typ)) {
      setModal({
        show: true,
        msg: __(`You cannot add more than one ${field.typ} field in same form.`, 'bitform'),
      })
      return { validationMsg: 'alread-exist' }
    }
  }
  if (extraFieldsAttr[field.typ]?.checkDefaultConfig) {
    const [payConf] = paymentsIntegs.filter(pay => pay.type.toLowerCase() === field.typ)
    if (payConf?.length === 1) return { validationMsg: 'extraAttrAvailable', data: payConf }
  }
  if (field.typ === 'recaptcha') {
    if (formSettings?.additional?.enabled?.recaptchav3) {
      setModal({
        show: true,
        msg: __('You can use either ReCaptcha-V2 or ReCaptcha-V3 in a form. to use ReCaptcha-V2 disable the ReCaptcha-V3 from the Form Settings.', 'bitform'),
      })
    }
  }

  // TODO country field with type  and list it in extraFieldsAttr
  if (field.lbl === 'Select Country' && !bits.isPro) {
    setModal({
      show: true,
      msg: __('Country Field available in Pro version of Bit Form.', 'bitform'),
    })
  }
}
export const checkPaymentFields = (elm, fields) => {
  const fld = elm.typ.match(/paypal|razorpay/)
  if (fld) {
    const payFields = fields ? Object.values(fields).filter(field => field.typ === fld[0]) : []
    let msg
    if (!isPro) {
      msg = __(`${fld[0]} is in Pro Version!`, 'bitform')
      setProModal({ show: true, msg })
    } else if (payFields.length) {
      msg = __(
        <p>
          You cannot add more than one &nbsp;
          {fld[0]}
          &nbsp;
          field in same form.
        </p>, 'bitform',
      )
      setAlertMdl({ show: true, msg })
    }
    if (msg) return false

    const payConf = payments.filter(pay => pay.type.toLowerCase() === fld[0])
    if (payConf.length === 1) {
      return payConf
    }
  }
  return true
}