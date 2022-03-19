/* eslint-disable jsx-a11y/role-has-required-aria-props */
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import PhoneNumberFieldClass from './phone-number-field-srcipt'

export default function PhoneNumberField({ fieldKey, formID, attr, styleClasses }) {
  const phoneNumberWrapElmRef = useRef(null)
  const phoneNumberFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  useEffect(() => {
    if (!phoneNumberWrapElmRef?.current) {
      phoneNumberWrapElmRef.current = selectInGrid(`.${fieldKey}-phone-fld-wrp`)
    }
    const fldConstructor = phoneNumberFieldRef.current
    const fldElm = phoneNumberWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { options } = fieldData
    const configOptions = { fieldKey, options, inputFormat: '+c #### ### ###' }

    const alreadyChecked = options.find(opt => opt.check)
    if (alreadyChecked) configOptions.defaultCountryKey = alreadyChecked.i
    phoneNumberFieldRef.current = new PhoneNumberFieldClass(fldElm, configOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldData])

  console.log(fieldData)

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div className={`${fieldKey}-phone-fld-container`}>
          <div className={`${fieldKey}-phone-fld-wrp`} ref={phoneNumberWrapElmRef}>
            <input name="country-name" type="hidden" className={`${fieldKey}-phone-hidden-input`} />
            <div className={`${fieldKey}-phone-inner-wrp`}>
              <div
                className={`${fieldKey}-dpd-wrp`}
                role="combobox"
                aria-live="assertive"
                aria-labelledby="country-label-2"
                aria-expanded="false"
                tabIndex="0"
              >
                <div className={`${fieldKey}-selected-country-wrp`}>
                  <img
                    alt="Selected Country image"
                    aria-hidden="true"
                    className={`${fieldKey}-selected-country-img`}
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                  />
                </div>
                <div className={`${fieldKey}-dpd-down-btn`}>
                  <svg
                    width="15"
                    height="15"
                    role="img"
                    title="Downarrow icon"
                    viewbox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              <input
                aria-label="Phone Number"
                type="tel"
                className={`${fieldKey}-phone-number-input`}
                autoComplete="tel"
              />
              <button
                type="button"
                title="Clear value"
                className={`${fieldKey}-icn ${fieldKey}-input-clear-btn`}
              >
                <svg
                  width="13"
                  height="13"
                  viewbox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={`${fieldKey}-option-wrp`}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div className={`${fieldKey}-option-search-wrp`}>
                  <input
                    aria-label="Search for countries"
                    type="search"
                    className={`${fieldKey}-opt-search-input`}
                    placeholder="Search for countries"
                    autoComplete="off"
                    tabIndex="-1"
                  />
                  <svg
                    className={`${fieldKey}-icn ${fieldKey}-opt-search-icn`}
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewbox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <button
                    type="button"
                    aria-label="Clear search"
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn`}
                    tabIndex="-1"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewbox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <ul
                  className={`${fieldKey}-option-list`}
                  tabIndex="-1"
                  role="listbox"
                  aria-label="country list"
                />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
