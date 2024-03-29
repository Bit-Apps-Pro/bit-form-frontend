/* eslint-disable react/jsx-props-no-spreading */
import BitCountryField from 'bit-country-field/src/bit-country-field'
import { observeElm } from 'bit-helpers/src'
import bitVirtualizedList from 'bit-virtualized-list/src/bit-virtualized-list'
import { useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'
import { $bits, $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, getDataDevAttrArr, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

const CountryField = ({ fieldKey, formID, attr, styleClasses }) => {
  // console.log(bit_virtualized_list, '###');
  const countryWrapElmRef = useRef(null)
  const countryFieldRef = useRef(null)
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]
  const bits = useAtomValue($bits)
  const { options, ph } = fieldData

  useEffect(() => {
    const iFrameWindow = document.getElementById('bit-grid-layout').contentWindow
    if (!countryWrapElmRef?.current) {
      countryWrapElmRef.current = selectInGrid(`.${fieldKey}-country-fld-wrp`)
    }
    const fldConstructor = countryFieldRef.current
    const fldElm = countryWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const {
      selectedFlagImage,
      selectedCountryClearable,
      searchClearable,
      optionFlagImage,
      detectCountryByIp,
      detectCountryByGeo,
      defaultValue,
      searchPlaceholder,
      noCountryFoundText,
    } = fieldData.config

    if (!iFrameWindow.bit_virtualized_list) {
      iFrameWindow.bit_virtualized_list = bitVirtualizedList
    }
    if (!iFrameWindow.observeElm) {
      iFrameWindow.observeElm = observeElm
    }

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
      noCountryFoundText,
      options,
      assetsURL: `${bits.assetsURL}/../static/countries/`,
      document: document.getElementById('bit-grid-layout').contentDocument,
      window: iFrameWindow,
      attributes: {
        option: getDataDevAttrArr(fieldKey, 'option'),
        'opt-lbl-wrp': getDataDevAttrArr(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getDataDevAttrArr(fieldKey, 'opt-icn'),
        'opt-lbl': getDataDevAttrArr(fieldKey, 'opt-lbl'),
      },
      classNames: {
        option: getCustomClsName(fieldKey, 'option'),
        'opt-lbl-wrp': getCustomClsName(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getCustomClsName(fieldKey, 'opt-icn'),
        'opt-lbl': getCustomClsName(fieldKey, 'opt-lbl'),
      },
    }

    countryFieldRef.current = new BitCountryField(fldElm, configOptions)
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
            className={`${fieldKey}-country-fld-wrp ${getCustomClsName(fieldKey, 'country-fld-wrp')} ${fieldData.valid.disabled ? 'disabled' : ''} ${fieldData.valid.readonly ? 'readonly' : ''}`}
            ref={countryWrapElmRef}
            {...getCustomAttributes(fieldKey, 'country-fld-wrp')}
          >
            <input
              name="country-name"
              type="hidden"
              className={`${fieldKey}-country-hidden-input`}
              {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
              {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
            />
            <div
              data-testid={`${fieldKey}-dpd-wrp`}
              className={`${fieldKey}-dpd-wrp`}
              aria-live="assertive"
              aria-label="Select a Country"
              role="combobox"
              aria-expanded="false"
              tabIndex={fieldData.valid.disabled ? '-1' : '0'}
            >
              <div className={`${fieldKey}-selected-country-wrp`}>
                {fieldData.config.selectedFlagImage && (
                  <img
                    data-dev-selected-country-img={fieldKey}
                    className={`${fieldKey}-selected-country-img ${getCustomClsName(fieldKey, 'selected-country-img')}`}
                    aria-hidden="true"
                    alt="selected country flag"
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                    {...getCustomAttributes(fieldKey, 'selected-country-img')}
                  />
                )}
                <span
                  data-testid={`${fieldKey}-slctd-cntry-lbl`}
                  data-dev-selected-country-lbl={fieldKey}
                  className={`${fieldKey}-selected-country-lbl`}
                >
                  {ph}
                </span>
              </div>
              <div className={`${fieldKey}-dpd-btn-wrp`}>
                {fieldData.config.selectedCountryClearable && (
                  <button
                    data-testid={`${fieldKey}-clr-slctd-cntry-btn`}
                    type="button"
                    title="Clear selected country value"
                    data-dev-inp-clr-btn={fieldKey}
                    className={`${fieldKey}-inp-clr-btn ${getCustomClsName(fieldKey, 'inp-clr-btn')}`}
                    {...getCustomAttributes(fieldKey, 'inp-clr-btn')}
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
                )}
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
            <div className={`${fieldKey}-option-wrp  ${getCustomClsName(fieldKey, 'option-wrp')}`} data-dev-option-wrp={fieldKey} {...getCustomAttributes(fieldKey, 'option-search-wrp')}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div className={`${fieldKey}-option-search-wrp`} data-dev-option-search-wrp={fieldKey}>
                  <input
                    data-testid={`${fieldKey}-opt-srch-inp`}
                    type="search"
                    data-dev-opt-search-input={fieldKey}
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder={fieldData.config.searchPlaceholder}
                    autoComplete="country-name"
                    tabIndex="-1"
                    {...getCustomAttributes(fieldKey, 'opt-search-input')}
                  />
                  <svg
                    data-dev-opt-search-icn={fieldKey}
                    className={`${fieldKey}-opt-search-icn ${getCustomClsName(fieldKey, 'opt-search-icn')}`}
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
                    {...getCustomAttributes(fieldKey, 'opt-search-icn')}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {fieldData.config.searchClearable && (
                    <button
                      data-testid={`${fieldKey}-srch-clr-btn`}
                      type="button"
                      title="Clear search"
                      data-dev-search-clear-btn={fieldKey}
                      className={`${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                      tabIndex="-1"
                      {...getCustomAttributes(fieldKey, 'search-clear-btn')}
                    >
                      <svg
                        width="13"
                        height="13"
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
                  )}
                </div>
                <ul
                  className={`${fieldKey}-option-list ${getCustomClsName(fieldKey, 'option-list')}`}
                  tabIndex="-1"
                  role="listbox"
                  aria-label="country list"
                  data-dev-option-list={fieldKey}
                  {...getCustomAttributes(fieldKey, 'option-list')}
                >
                  <li className="option">
                    <span className="opt-prefix">Prefix</span>
                    <span className="opt-lbl-wrp">
                      <img className="opt-icn" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="Placeholder" />
                      <span className="opt-lbl">Option</span>
                    </span>
                    <span className="opt-suffix">Suffix</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
export default CountryField
