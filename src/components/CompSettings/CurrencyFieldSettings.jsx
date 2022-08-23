import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { isDev } from '../../Utils/config'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldNameSettings from './CompSettingsUtils/FieldNameSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

const CurrencyFieldSettings = () => {
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>
  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const [optionMdl, setOptionMdl] = useState(false)
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''
  const { options } = fieldData

  const { selectedFlagImage,
    selectedCurrencyClearable,
    searchClearable,
    optionFlagImage,
    showSearchPh,
    searchPlaceholder,
    noCurrencyFoundText } = fieldData.config

  const { showCurrencySymbol,
    roundToClosestInteger,
    roundToClosestFractionDigits } = fieldData.inputFormatOptions

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const handleOptions = newOpts => {
    const allFields = produce(fields, draft => { draft[fldKey].options = newOpts })
    setFields(allFields)
    addToBuilderHistory({ event: `Modify Options List: ${fieldData.lbl || fldKey}`, type: 'options_modify', state: { fields: allFields, fldKey } })
  }

  const handleConfigChange = (val, name, config) => {
    fieldData[config][name] = val
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel[name]} '${String(val || 'Off').replace('true', 'On')}': ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }

  const toggleSearchPlaceholder = (e) => {
    if (e.target.checked) {
      fieldData.config.searchPlaceholder = 'Search Currency Here...'
      fieldData.config.showSearchPh = true
    } else {
      fieldData.config.searchPlaceholder = ''
      fieldData.config.showSearchPh = false
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${req} Search Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: 'toggle_search_placeholder', state: { fields: allFields, fldKey } })
  }

  function setSearchPlaceholder(e) {
    fieldData.config.searchPlaceholder = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Search Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } })
  }

  if (isDev) {
    window.selectedFieldData = fieldData
  }

  return (
    <>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <FieldSettingsDivider />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSettings />

      <FieldSettingsDivider />

      <HelperTxtSettings />

      <FieldSettingsDivider />

      <FieldNameSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="inp-frmt-opt-stng"
        title={__('Input Format Options')}
        className={css(FieldStyle.fieldSection)}
        // switching
        // toggleAction={hideAdminLabel}
        // toggleChecked={fieldData?.adminLblHide}
        open
      // disable={!fieldData?.adminLblHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <div className={css(ut.ml1, ut.mt1)}>
            <h4 className={css(ut.m0, FieldStyle.title)}>
              {__('Formatter')}
              :
            </h4>
            <select
              data-testid="frmtr-slct"
              className={css(FieldStyle.input)}
              aria-label="Formatter"
              value={fieldData?.inputFormatOptions?.formatter}
              onChange={e => handleConfigChange(e.target.value, 'formatter', 'inputFormatOptions')}
            >
              <option value="none">{__('None')}</option>
              <option value="browser">{__('Browser')}</option>
              <option value="custom">{__('Custom')}</option>
            </select>
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '26px !important', m: 0 })}>
            <SingleToggle
              id="crncy-symbl"
              tip="By disabling this option, the currency symbol will be show"
              title={__('Currency Symbol:')}
              action={e => handleConfigChange(e.target.checked, 'showCurrencySymbol', 'inputFormatOptions')}
              isChecked={showCurrencySymbol}
            />
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '26px !important', m: 0 })}>
            <SingleToggle
              id="rnd-to-clsst-int"
              tip="By disabling this option, the currency symbol will be show"
              title={__('Round to Closest Integer:')}
              action={e => handleConfigChange(e.target.checked, 'roundToClosestInteger', 'inputFormatOptions')}
              isChecked={roundToClosestInteger}
            />
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '26px !important', m: 0 })}>
            <SingleToggle
              id="rnd-to-clsst-frc-dgt"
              tip="By Enabling this option, the Fraction Will Rounded"
              title={__('Round to Closest Fraction Digits:')}
              action={e => handleConfigChange(e.target.checked, 'roundToClosestFractionDigits', 'inputFormatOptions')}
              isChecked={roundToClosestFractionDigits}
            />
          </div>
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="srch-plchldr-stng"
        title={__('Search Placeholder')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the search placeholder text will be remove"
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={toggleSearchPlaceholder}
        toggleChecked={showSearchPh}
        open={showSearchPh}
        disable={!showSearchPh}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="srch-plchldr-stng-inp"
            aria-label="Placeholer for Currency Search"
            placeholder="Type Placeholder here..."
            className={css(FieldStyle.input)}
            type="text"
            value={searchPlaceholder}
            onChange={setSearchPlaceholder}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="cntry-nt-fund-stng"
        title={__('Currency Not Found Text')}
        className={css(FieldStyle.fieldSection)}
      // switching
      // toggleAction={hideAdminLabel}
      // toggleChecked={fieldData?.adminLblHide}
      // disable={!fieldData?.adminLblHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="cntry-nt-fund-inp"
            aria-label="Currency Not Found Text"
            placeholder="Type no Currency found text here..."
            className={css(FieldStyle.input)}
            type="text"
            value={noCurrencyFoundText}
            onChange={e => handleConfigChange(e.target.value, 'noCurrencyFoundText', 'config')}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SingleToggle
        id="shw-slctd-img-stng"
        tip="By disabling this option, the show selected flag image will be hidden"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        title={__('Show Selected Flag Image')}
        action={e => handleConfigChange(e.target.checked, 'selectedFlagImage', 'config')}
        isChecked={selectedFlagImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="slctd-clrbl-stng"
        tip="By disabling this option, the selected currency clearable button will be hidden"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        title={__('Selected Currency Clearable')}
        action={e => handleConfigChange(e.target.checked, 'selectedCurrencyClearable', 'config')}
        isChecked={selectedCurrencyClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="srch-clrbl-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, the selected currency search clearable button will be hidden"
        title={__('Search Clearable')}
        action={e => handleConfigChange(e.target.checked, 'searchClearable', 'config')}
        isChecked={searchClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="opt-icn-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, the option flags image will be hidden"
        title={__('Option Flag Image')}
        action={e => handleConfigChange(e.target.checked, 'optionFlagImage', 'config')}
        isChecked={optionFlagImage}
      />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <button data-testid="edt-opt-stng" onClick={openOptionModal} className={css(app.btn, { my: 0 })} type="button">
          &nbsp;
          {__('Edit Options')}
        </button>
      </div>

      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options')}
      >
        <div className="pos-rel">
          <EditOptions
            optionMdl={optionMdl}
            options={options}
            setOptions={newOpts => handleOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            type="radio"
          />
        </div>
      </Modal>

    </>
  )
}

const propNameLabel = {
  formatter: 'Formatter Changed to',
  showCurrencySymbol: 'Show Currency Symbol',
  roundToClosestInteger: 'Round to closest integer',
  roundToClosestFractionDigits: 'Round to closest Fraction Digit',
  noCurrencyFoundText: 'Currency Not Found Text',
  selectedFlagImage: 'Selected Flag Image',
  selectedCurrencyClearable: 'Selected Country Clearable',
  searchClearable: 'Search Clearable',
  optionFlagImage: 'Option Flag Image',
}

export default CurrencyFieldSettings
