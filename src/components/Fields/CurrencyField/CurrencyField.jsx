/* eslint-disable react/jsx-props-no-spreading */
// import './currency-field-style.css'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import CurrencyFieldClass from './currency-field-script'

const CurrencyField = ({ fieldKey, formID, attr, onBlurHandler, contentID, styleClasses }) => {
  const currencyWrapElmRef = useRef(null)
  const currencyFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  useEffect(() => {
    if (!currencyWrapElmRef?.current) {
      currencyWrapElmRef.current = selectInGrid(`.${fieldKey}-currency-fld-wrp`)
    }
    const fldConstructor = currencyFieldRef.current
    const fldElm = currencyWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { options, inputFormatOptions, valueFormatOptions } = fieldData

    const configOptions = {
      fieldKey,
      inputFormatOptions,
      valueFormatOptions,
      options,
    }

    const alreadyChecked = options.find(opt => opt.check)
    if (alreadyChecked) configOptions.defaultCurrencyKey = alreadyChecked.i
    currencyFieldRef.current = new CurrencyFieldClass(fldElm, configOptions)
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div className={`${fieldKey}-currency-fld-container`}>
          <div
            data-dev-currency-fld-wrp={fieldKey}
            className={`${fieldKey}-currency-fld-wrp ${getCustomClsName(fieldKey, 'currency-fld-wrp')} ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`}
            ref={currencyWrapElmRef}
            {... { ...getCustomAttributs(fieldKey, 'currency-fld-wrp') }}
          >
            <input
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-currency-hidden-input`}
              {...'disabled' in fieldData && { disabled: fieldData.disabled }}
              {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
            />
            <div className={`${fieldKey}-currency-inner-wrp`}>
              <div
                className={`${fieldKey}-dpd-wrp`}
                role="combobox"
                aria-controls="currency-dropdown"
                aria-live="assertive"
                aria-labelledby="currency-label-2"
                aria-expanded="false"
                tabIndex={fieldData.disabled ? '-1' : '0'}
              >
                <div className={`${fieldKey}-selected-currency-wrp`}>
                  <img
                    data-dev-selected-currency-img={fieldKey}
                    alt="Selected currency image"
                    aria-hidden="true"
                    className={`${fieldKey}-selected-currency-img ${getCustomClsName(fieldKey, 'selected-currency-img')}`}
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                    {... { ...getCustomAttributs(fieldKey, 'selected-currency-img') }}
                  />
                </div>
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
                aria-label="Currency Input"
                type="text"
                className={`${fieldKey}-currency-amount-input`}
                tabIndex={fieldData.disabled ? '-1' : '0'}
              />
              <button
                data-dev-input-clear-btn={fieldKey}
                type="button"
                title="Clear value"
                className={`${fieldKey}-icn ${fieldKey}-input-clear-btn ${getCustomClsName(fieldKey, 'input-clear-btn')}`}
                {... { ...getCustomAttributs(fieldKey, 'input-clear-btn') }}
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
            </div>
            <div className={`${fieldKey}-option-wrp`}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div
                  data-dev-opt-search-wrp={fieldKey}
                  className={`${fieldKey}-option-search-wrp ${getCustomClsName(fieldKey, 'opt-search-wrp')}`}
                  {... { ...getCustomAttributs(fieldKey, 'opt-search-wrp') }}
                >
                  <input
                    data-dev-opt-search-input={fieldKey}
                    type="search"
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder="Search for currency"
                    autoComplete="off"
                    tabIndex="-1"
                    {... { ...getCustomAttributs(fieldKey, 'opt-search-input') }}
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
                    {... { ...getCustomAttributs(fieldKey, 'opt-search-icn') }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <button
                    data-dev-search-clear-btn={fieldKey}
                    type="button"
                    aria-label="Clear search"
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                    tabIndex="-1"
                    {... { ...getCustomAttributs(fieldKey, 'search-clear-btn') }}
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
                </div>
                <ul
                  className={`${fieldKey}-option-list`}
                  tabIndex="-1"
                  role="listbox"
                  aria-label="currency list"
                />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
export default CurrencyField
