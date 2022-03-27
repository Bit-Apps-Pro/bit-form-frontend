import { useContext, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { AppSettings } from '../../../Utils/AppSettingsContext'
import { loadScript, removeScript, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import PayPalField from './paypal-field-script'

export default function PaypalField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const appSettingsContext = useContext(AppSettings)
  const [clientID, setClientID] = useState('')
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  const paypalElemnRaf = useRef(null)
  const paypalFldWrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let key = ''
    if (!key && typeof bits !== 'undefined') {
      const payInteg = appSettingsContext?.payments?.find(pay => pay.id && attr.payIntegID && Number(pay.id) === Number(attr.payIntegID))
      if (payInteg) {
        key = payInteg.clientID
      }
    }
    setClientID(key)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.payIntegID])

  useEffect(() => {
    const src = `https://www.paypal.com/sdk/js?client-id=${clientID}&namespace=${fieldKey}`
    loadScript(src, '', 'bf-paypal-script', false, () => {
      setLoaded(true)
    })

    return () => {
      removeScript('bf-paypal-script')
    }
  }, [clientID])

  useEffect(() => {
    if (!loaded) return
    if (!paypalElemnRaf?.current) {
      paypalElemnRaf.current = selectInGrid(`#${fieldKey}-paypal-wrp`)
    }
    const fldConstructor = paypalFldWrapRef.current
    const fldElemnt = paypalElemnRaf.current
    if (fldConstructor && fldElemnt && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { style, currency } = fieldData

    const config = {
      namespace: fieldKey,
      style,
      currency,
      payType: 'payment',
      shipping: 0,
      tax: 0,
    }

    paypalFldWrapRef.current = new PayPalField(fldElemnt, config)
  }, [loaded, fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldData={attr}
        noLabel
        isBuilder={isBuilder}
      >
        <div className={`${fieldKey}-paypal-wrp`}>
          <div ref={paypalElemnRaf} id={`${fieldKey}-paypal-wrp`} />
        </div>
      </InputWrapper>
    </>
  )
}
