/* eslint-disable react/jsx-props-no-spreading */
// import './currency-field-style.css'
import BitCurrencyField from 'bit-currency-field'
import { observeElm } from 'bit-helpers'
import { default as bit_virtualized_list } from 'bit-virtualized-list'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $bits, $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, getDataDevAttrArr, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

const CurrencyField = ({ fieldKey, formID, attr, onBlurHandler, contentID, styleClasses }) => {
  const currencyWrapElmRef = useRef(null)
  const currencyFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const bits = useRecoilValue($bits)
  const { selectedFlagImage,
    selectedCurrencyClearable,
    searchClearable,
    optionFlagImage,
    defaultValue,
    searchPlaceholder,
    noCurrencyFoundText } = fieldData.config

  useEffect(() => {
    if (!currencyWrapElmRef?.current) {
      currencyWrapElmRef.current = selectInGrid(`.${fieldKey}-currency-fld-wrp`)
    }
    const fldConstructor = currencyFieldRef.current
    const fldElm = currencyWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { options, inputFormatOptions, valueFormatOptions, customAttributes, customClasses } = fieldData
    console.log(customAttributes, customClasses)

    const configOptions = {
      fieldKey,
      inputFormatOptions,
      valueFormatOptions,
      selectedFlagImage,
      selectedCurrencyClearable,
      searchClearable,
      optionFlagImage,
      defaultValue,
      searchPlaceholder,
      noCurrencyFoundText,
      options,
      assetsURL: `${bits.assetsURL}/../static/currencies/`,
      document: document.getElementById('bit-grid-layout').document,
      window: document.getElementById('bit-grid-layout').contentWindow,
      attributes: {
        option: getDataDevAttrArr(fieldKey, 'option'),
        'opt-lbl-wrp': getDataDevAttrArr(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getDataDevAttrArr(fieldKey, 'opt-icn'),
        'opt-lbl': getDataDevAttrArr(fieldKey, 'opt-lbl'),
        'opt-suffix': getDataDevAttrArr(fieldKey, 'opt-suffix'),
      },
      classNames: {
        option: getCustomClsName(fieldKey, 'option'),
        'opt-lbl-wrp': getCustomClsName(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getCustomClsName(fieldKey, 'opt-icn'),
        'opt-lbl': getCustomClsName(fieldKey, 'opt-lbl'),
        'opt-suffix': getCustomClsName(fieldKey, 'opt-suffix'),
      },
    }

    // add bit_virtualized_list to global
    if (!window.bit_virtualized_list) {
      window.bit_virtualized_list = bit_virtualized_list
    }
    if (!window.observeElm) {
      window.observeElm = observeElm
    }
    console.log(configOptions, fldElm)
    const alreadyChecked = options.find(opt => opt.check)
    if (alreadyChecked) configOptions.defaultCurrencyKey = alreadyChecked.i
    currencyFieldRef.current = new BitCurrencyField(fldElm, configOptions)
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
            className={`${fieldKey}-currency-fld-wrp ${getCustomClsName(fieldKey, 'currency-fld-wrp')} ${fieldData.valid.disabled ? 'disabled' : ''} ${fieldData.valid.readonly ? 'readonly' : ''}`}
            ref={currencyWrapElmRef}
            {...getCustomAttributes(fieldKey, 'currency-fld-wrp')}
          >
            <input
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-currency-hidden-input`}
              {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
              {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
            />
            <div className={`${fieldKey}-currency-inner-wrp`}>
              <div
                data-testid={`${fieldKey}-dpd-wrp`}
                className={`${fieldKey}-dpd-wrp`}
                role="combobox"
                aria-controls="currency-dropdown"
                aria-live="assertive"
                aria-labelledby="currency-label-2"
                aria-expanded="false"
                tabIndex={fieldData.valid.disabled ? '-1' : '0'}
              >
                {selectedFlagImage && (
                  <div className={`${fieldKey}-selected-currency-wrp`}>
                    <img
                      data-dev-selected-currency-img={fieldKey}
                      alt="Selected currency image"
                      aria-hidden="true"
                      className={`${fieldKey}-selected-currency-img ${getCustomClsName(fieldKey, 'selected-currency-img')}`}
                      src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                      {...getCustomAttributes(fieldKey, 'selected-currency-img')}
                    />
                  </div>
                )}
                <div className={`${fieldKey}-dpd-down-btn dpd-down-btn`}>
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
                data-testid={`${fieldKey}-crncy-amnt-inp`}
                aria-label="Currency Input"
                type="text"
                className={`${fieldKey}-currency-amount-input currency-amount-input`}
                tabIndex={fieldData.valid.disabled ? '-1' : '0'}
              />
              {selectedCurrencyClearable && (
                <button
                  data-testid={`${fieldKey}-inp-clr-btn`}
                  data-dev-input-clear-btn={fieldKey}
                  type="button"
                  title="Clear value"
                  className={`${fieldKey}-input-clear-btn ${getCustomClsName(fieldKey, 'input-clear-btn')}`}
                  {...getCustomAttributes(fieldKey, 'input-clear-btn')}
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
                  data-dev-opt-search-wrp={fieldKey}
                  className={`${fieldKey}-option-search-wrp ${getCustomClsName(fieldKey, 'opt-search-wrp')}`}
                  {...getCustomAttributes(fieldKey, 'opt-search-wrp')}
                >
                  <input
                    data-testid={`${fieldKey}-opt-srch-inp`}
                    data-dev-opt-search-input={fieldKey}
                    type="search"
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder={fieldData.config.searchPlaceholder}
                    autoComplete="off"
                    tabIndex="-1"
                    {...getCustomAttributes(fieldKey, 'opt-search-input')}
                  />
                  <svg
                    className={`${fieldKey}-opt-search-icn ${getCustomClsName(fieldKey, 'opt-search-icn')}`}
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
                    {...getCustomAttributes(fieldKey, 'opt-search-icn')}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {searchClearable && (
                    <button
                      data-testid={`${fieldKey}-srch-clr-btn`}
                      data-dev-search-clear-btn={fieldKey}
                      type="button"
                      aria-label="Clear search"
                      className={`${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                      tabIndex="-1"
                      {...getCustomAttributes(fieldKey, 'search-clear-btn')}
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
                  )}

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
