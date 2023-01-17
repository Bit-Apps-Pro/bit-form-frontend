import BitPaypalField from 'bit-paypal-field/src/bit-paypal-field'
import { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { addFormUpdateError, reCalculateFldHeights, removeFormUpdateError } from '../../Utils/FormBuilderHelper'
import { loadScript, removeScript, selectInGrid } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function PaypalField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const appSettingsContext = useContext(AppSettings)
  const [clientID, setClientID] = useState('')
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const location = useLocation()

  const paypalElemnRaf = useRef(null)
  const paypalFldWrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!attr.payIntegID) { setClientID(''); return }
    const payInteg = appSettingsContext?.payments?.find(pay => pay.id && attr.payIntegID && Number(pay.id) === Number(attr.payIntegID))
    if (payInteg) {
      const key = payInteg.clientID
      setClientID(key)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.payIntegID])

  useEffect(() => {
    if (!clientID) {
      addFormUpdateError({
        fieldKey,
        errorKey: 'paypalClientIdMissing',
        errorMsg: __('PayPal Client ID is missing'),
        errorUrl: location.pathname.replace('fields-list', `field-settings/${fieldKey}`),
      })
      return
    }
    removeFormUpdateError(fieldKey, 'paypalClientIdMissing')
    const src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
    const srcData = {
      src,
      integrity: '',
      id: `bf-paypal-script-${fieldKey}`,
      scriptInGrid: false,
      attr: { 'data-namespace': fieldKey },
      callback: () => {
        reCalculateFldHeights(fieldKey)
        setLoaded(true)
      },
    }
    loadScript(srcData)

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
    if (!clientID || (fldConstructor && fldElemnt && 'destroy' in fldConstructor)) {
      fldConstructor.destroy()
      reCalculateFldHeights(fieldKey)
    }

    if (!clientID) return setLoaded(false)

    const { style, currency } = fieldData

    const config = {
      namespace: fieldKey,
      style,
      currency,
      payType: 'payment',
      shipping: 0,
      tax: 0,
      onInit: () => {
        reCalculateFldHeights(fieldKey)
      },
    }

    paypalFldWrapRef.current = new BitPaypalField(fldElemnt, config)
  }, [loaded, fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldData={attr}
        fieldKey={fieldKey}
        noLabel
        noErrMsg
        isBuilder={isBuilder}
      >
        {loaded && clientID && (
          <div className={`${fieldKey}-paypal-wrp`}>
            <div ref={paypalElemnRaf} id={`${fieldKey}-paypal-wrp`} />
          </div>
        )}
        {(!loaded || !clientID) && <p>Select a config from field settings to render the PayPal.</p>}
      </InputWrapper>
    </>
  )
}
