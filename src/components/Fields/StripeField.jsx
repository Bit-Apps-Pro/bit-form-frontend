import { useContext, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { addFormUpdateError, reCalculateFldHeights, removeFormUpdateError } from '../../Utils/FormBuilderHelper'
import { loadScript, removeScript, selectInGrid } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'
import StripeIcn from '../../Icons/StripeIcn'

export default function StripeField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const appSettingsContext = useContext(AppSettings)
  const [publishableKey, setPublishableKey] = useState('')
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const stripeElemnRaf = useRef(null)
  const stripeFldWrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isSubscription = fieldData?.payType === 'subscription'
  const { locale, currency } = fieldData || {}
  useEffect(() => {
    if (!attr.payIntegID) { setPublishableKey(''); return }
    const payInteg = appSettingsContext?.payments?.find(pay => pay.id && attr.payIntegID && Number(pay.id) === Number(attr.payIntegID))
    if (payInteg) {
      const key = payInteg.publishableKey
      setPublishableKey(key)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.payIntegID])

  useEffect(() => {
    if (!publishableKey) {
      addFormUpdateError({
        fieldKey,
        errorKey: 'publishableKeyMissing',
        errorMsg: __('Stripe publishable key is missing'),
        errorUrl: `field-settings/${fieldKey}`,
      })
      return
    }
    setIsLoading(true)
    removeFormUpdateError(fieldKey, 'publishableKeyMissing')
    // const urlQueryParams = { 'client-id': publishableKey }
    // if (fieldData?.locale) urlQueryParams.locale = fieldData.locale
    // if (fieldData?.disableFunding) urlQueryParams['disable-funding'] = fieldData.disableFunding
    // if (isSubscription) {
    //   urlQueryParams.intent = 'subscription'
    //   urlQueryParams.vault = 'true'
    // }
    // if (!isSubscription && fieldData?.currency) {
    //   urlQueryParams.currency = fieldData.currency
    // }
    const src = 'https://js.stripe.com/v3/'
    const srcData = {
      src,
      integrity: '',
      id: `bf-stripe-script-${fieldKey}`,
      scriptInGrid: false,
      callback: () => {
        reCalculateFldHeights(fieldKey)
        setLoaded(true)
        setIsLoading(false)
      },
    }
    loadScript(srcData)

    return () => {
      removeScript(`bf-stripe-script-${fieldKey}`)
    }
  }, [publishableKey, locale, currency])

  useEffect(() => {
    if (!loaded || isLoading) return
    if (!stripeElemnRaf?.current) {
      stripeElemnRaf.current = selectInGrid(`#${fieldKey}-stripe-wrp`)
    }
    const fldConstructor = stripeFldWrapRef.current
    const fldElemnt = stripeElemnRaf.current
    if (!publishableKey || (fldConstructor && fldElemnt && 'destroy' in fldConstructor)) {
      fldConstructor.destroy()
      reCalculateFldHeights(fieldKey)
    }

    if (!publishableKey) return setLoaded(false)

    // const { currency } = fieldData

    // console.log({ currency })

    const config = {
      options: {
        // mode: 'payment',
        // currency,
        // amount: 1,
        // payment_method_types: ['card'],
        ...fieldData.config.options,
      },
      layout: {
        // type: 'tabs',
        // defaultCollapsed: false,
        ...fieldData.config.layout,
      },
      publishableKey,
      onInit: () => {
        reCalculateFldHeights(fieldKey)
      },
    }

    // stripeFldWrapRef.current = new BitStripeField(fldElemnt, config)
  }, [loaded, isLoading])

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
        {(loaded && publishableKey && !isLoading) && (
          <div className={`${fieldKey}-stripe-wrp`}>
            <button type="button" className={`${fieldKey}-stripe-btn`}>
              <StripeIcn size="18" />
              Stripe Payment
            </button>
          </div>
        )}
        {(!isLoading && (!loaded || !publishableKey)) && <p>Select a config from field settings to render the Stripe.</p>}
        {isLoading && <p>Loading Stripe...</p>}
      </InputWrapper>
    </>
  )
}
