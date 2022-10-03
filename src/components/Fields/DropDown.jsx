/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
import BitDropdownField from 'bit-dropdown-field'
import { observeElm } from 'bit-helpers'
import { memo, useEffect, useRef } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, getDataDevAttrArr, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function DropDown({
  fieldKey, formID, styleClasses, attr, onBlurHandler, resetFieldValue, isBuilder,
}) {
  const dropdownWrapElmRef = useRef(null)
  const dropdownFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const { optionsList, ph } = fieldData
  const { activeList, optionIcon, allowCustomOption } = fieldData.config

  useEffect(() => {
    if (!dropdownWrapElmRef?.current) {
      dropdownWrapElmRef.current = selectInGrid(`.${fieldKey}-dpd-fld-wrp`)
    }
    const fldConstructor = dropdownFieldRef.current
    const fldElm = dropdownWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const {
      selectedOptImage, selectedOptClearable, searchClearable, searchPlaceholder, maxHeight, multipleSelect, selectedOptImgSrc, closeOnSelect,
    } = fieldData.config

    const configOptions = {
      fieldKey,
      selectedOptImage,
      selectedOptClearable,
      searchClearable,
      allowCustomOption,
      optionIcon,
      maxHeight,
      multipleSelect,
      placeholder: ph,
      searchPlaceholder,
      selectedOptImgSrc,
      closeOnSelect,
      activeList,
      attributes: {
        'opt-lbl-wrp': getDataDevAttrArr(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getDataDevAttrArr(fieldKey, 'opt-icn'),
        'opt-lbl': getDataDevAttrArr(fieldKey, 'opt-lbl'),
        'opt-prefix': getDataDevAttrArr(fieldKey, 'opt-prefix'),
      },
      classNames: {
        'opt-lbl-wrp': getCustomClsName(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getCustomClsName(fieldKey, 'opt-icn'),
        'opt-lbl': getCustomClsName(fieldKey, 'opt-lbl'),
        'opt-prefix': getCustomClsName(fieldKey, 'opt-prefix'),
      },
    }

    if (!window.observeElm) {
      window.observeElm = observeElm
    }
    // dropdownFieldRef.current = new BitDropdownField(fldElm, configOptions)
    dropdownFieldRef.current = new BitDropdownField(fldElm, configOptions)
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
            className={`${fieldKey}-dpd-fld-wrp ${getCustomClsName(fieldKey, 'dpd-fld-wrp')} ${fieldData.valid.disabled ? 'disabled' : ''} ${fieldData.valid.readonly ? 'readonly' : ''}`}
            ref={dropdownWrapElmRef}
            {...getCustomAttributes(fieldKey, 'dpd-fld-wrp')}
          >
            <input
              data-testid={`${fieldKey}-dpd-hdn-inp`}
              name={fieldKey}
              type="hidden"
              className={`${fieldKey}-dpd-hidden-input ${getCustomClsName(fieldKey, 'dpd-hidden-input')}`}
              {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
              {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
            />
            <div
              data-testid={`${fieldKey}-dpd-wrp`}
              data-dev-dpd-fld-wrp={fieldKey}
              className={`${fieldKey}-dpd-wrp ${getCustomClsName(fieldKey, 'dpd-wrp')}`}
              role="combobox"
              aria-controls=""
              aria-live="assertive"
              aria-expanded="false"
              tabIndex="0"
              aria-label="Dropdown"
              {...getCustomAttributes(fieldKey, 'dpd-wrp')}
            >
              <div
                data-testid={`${fieldKey}-slctd-opt-wrp`}
                className={`${fieldKey}-selected-opt-wrp ${getCustomClsName(fieldKey, 'selected-opt-wrp')}`}
              >
                {fieldData.config.selectedOptImage && (
                  <img
                    data-testid={`${fieldKey}-slctd-opt-img`}
                    data-dev-selected-opt-img={fieldKey}
                    className={`${fieldKey}-selected-opt-img ${getCustomClsName(fieldKey, 'selected-opt-img')}`}
                    aria-hidden="true"
                    alt="selected option icon"
                    src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"
                    {...getCustomAttributes(fieldKey, 'selected-opt-img')}
                  />
                )}
                <span
                  data-testid={`${fieldKey}-slctd-opt-lbl`}
                  aria-label="Selected Option Label"
                  data-dev-selected-opt-lbl={fieldKey}
                  className={`${fieldKey}-selected-opt-lbl ${getCustomClsName(fieldKey, 'selected-opt-lbl')}`}
                  {...getCustomAttributes(fieldKey, 'selected-opt-lbl')}
                >
                  {ph}
                </span>
              </div>
              <div
                data-testid={`${fieldKey}-dpd-btn-wrp`}
                className={`${fieldKey}-dpd-btn-wrp ${getCustomClsName(fieldKey, 'dpd-btn-wrp')}`}
              >
                <button
                  data-testid={`${fieldKey}-slctd-opt-clr-btn`}
                  type="button"
                  aria-label="Clear selected option value"
                  data-dev-selected-opt-clear-btn={fieldKey}
                  className={`${fieldKey}-selected-opt-clear-btn ${getCustomClsName(fieldKey, 'selected-opt-clear-btn')}`}
                  {...getCustomAttributes(fieldKey, 'selected-opt-clear-btn')}
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
                <div data-dev-option-search-wrp={fieldKey} className={`${fieldKey}-option-search-wrp ${getCustomClsName(fieldKey, 'option-search-wrp')}`}>
                  <input
                    data-testid={`${fieldKey}-opt-srch-inp`}
                    type="search"
                    data-dev-opt-search-input={fieldKey}
                    className={`${fieldKey}-opt-search-input ${getCustomClsName(fieldKey, 'opt-search-input')}`}
                    placeholder="Search Country"
                    aria-label="Search Options"
                    aria-hidden="true"
                    tabIndex="-1"
                    {...getCustomAttributes(fieldKey, 'opt-search-input')}
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
                    {...getCustomAttributes(fieldKey, 'opt-search-icn')}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {/* {allowCustomOption
                    && (
                      <button
                        type="button"
                        aria-label="Add Option"
                        data-dev-custom-opt-btn={fieldKey}
                        className={`${fieldKey}-icn ${fieldKey}-custom-opt-btn ${getCustomClsName(fieldKey, 'custom-opt-btn')}`}
                        tabIndex="-1"
                        {... { ...getCustomAttributes(fieldKey, 'custom-opt-btn') }}
                      >
                        Add Option
                      </button>
                    )} */}
                  <button
                    data-testid={`${fieldKey}-srch-clr-btn`}
                    type="button"
                    aria-label="Clear search"
                    data-dev-search-clear-btn={fieldKey}
                    className={`${fieldKey}-icn ${fieldKey}-search-clear-btn ${getCustomClsName(fieldKey, 'search-clear-btn')}`}
                    tabIndex="-1"
                    {...getCustomAttributes(fieldKey, 'search-clear-btn')}
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
                        key={`list-option-${index * 2}`}
                        className={`${fieldKey}-option-list ${getCustomClsName(fieldKey, 'option-list')} ${activeList === index ? 'active-list' : ''}`}
                        aria-hidden="true"
                        aria-label="Option List"
                        data-list={listName}
                        tabIndex="-1"
                        role="listbox"
                        {...getCustomAttributes(fieldKey, 'option-list')}
                      >
                        {allowCustomOption && (
                          <li
                            data-testid={`${fieldKey}-opt-${dataIndex}`}
                            data-dev-option={fieldKey}
                            data-index={dataIndex++}
                            data-value="create-opt"
                            className="option create-opt"
                            role="option"
                            aria-selected="false"
                            tabIndex="-1"
                            {...getCustomAttributes(fieldKey, 'option')}
                            style={{ display: 'none' }}
                          >
                            <span
                              data-dev-opt-lbl-wrp={fieldKey}
                              className={`opt-lbl-wrp ${getCustomClsName(fieldKey, 'opt-lbl-wrp')}`}
                              {...getCustomAttributes(fieldKey, 'opt-lbl-wrp')}
                            >
                              <span data-dev-opt-lbl={fieldKey} className="opt-lbl">Create: </span>
                            </span>
                            <span className="opt-prefix" />
                          </li>
                        )}
                        {
                          options.map((opt, indx) => {
                            if (opt.type) {
                              return (
                                <>
                                  <li
                                    key={`option-grp-ttl-${indx * 4}`}
                                    data-testid={`${fieldKey}-opt-${dataIndex}`}
                                    data-index={dataIndex++}
                                    className={`option opt-group-title ${getCustomClsName(fieldKey, 'opt-group-title')}`}
                                    {...getCustomAttributes(fieldKey, 'opt-group-title')}
                                  >
                                    <span className="opt-lbl">{opt.title}</span>
                                  </li>
                                  {opt.childs.map((opt2, indx2) => (
                                    <li
                                      key={`opt-grp-child-${indx2 + 9}`}
                                      data-testid={`${fieldKey}-opt-${dataIndex}`}
                                      data-dev-option={fieldKey}
                                      data-index={dataIndex++}
                                      data-value={opt2.val || opt2.lbl}
                                      className={`option opt-group-child ${getCustomClsName(fieldKey, 'option-group-child')}`}
                                      role="option"
                                      aria-selected="false"
                                      tabIndex="-1"
                                      {...getCustomAttributes(fieldKey, 'option')}
                                    >
                                      <span
                                        data-dev-opt-lbl-wrp={fieldKey}
                                        className={`opt-lbl-wrp ${getCustomClsName(fieldKey, 'opt-lbl-wrp')}`}
                                        {...getCustomAttributes(fieldKey, 'opt-lbl-wrp')}
                                      >
                                        {optionIcon && (
                                          <img
                                            className="opt-icn"
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
                                key={`option-${indx + 5}`}
                                data-testid={`${fieldKey}-opt-${dataIndex}`}
                                data-dev-option={fieldKey}
                                data-index={dataIndex++}
                                data-value={opt.val || opt.lbl}
                                className="option"
                                role="option"
                                aria-selected="false"
                                tabIndex="-1"
                                {...getCustomAttributes(fieldKey, 'option')}
                              >
                                <span
                                  data-dev-opt-lbl-wrp={fieldKey}
                                  className={`opt-lbl-wrp ${getCustomClsName(fieldKey, 'opt-lbl-wrp')}`}
                                  {...getCustomAttributes(fieldKey, 'opt-lbl-wrp')}
                                >
                                  {optionIcon && (
                                    <img
                                      className={`opt-icn ${getCustomClsName(fieldKey, 'opt-icn')}`}
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
