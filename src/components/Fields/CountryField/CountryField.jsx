/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import CountryFieldClass from './country-field-script.js'

const CountryField = ({ fieldKey, formID, attr, styleClasses }) => {
  const countryWrapElmRef = useRef(null)
  const countryFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  const { options, ph } = fieldData

  useEffect(() => {
    if (!countryWrapElmRef?.current) {
      countryWrapElmRef.current = selectInGrid(`.${fieldKey}-country-fld-wrp`)
    }
    const fldConstructor = countryFieldRef.current
    const fldElm = countryWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { selectedFlagImage,
      selectedCountryClearable,
      searchClearable,
      optionFlagImage,
      detectCountryByIp,
      detectCountryByGeo,
      defaultValue,
      searchPlaceholder } = fieldData.config

    const configOptions = {
      fieldKey,
      selectedFlagImage,
      selectedCountryClearable,
      searchClearable,
      optionFlagImage,
      detectCountryByIp,
      detectCountryByGeo,
      defaultValue,
      placeholder: ph,
      searchPlaceholder,
      options,
    }

    const alreadyChecked = options.find(opt => opt.check)
    if (alreadyChecked) configOptions.defaultValue = alreadyChecked.i
    countryFieldRef.current = new CountryFieldClass(fldElm, configOptions)
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div className={`${fieldKey}-country-fld-container`}>
          <div
            data-dev-country-fld-wrp={fieldKey}
            className={`${fieldKey}-country-fld-wrp ${getCustomClsName(fieldKey, 'country-fld-wrp')} ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`}
            ref={countryWrapElmRef}
            {... { ...getCustomAttributs(fieldKey, 'country-fld-wrp') }}
          >
            <input
              name="country-name"
              type="hidden"
              className={`${fieldKey}-country-hidden-input`}
              {...'disabled' in fieldData && { disabled: fieldData.disabled }}
              {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
            />
            <div
              className={`${fieldKey}-dpd-wrp`}
              aria-live="assertive"
              aria-label="Select a Country"
              role="combobox"
              aria-expanded="false"
              tabIndex={fieldData.disabled ? '-1' : '0'}
            >
              <div className={`${fieldKey}-selected-country-wrp`}>
                {fieldData.config.selectedFlagImage && (
                  <img
                    data-dev-selected-country-img={fieldKey}
                    className={`${fieldKey}-selected-country-img ${getCustomClsName(fieldKey, 'selected-country-img')}`}
                    aria-hidden="true"
                    alt="selected country flag"
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                    {... { ...getCustomAttributs(fieldKey, 'selected-country-img') }}
                  />
                )}
                <span
                  data-dev-selected-country-lbl={fieldKey}
                  className={`${fieldKey}-selected-country-lbl`}
                >
                  {ph}
                </span>
              </div>
              <div className={`${fieldKey}-dpd-btn-wrp`}>
                <button
                  type="button"
                  title="Clear selected country value"
                  data-dev-inp-clr-btn={fieldKey}
                  className={`${fieldKey}-inp-clr-btn ${getCustomClsName(fieldKey, 'inp-clr-btn')}`}
                  {... { ...getCustomAttributs(fieldKey, 'inp-clr-btn') }}
                >
                  <svg
                    width="15"
                    height="15"
                    role="img"
                    title="Cross icon"
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
                <div className={`${fieldKey}-dpd-down-btn`}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    title="Cross icon"
                    role="img"
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
            </div>
            <div className={`${fieldKey}-option-wrp`}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div className={`${fieldKey}-option-search-wrp`} data-dev-option-search-wrp={fieldKey}>
                  <input
                    type="search"
                    data-dev-opt-search-input={fieldKey}
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder={fieldData.config.searchPlaceholder}
                    autoComplete="country-name"
                    tabIndex="-1"
                    {... { ...getCustomAttributs(fieldKey, 'opt-search-input') }}
                  />
                  <svg
                    data-dev-opt-search-icn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-opt-search-icn ${getCustomClsName(fieldKey, 'opt-search-icn')}`}
                    aria-hidden="true"
                    width="22"
                    height="22"
                    role="img"
                    title="Search icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {... { ...getCustomAttributs(fieldKey, 'opt-search-icn') }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <button
                    type="button"
                    title="Clear search"
                    data-dev-search-clear-btn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                    tabIndex="-1"
                    {... { ...getCustomAttributs(fieldKey, 'search-clear-btn') }}
                  >
                    <svg
                      width="15"
                      height="15"
                      role="img"
                      title="Cross icon"
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

export default CountryField
