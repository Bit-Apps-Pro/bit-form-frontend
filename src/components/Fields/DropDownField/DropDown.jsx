/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
import { memo, useEffect, useRef } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName, selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import DropdownField from './dropdown-filed-script'

function DropDown({ fieldKey, formID, styleClasses, attr, onBlurHandler, resetFieldValue, isBuilder }) {
  const dropdownWrapElmRef = useRef(null)
  const dropdownFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const { optionsList, ph } = fieldData
  const { activeList, optionIcon } = fieldData.config

  useEffect(() => {
    if (!dropdownWrapElmRef?.current) {
      dropdownWrapElmRef.current = selectInGrid(`.${fieldKey}-dpd-fld-wrp`)
    }
    const fldConstructor = dropdownFieldRef.current
    const fldElm = dropdownWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { options, ph } = fieldData
    const { selectedOptImage, selectedOptClearable, searchClearable, searchPlaceholder, maxHeight, multipleSelect, selectedOptImgSrc, closeOnSelect } = fieldData.config

    const configOptions = {
      fieldKey,
      selectedOptImage,
      selectedOptClearable,
      searchClearable,
      optionIcon,
      maxHeight,
      multipleSelect,
      placeholder: ph,
      searchPlaceholder,
      selectedOptImgSrc,
      closeOnSelect,
      activeList,
    }
    dropdownFieldRef.current = new DropdownField(fldElm, configOptions)
  }, [fieldData])
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div
          className={`${fieldKey}-dpd-fld-container ${getCustomClsName(fieldKey, 'dpd-fld-container')}`}
        >
          <div
            data-dev-dpd-fld-wrp={fieldKey}
            className={`${fieldKey}-dpd-fld-wrp ${getCustomClsName(fieldKey, 'dpd-fld-wrp')} ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`}
            ref={dropdownWrapElmRef}
            {... { ...getCustomAttributs(fieldKey, 'dpd-fld-wrp') }}
          >
            <input
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-dpd-hidden-input ${getCustomClsName(fieldKey, 'dpd-hidden-input')}`}
              {...'disabled' in fieldData && { disabled: fieldData.disabled }}
              {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
            />
            <div
              data-dev-dpd-fld-wrp={fieldKey}
              className={`${fieldKey}-dpd-wrp ${getCustomClsName(fieldKey, 'dpd-wrp')}`}
              role="combobox"
              aria-controls=""
              aria-live="assertive"
              aria-expanded="false"
              tabIndex="0"
              aria-label="Dropdown"
              {... { ...getCustomAttributs(fieldKey, 'dpd-wrp') }}
            >
              <div className={`${fieldKey}-selected-opt-wrp ${getCustomClsName(fieldKey, 'selected-opt-wrp')}`}>
                {fieldData.config.selectedOptImage && (
                  <img
                    data-dev-selected-opt-img={fieldKey}
                    className={`${fieldKey}-selected-opt-img ${getCustomClsName(fieldKey, 'selected-opt-img')}`}
                    aria-hidden="true"
                    alt="selected option icon"
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                    {... { ...getCustomAttributs(fieldKey, 'selected-opt-img') }}
                  />
                )}
                <span className={`${fieldKey}-selected-opt-lbl ${getCustomClsName(fieldKey, 'selected-opt-lbl')}`}>{ph}</span>
              </div>
              <div className={`${fieldKey}-dpd-btn-wrp ${getCustomClsName(fieldKey, 'dpd-btn-wrp')}`}>
                <button
                  type="button"
                  aria-label="Clear selected option value"
                  data-dev-selected-opt-clear-btn={fieldKey}
                  className={`${fieldKey}-selected-opt-clear-btn ${getCustomClsName(fieldKey, 'selected-opt-clear-btn')}`}
                  {... { ...getCustomAttributs(fieldKey, 'selected-opt-clear-btn') }}
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
                <div className={`${fieldKey}-dpd-down-btn ${getCustomClsName(fieldKey, 'dpd-down-btn')}`}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    title="Down icon"
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
            <div className={`${fieldKey}-option-wrp ${getCustomClsName(fieldKey, 'option-wrp')}`}>
              <div className={`${fieldKey}-option-inner-wrp ${getCustomClsName(fieldKey, 'option-inner-wrp')}`}>
                <div className={`${fieldKey}-option-search-wrp ${getCustomClsName(fieldKey, 'option-search-wrp')}`}>
                  <input
                    type="search"
                    data-dev-opt-search-input={fieldKey}
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder="Search Country"
                    aria-label="Search Options"
                    aria-hidden="true"
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
                    aria-label="Clear search"
                    data-dev-search-clear-btn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                    tabIndex="-1"
                    {... { ...getCustomAttributs(fieldKey, 'search-clear-btn') }}
                  >
                    <svg
                      width="13"
                      height="13"
                      role="img"
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
                {
                  optionsList.map((listObj, index) => {
                    const listName = Object.keys(listObj)[0]
                    const options = Object.values(listObj)[0]
                    let dataIndex = 0
                    return (
                      <ul
                        className={`${fieldKey}-option-list ${getCustomClsName(fieldKey, 'option-list')} ${activeList === index ? 'active-list' : ''}`}
                        aria-hidden="true"
                        aria-label="Option List"
                        data-list={listName}
                        tabIndex="-1"
                        role="listbox"
                      >
                        {
                          options.map(opt => {
                            if (opt.type) {
                              return (
                                <>
                                  <li data-index={dataIndex++} className={`${fieldKey}-option ${fieldKey}-opt-group-title ${getCustomClsName(fieldKey, 'opt-group-title')}`}>
                                    <span className="opt-lbl">{opt.title}</span>
                                  </li>
                                  {opt.childs.map(opt2 => (
                                    <li
                                      data-dev-option={fieldKey}
                                      data-index={dataIndex++}
                                      data-value={opt2.val}
                                      className={`${fieldKey}-option ${fieldKey}-opt-group-child ${getCustomClsName(fieldKey, 'option-group-child')}`}
                                      role="option"
                                      aria-selected="false"
                                      tabIndex="-1"
                                      {... { ...getCustomAttributs(fieldKey, 'option') }}
                                    >
                                      <span className={`${fieldKey}-opt-lbl-wrp ${getCustomClsName(fieldKey, 'opt-lbl-wrp')}`}>
                                        {optionIcon && (
                                          <img
                                            className={`${fieldKey}-opt-icn`}
                                            src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                                            alt="BD"
                                            loading="lazy"
                                          />
                                        )}
                                        <span data-dev-opt-lbl={fieldKey} className="opt-lbl">{opt2.lbl}</span>
                                      </span>
                                      <span className="opt-prefix" />
                                    </li>
                                  ))}

                                </>
                              )
                            } return (
                              <li
                                data-dev-option={fieldKey}
                                data-index={dataIndex++}
                                data-value={opt.val}
                                className={`${fieldKey}-option`}
                                role="option"
                                aria-selected="false"
                                tabIndex="-1"
                                {... { ...getCustomAttributs(fieldKey, 'option') }}
                              >
                                <span className={`${fieldKey}-opt-lbl-wrp`}>
                                  {optionIcon && (
                                    <img
                                      className={`${fieldKey}-opt-icn ${getCustomClsName(fieldKey, 'opt-icn')}`}
                                      src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                                      alt="BD"
                                      loading="lazy"
                                    />
                                  )}
                                  <span data-dev-opt-lbl={fieldKey} className="opt-lbl">{opt.lbl}</span>
                                </span>
                                <span className="opt-prefix" />
                              </li>
                            )
                          })
                        }

                      </ul>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}

export default memo(DropDown)
