/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
import { memo, useEffect, useRef } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import DropdownField from './dropdown-filed-script'

function DropDown({ fieldKey, formID, styleClasses, attr, onBlurHandler, resetFieldValue, isBuilder }) {
  const dropdownWrapElmRef = useRef(null)
  const dropdownFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const { optionsList } = fieldData
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
        <div className={`${fieldKey}-dpd-fld-container`}>
          <div data-dev-dpd-fld-wrp={fieldKey} className={`${fieldKey}-dpd-fld-wrp ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`} ref={dropdownWrapElmRef}>
            <input
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-dpd-hidden-input`}
              {...'disabled' in fieldData && { disabled: fieldData.disabled }}
              {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
            />
            <div
              className={`${fieldKey}-dpd-wrp`}
              role="combobox"
              aria-controls=""
              aria-live="assertive"
              aria-expanded="false"
              tabIndex="0"
              aria-label="Dropdown"
            >
              <div className={`${fieldKey}-selected-opt-wrp`}>
                <img
                  data-dev-selected-opt-img={fieldKey}
                  className={`${fieldKey}-selected-opt-img`}
                  aria-hidden="true"
                  alt="selected option icon"
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                />
                <span className={`${fieldKey}-selected-opt-lbl`}>Select an option</span>
              </div>
              <div className={`${fieldKey}-dpd-btn-wrp`}>
                <button
                  type="button"
                  aria-label="Clear selected option value"
                  data-dev-selected-opt-clear-btn={fieldKey}
                  className={`${fieldKey}-selected-opt-clear-btn`}
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
            <div className={`${fieldKey}-option-wrp`}>
              <div className={`${fieldKey}-option-inner-wrp`}>
                <div className={`${fieldKey}-option-search-wrp`}>
                  <input
                    type="search"
                    data-dev-opt-search-input={fieldKey}
                    className={`${fieldKey}-opt-search-input`}
                    placeholder="Search Country"
                    aria-label="Search Options"
                    aria-hidden="true"
                    tabIndex="-1"
                  />
                  <svg
                    data-dev-opt-search-icn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-opt-search-icn`}
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
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <button
                    type="button"
                    aria-label="Clear search"
                    data-dev-search-clear-btn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn`}
                    tabIndex="-1"
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
                        className={`${fieldKey}-option-list ${activeList === index ? 'active-list' : ''}`}
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
                                  <li data-index={dataIndex++} className={`${fieldKey}-option ${fieldKey}-opt-group-title`}>
                                    <span className="opt-lbl">{opt.title}</span>
                                  </li>
                                  {opt.childs.map(opt2 => (
                                    <li data-index={dataIndex++} data-value={opt2.val} className={`${fieldKey}-option ${fieldKey}-opt-group-child`} role="option" aria-selected="false" tabIndex="-1">
                                      <span className={`${fieldKey}-opt-lbl-wrp`}>
                                        <span className="opt-lbl">{opt2.lbl}</span>
                                      </span>
                                      <span className="opt-prefix" />
                                    </li>
                                  ))}

                                </>
                              )
                            } return (
                              <li data-index={dataIndex++} data-value={opt.val} className={`${fieldKey}-option`} role="option" aria-selected="false" tabIndex="-1">
                                <span className={`${fieldKey}-opt-lbl-wrp`}>
                                  {optionIcon && <img className={`${fieldKey}-opt-icn`} src="test2.jpg" alt="BD" loading="lazy" />}
                                  <span className="opt-lbl">{opt.lbl}</span>
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
                {/* <ul
                  className={`${fieldKey}-option-list active-list`}
                  aria-hidden="true"
                  aria-label="Option List"
                  data-list="dp1"
                  tabIndex="-1"
                  role="listbox"
                >
                  <li data-index="0" data-value="Option 1" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <img className="opt-icn" src="test2.jpg" alt="BD" loading="lazy" />
                      <span className="opt-lbl">Option 1</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="1" data-value="Option 2" className="option disabled-opt" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 2</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="2" data-value="Option 3" className="option disabled-opt" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 3</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="3" className="option opt-group-title">
                    <span className="opt-lbl">Group 1</span>
                  </li>
                  <li data-index="4" data-value="Option 4" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 4</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="5" data-value="Option 5" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 5</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="6" data-value="Option 6" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 6</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="7" className="option opt-group-title">
                    <span className="opt-lbl">Group 2</span>
                  </li>
                  <li
                    data-index="8"
                    data-value="Option 7"
                    className="option disabled-opt opt-group-child"
                    role="option"
                    aria-selected="false"
                    tabIndex="-1"
                  >
                    <span className="opt-lbl-wrp">
                      <span className="opt-icn">😎</span>
                      <span className="opt-lbl">Option 7</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li
                    data-index="9"
                    data-value="Option 8"
                    className="option disabled-opt opt-group-child"
                    role="option"
                    aria-selected="false"
                    tabIndex="-1"
                  >
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 8</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="10" className="option opt-group-title">
                    <span className="opt-lbl">Countries</span>
                  </li>
                  <li data-index="11" data-value="Bangladesh" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Bangladesh</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="12" data-value="India" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">India</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="10" className="option opt-group-title">
                    <span className="opt-lbl">Countries</span>
                  </li>
                  <li data-index="11" data-value="Bangladesh2" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Bangladesh</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="12" data-value="India2" className="option opt-group-child" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">India</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                </ul>
                <ul
                  className={`${fieldKey}-option-list`}
                  aria-hidden="true"
                  aria-label="Option List"
                  data-list="dp2"
                  tabIndex="-1"
                  role="listbox"
                >
                  <li data-index="0" data-value="Option 1" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 1</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="1" data-value="Option 2" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 2</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="2" data-value="Option 3" className="option disabled-opt" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 3</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="4" data-value="Option 4" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 4</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="5" data-value="Option 5" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 5</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                  <li data-index="6" data-value="Option 6" className="option" role="option" aria-selected="false" tabIndex="-1">
                    <span className="opt-lbl-wrp">
                      <span className="opt-lbl">Option 6</span>
                    </span>
                    <span className="opt-prefix" />
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}

export default memo(DropDown)