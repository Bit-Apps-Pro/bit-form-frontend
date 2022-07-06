/* eslint-disable react/jsx-props-no-spreading */
import BitRazorpayField from 'bit-razorpay-field'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName, loadScript, removeScript, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function RazorpayField({ fieldKey, formID, attr, isBuilder, styleClasses }) {
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  const razorpayElemntRef = useRef(null)
  const razorpayFldWrpRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const src = 'https://checkout.razorpay.com/v1/checkout.js'
    const srcData = {
      src,
      integrity: 'sha256-mWVOHiJZZO+kIH4HbXErt4iqurxCChBNfsMxkk8UCBI=',
      id: `bf-razorpay-script-${fieldKey}`,
      scriptInGrid: false,
      callback: () => {
        setLoaded(true)
      },
    }
    loadScript(srcData)
    // loadScript(src, integrity, 'bf-razorpay-script', false, () => {
    //   setLoaded(true)
    // })

    return () => {
      removeScript('bf-razorpay-script')
    }
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (!razorpayElemntRef?.current) {
      razorpayElemntRef.current = selectInGrid(`${fieldKey}-razorpay-wrp`)
    }
    const fldElemnt = razorpayElemntRef.current
    const fldConstructor = razorpayFldWrpRef.current
    if (fldConstructor && fldElemnt && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const config = {
      clientId: 'rzp_test_Sw0MZlz8H4gPfa',
      fieldKey,
      options: fieldData.options,
      onPaymentSuccess: resp => { console.log('success') },
      onPaymentFailed: () => { console.log('failed') },
    }

    // razorpayFldWrpRef.current = new Razorpay(fldElemnt, config)
    razorpayFldWrpRef.current = new BitRazorpayField(fldElemnt, config)
  }, [loaded, fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldData={attr}
        fieldKey={fieldKey}
        noLabel
        isBuilder={isBuilder}
      >
        <div className="bf-form">
          <div
            ref={razorpayElemntRef}
            className={`${fieldKey}-razorpay-wrp`}
          >
            <button
              type="button"
              data-dev-razorpay-btn={fieldKey}
              className={`${fieldKey}-razorpay-btn ${getCustomClsName(fieldKey, 'razorpay-btn')}`}
              {...getCustomAttributs(fieldKey, 'razorpay-btn')}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.077 6.476l-.988 3.569 5.65-3.589-3.695 13.54 3.752.004 5.457-20L7.077 6.476z" fill="#fff" />
                <path d="M1.455 14.308L0 20h7.202L10.149 8.42l-8.694 5.887z" fill="#fff" />
              </svg>
              <div
                data-dev-razorpay-btn-text={fieldKey}
                className={`${fieldKey}-razorpay-btn-text ${getCustomClsName(fieldKey, 'razorpay-btn-text')}`}
                {...getCustomAttributs(fieldKey, 'razorpay-btn-text')}
              >
                <span
                  data-dev-razorpay-btn-title={fieldKey}
                  className={`${fieldKey}-razorpay-btn-title ${getCustomClsName(fieldKey, 'razorpay-btn-title')}`}
                  {...getCustomAttributs(fieldKey, 'razorpay-btn-title')}
                >
                  {fieldData.btnTxt}
                </span>
                {fieldData.subTitl && (
                  <span
                    data-dev-razorpay-btn-sub-title={fieldKey}
                    className={`${fieldKey}-razorpay-btn-sub-title ${getCustomClsName(fieldKey, 'razorpay-btn-sub-title')}`}
                    {...getCustomAttributs(fieldKey, 'razorpay-btn-sub-title')}
                  >
                    Secured by Razorpay
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
