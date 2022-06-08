/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import PhoneNumberFieldClass from '../../resource/js/phone-number-field-script'
import { getCustomAttributs, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function PhoneNumberField({ fieldKey, formID, attr, styleClasses }) {
  const phoneNumberWrapElmRef = useRef(null)
  const phoneNumberFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const { selectedFlagImage,
    selectedCountryClearable,
    searchClearable,
    optionFlagImage,
    detectCountryByIp,
    detectCountryByGeo,
    defaultValue,
    searchPlaceholder,
    noCountryFoundText,
    inputFormat,
    valueFormat } = fieldData.config

  useEffect(() => {
    if (!phoneNumberWrapElmRef?.current) {
      phoneNumberWrapElmRef.current = selectInGrid(`.${fieldKey}-phone-fld-wrp`)
    }
    const fldConstructor = phoneNumberFieldRef.current
    const fldElm = phoneNumberWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }
    const { placeholderImage, options } = fieldData
    const configOptions = {
      fieldKey,
      selectedFlagImage,
      selectedCountryClearable,
      searchClearable,
      optionFlagImage,
      detectCountryByIp,
      detectCountryByGeo,
      defaultValue,
      searchPlaceholder,
      noCountryFoundText,
      placeholderImage,
      options,
      inputFormat,
      valueFormat,
    }

    const alreadyChecked = options.find(opt => opt.check)
    if (alreadyChecked) configOptions.defaultCountryKey = alreadyChecked.i
    phoneNumberFieldRef.current = new PhoneNumberFieldClass(fldElm, configOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div className={`${fieldKey}-phone-fld-container`}>
          <div
            data-dev-phone-fld-wrp={fieldKey}
            className={`${fieldKey}-phone-fld-wrp ${getCustomClsName(fieldKey, 'phone-fld-wrp')} ${fieldData.valid.disabled ? 'disabled' : ''} ${fieldData.valid.readonly ? 'readonly' : ''}`}
            ref={phoneNumberWrapElmRef}
            {...getCustomAttributs(fieldKey, 'phone-fld-wrp')}
          >
            <input
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-phone-hidden-input`}
              {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
              {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
            />
            <div className={`${fieldKey}-phone-inner-wrp`} tabIndex={fieldData.valid.disabled ? '-1' : '0'}>
              <div
                data-testid={`${fieldKey}-dpd-wrp`}
                className={`${fieldKey}-dpd-wrp`}
                role="combobox"
                aria-live="assertive"
                aria-labelledby="country-label-2"
                aria-expanded="false"
                tabIndex={fieldData.valid.disabled ? '-1' : '0'}
              >
                {selectedFlagImage && (
                  <div className={`${fieldKey}-selected-country-wrp`}>
                    <img
                      data-dev-selected-phone-img={fieldKey}
                      alt="Selected Country image"
                      aria-hidden="true"
                      className={`${fieldKey}-selected-country-img ${getCustomClsName(fieldKey, 'selected-phone-img')}`}
                      src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                      {...getCustomAttributs(fieldKey, 'selected-phone-img')}
                    />
                  </div>
                )}

                <div className={`${fieldKey}-dpd-down-btn`}>
                  <svg
                    width="15"
                    height="15"
                    role="img"
                    title="Downarrow icon"
                    viewBox="0 0 24 24"
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
                data-testid={`${fieldKey}-phone-nmbr-inp`}
                data-dev-phone-number-input={fieldKey}
                aria-label="Phone Number"
                type="tel"
                className={`${fieldKey}-phone-number-input`}
                autoComplete="tel"
                tabIndex={fieldData.valid.disabled ? '-1' : '0'}
              />
              {selectedCountryClearable && (
                <button
                  data-testid={`${fieldKey}-inp-clr-btn`}
                  data-dev-input-clear-btn={fieldKey}
                  type="button"
                  title="Clear value"
                  className={`${fieldKey}-icn ${fieldKey}-input-clear-btn ${getCustomClsName(fieldKey, 'input-clear-btn')}`}
                  {...getCustomAttributs(fieldKey, 'input-clear-btn')}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
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
              )}

            </div>
            <div className={`${fieldKey}-option-wrp`}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div
                  data-dev-option-search-wrp={fieldKey}
                  className={`${fieldKey}-option-search-wrp ${getCustomClsName(fieldKey, 'option-search-wrp')}`}
                  {...getCustomAttributs(fieldKey, 'option-search-wrp')}
                >
                  <input
                    data-testid={`${fieldKey}-opt-srch-inp`}
                    data-dev-opt-search-input={fieldKey}
                    aria-label="Search for countries"
                    type="search"
                    className={`${fieldKey}-opt-search-input`}
                    placeholder={searchPlaceholder}
                    autoComplete="off"
                    tabIndex="-1"
                  />
                  <svg
                    className={`${fieldKey}-icn ${fieldKey}-opt-search-icn ${getCustomClsName(fieldKey, 'opt-search-icn')}`}
                    data-dev-opt-search-icn={fieldKey}
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...getCustomAttributs(fieldKey, 'opt-search-icn')}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {
                    searchClearable && (
                      <button
                        data-testid={`${fieldKey}-srch-clr-btn`}
                        type="button"
                        aria-label="Clear search"
                        className={`${fieldKey}-icn ${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                        data-dev-search-clear-btn={fieldKey}
                        tabIndex="-1"
                        {...getCustomAttributs(fieldKey, 'search-clear-btn')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
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
                    )
                  }
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
