import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { loadScript, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import PayPalField from './paypal-field-script'
import RenderStyle from '../../style-new/RenderStyle'

export default function PaypalField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  const paypalElemnRaf = useRef(null)
  const paypalFldWrapRef = useRef(null)

  useEffect(() => {
    const src = 'https://www.paypal.com/sdk/js?client-id=AVCn9xOgLFK538FYxLaG0JloQQWeTEroTLur6Qm-j9-G8AvKKxqTD9LE1Td12RvXGYkSmrrNfJusYtSq'
    loadScript(src, '', 'paypal-bf', true)
    console.log('load script')
  }, [])

  useEffect(() => {
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
  }, [fieldData])
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
