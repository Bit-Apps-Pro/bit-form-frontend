import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { loadScript, removeScript, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import PayPalField from './paypal-field-script'

export default function PaypalField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  const paypalElemnRaf = useRef(null)
  const paypalFldWrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const src = 'https://www.paypal.com/sdk/js?client-id=AVCn9xOgLFK538FYxLaG0JloQQWeTEroTLur6Qm-j9-G8AvKKxqTD9LE1Td12RvXGYkSmrrNfJusYtSq'
    loadScript(src, '', 'bf-paypal-script', false, () => {
      setLoaded(true)
    })

    return () => {
      removeScript('bf-paypal-script')
    }
  }, [])

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
