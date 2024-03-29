/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
import BitDropdownField from 'bit-select-field/src/bit-select-field'
import { observeElm } from 'bit-helpers/src'
import { Fragment, memo, useEffect, useRef, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useAtomValue } from 'jotai'
import { $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, getDataDevAttrArr } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function DropDown({
  fieldKey, formID, styleClasses, attr, onBlurHandler, resetFieldValue, isBuilder,
}) {
  const [dropdownWrapElmRef, setDropdownWrapElmRef] = useState(null)
  const dropdownFieldRef = useRef(null)
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]
  const { optionsList, ph } = fieldData
  const { activeList, optionIcon, allowCustomOption } = fieldData.config

  useEffect(() => {
    if (!dropdownWrapElmRef) return
    const fldConstructor = dropdownFieldRef.current
    if (fldConstructor && dropdownWrapElmRef && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const {
      selectedOptImage, selectedOptClearable, searchClearable, searchPlaceholder, maxHeight, multipleSelect, showChip, selectedOptImgSrc, closeOnSelect,
    } = fieldData.config
    const iFrameWindow = document.getElementById('bit-grid-layout').contentWindow
    const configOptions = {
      fieldKey,
      selectedOptImage,
      selectedOptClearable,
      searchClearable,
      allowCustomOption,
      optionIcon,
      maxHeight,
      multipleSelect,
      showChip,
      placeholder: ph,
      searchPlaceholder,
      selectedOptImgSrc,
      closeOnSelect,
      activeList,
      document: document.getElementById('bit-grid-layout').contentDocument,
      window: iFrameWindow,
      attributes: {
        'opt-lbl-wrp': getDataDevAttrArr(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getDataDevAttrArr(fieldKey, 'opt-icn'),
        'opt-lbl': getDataDevAttrArr(fieldKey, 'opt-lbl'),
        'opt-prefix': getDataDevAttrArr(fieldKey, 'opt-prefix'),
        'chip-wrp': getDataDevAttrArr(fieldKey, 'chip-wrp'),
        'chip-lbl': getDataDevAttrArr(fieldKey, 'chip-lbl'),
        'chip-icn': getDataDevAttrArr(fieldKey, 'chip-icn'),
        'chip-clear-btn': getDataDevAttrArr(fieldKey, 'chip-clear-btn'),
      },
      classNames: {
        'opt-lbl-wrp': getCustomClsName(fieldKey, 'opt-lbl-wrp'),
        'opt-icn': getCustomClsName(fieldKey, 'opt-icn'),
        'opt-lbl': getCustomClsName(fieldKey, 'opt-lbl'),
        'opt-prefix': getCustomClsName(fieldKey, 'opt-prefix'),
      },
    }

    if (!iFrameWindow.observeElm) {
      iFrameWindow.observeElm = observeElm
    }
    // dropdownFieldRef.current = new BitDropdownField(dropdownWrapElmRef, configOptions)
    dropdownFieldRef.current = new BitDropdownField(dropdownWrapElmRef, configOptions)
  }, [fieldData, dropdownWrapElmRef])

  const optionsListObj = optionsList.reduce((acc, opt) => {
    const [listName, optData] = Object.entries(opt)[0]
    return { ...acc, [listName]: optData }
  }, {})

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
            ref={setDropdownWrapElmRef}
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
              data-dev-dpd-wrp={fieldKey}
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
                    className={`${fieldKey}-selected-opt-img placeholder-img ${getCustomClsName(fieldKey, 'selected-opt-img')}`}
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
                  className={`${fieldKey}-selected-opt-lbl ${(fieldData.config.multipleSelect && fieldData.config.showChip) ? 'multi-chip' : ''} ${getCustomClsName(fieldKey, 'selected-opt-lbl')}`}
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
            <div className={`${fieldKey}-option-wrp ${getCustomClsName(fieldKey, 'option-wrp')}`} data-dev-option-wrp={fieldKey} {...getCustomAttributes(fieldKey, 'option-search-wrp')}>
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
                    width="18"
                    height="18"
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
                  Object.entries(optionsListObj).map(([listName, opts], listIndex) => (
                    <ul
                      key={listName}
                      className={`${fieldKey}-option-list ${getCustomClsName(fieldKey, 'option-list')}`}
                      aria-hidden="true"
                      aria-label="Option List"
                      data-list={listName}
                      data-list-index={listIndex}
                      data-dev-option-list={fieldKey}
                      tabIndex="-1"
                      role="listbox"
                      {...getCustomAttributes(fieldKey, 'option-list')}
                    >
                      {allowCustomOption && (
                        <li
                          key={`option-${listName}`}
                          data-testid={`${fieldKey}-opt-${listIndex}`}
                          data-dev-option={fieldKey}
                          data-index={listIndex}
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
                      <Options opts={opts} fieldKey={fieldKey} optionIcon={optionIcon} />
                    </ul>
                  ))
                }
                <ul
                  className={`${fieldKey}-option-list ${getCustomClsName(fieldKey, 'option-list')} active-list`}
                  aria-hidden="true"
                  aria-label="Option List"
                  data-dev-option-list={fieldKey}
                  tabIndex="-1"
                  role="listbox"
                  {...getCustomAttributes(fieldKey, 'option-list')}
                />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}

export default memo(DropDown)

const Options = ({ opts, fieldKey, optionIcon, isGroupChild }) => (
  <>
    {
      opts.map((opt, optIndex) => (
        opt.type === 'group' ? (
          <Fragment key={opt.title}>
            <li
              key={`option-grp-ttl-${opt.title}`}
              data-testid={`${fieldKey}-opt-${optIndex}`}
              data-index={optIndex}
              className={`option opt-group-title ${getCustomClsName(fieldKey, 'opt-group-title')}`}
              {...getCustomAttributes(fieldKey, 'opt-group-title')}
            >
              <span className="opt-lbl">{opt.title}</span>
            </li>
            <Options opts={opt.childs} fieldKey={fieldKey} optionIcon={optionIcon} isGroupChild />
          </Fragment>
        ) : (
          <li
            key={`option-${opt.val || opt.lbl}}`}
            data-testid={`${fieldKey}-opt-${optIndex}`}
            data-dev-option={fieldKey}
            data-index={optIndex}
            data-value={opt.val || opt.lbl}
            className={`option ${isGroupChild ? `opt-group-child ${getCustomClsName(fieldKey, 'option-group-child')}` : ''}`}
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
                  src={opt?.img || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"}
                  alt="BD"
                  loading="lazy"
                />
              )}
              <span data-dev-opt-lbl={fieldKey} className="opt-lbl">{opt.lbl}</span>
            </span>
            <span className="opt-prefix" />
          </li>
        )
      ))
    }
  </>
)
