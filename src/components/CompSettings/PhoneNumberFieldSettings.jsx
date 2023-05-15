import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { isDev } from '../../Utils/config'
import { __ } from '../../Utils/i18nwrap'
import FieldStyle from '../../styles/FieldStyle.style'
import Btn from '../Utilities/Btn'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import { iconElementLabel } from '../style-new/styleHelpers'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import OptionsListHeightSettings from './CompSettingsUtils/OptionsListHeightSettings'
import PlaceholderSettings from './CompSettingsUtils/PlaceholderSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import EditOptions from './EditOptions/EditOptions'
import Icons from './Icons'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SizeAndPosition from './StyleCustomize/StyleComponents/SizeAndPosition'

const PhoneNumberFieldSettings = () => {
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>

  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''
  const { placeholderImage, options } = fieldData

  const {
    selectedFlagImage,
    selectedCountryClearable,
    searchClearable,
    optionFlagImage,
    detectCountryByIp,
    detectCountryByGeo,
    showSearchPh,
    searchPlaceholder,
    noCountryFoundText,
    inputFormat,
    valueFormat,
    maxHeight,
  } = fieldData.config

  const toggleSearchPlaceholder = (e) => {
    if (e.target.checked) {
      fieldData.config.searchPlaceholder = 'Search Country Here...'
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

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const handleOptions = newOpts => {
    const checkedOpt = newOpts.find(opt => opt.check)
    const allFields = produce(fields, draft => {
      draft[fldKey].options = newOpts
      draft[fldKey].config.defaultCountryKey = checkedOpt ? checkedOpt.i : ''
    })
    setFields(allFields)
    addToBuilderHistory({ event: `Modify Options List: ${fieldData.lbl || fldKey}`, type: 'options_modify', state: { fields: allFields, fldKey } })
  }

  const handleConfigChange = (val, name, config) => {
    fieldData[config][name] = val
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel[name]} '${String(val || 'Off').replace('true', 'On')}': ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }

  const setIconModel = (typ) => {
    setIcnMdl(true)
    setFieldName(typ)
  }

  const removeImage = () => {
    if (fieldData[fieldName]) {
      delete fieldData[fieldName]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      addToBuilderHistory({ event: `${iconElementLabel[fieldName]} Icon Deleted`, type: `delete_${fieldName}`, state: { fldKey, fields: allFields } })
    }
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

      <SubTitleSettings />

      <FieldSettingsDivider />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SizeAndPosition />

      <FieldSettingsDivider />

      <PlaceholderSettings />

      <FieldSettingsDivider />

      <HelperTxtSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="inp-frmt-opt-stng"
        title={__('Input Format Option')}
        className={css(FieldStyle.fieldSection)}
        // switching
        // toggleAction={hideAdminLabel}
        // toggleChecked={fieldData?.adminLblHide}
        // disable={!fieldData?.adminLblHide}
        isPro
        proProperty="inputFormatOptions"
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="inp-frmt-opt-inp"
            aria-label="Input Format Option"
            placeholder="Input Format(Ex: +c #### ### ###)"
            className={css(FieldStyle.input)}
            type="text"
            value={inputFormat}
            onChange={e => handleConfigChange(e.target.value, 'inputFormat', 'config')}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="val-frmt-opt-stng"
        title={__('Value Format Option')}
        className={css(FieldStyle.fieldSection)}
        // switching
        // toggleAction={hideAdminLabel}
        // toggleChecked={fieldData?.adminLblHide}
        // disable={!fieldData?.adminLblHide}
        isPro
        proProperty="valueFormatOptions"
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="val-frmt-opt-inp"
            aria-label="Value Format Option"
            placeholder="Value Format(Ex: +c #### ### ###)"
            className={css(FieldStyle.input)}
            type="text"
            value={valueFormat}
            onChange={e => handleConfigChange(e.target.value, 'valueFormat', 'config')}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion id="nmbr-stng" title="Invalid Error Message:" className={css(FieldStyle.fieldSection)}>
        <ErrorMessageSettings
          id="invalid-err-msg"
          type="invalid"
          title="Invalid Error Message"
          tipTitle="By enabling this feature, user will see the error message when input value is Invalid"
        />
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
        isPro
        proProperty="searchPlaceholder"
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="srch-plchldr-stng-inp"
            aria-label="Placeholer for Country Search"
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
        title={__('Country Not Found Text')}
        className={css(FieldStyle.fieldSection)}
        // switching
        // toggleAction={hideAdminLabel}
        // toggleChecked={fieldData?.adminLblHide}
        // disable={!fieldData?.adminLblHide}
        isPro
        proProperty="countryNotFoundText"
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="cntry-nt-fund-inp"
            aria-label="Country Not Found Text"
            placeholder="Type no country found text here..."
            className={css(FieldStyle.input)}
            type="text"
            value={noCountryFoundText}
            onChange={e => handleConfigChange(e.target.value, 'noCountryFoundText', 'config')}
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
        isPro
        proProperty="selectedOptImage"
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="slctd-clrbl-stng"
        tip="By disabling this option, the selected country clearable button will be hidden"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        title={__('Selected Country Clearable')}
        action={e => handleConfigChange(e.target.checked, 'selectedCountryClearable', 'config')}
        isChecked={selectedCountryClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="srch-clrbl-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, the selected country search clearable button will be hidden"
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
        isPro
        proProperty="optionFlagImage"
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="dtct-cntry-by-ip-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, are not detect county by ip"
        title={__('Detect Country By IP')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByIp', 'config')}
        isChecked={detectCountryByIp}
        isPro
        proProperty="detectCountryByIp"
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="dtct-cntry-by-geo-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, are not detect county by Geo location"
        title={__('Detect Country By Geo')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByGeo', 'config')}
        isChecked={detectCountryByGeo}
        isPro
        proProperty="detectCountryByGeo"
      />

      <FieldSettingsDivider />
      {/* <div className={css(FieldStyle.section, FieldStyle.fieldSection, { pr: '26px !important' })}>
        <span>Placeholder Image</span>
        <div className={css(ut.flxcb)}>
          {placeholderImage && (
            <img src={placeholderImage} alt="Placeholder " width="18" height="18" />
          )}
          <button data-testid="plchldr-img-edt-btn" type="button" className={css(ut.icnBtn)} onClick={() => setIconModel('placeholderImage')}>
            <EditIcn size={22} />
          </button>
          {
            placeholderImage && (
              <button data-testid="plchldr-img-rmv-btn" type="button" className={css(ut.icnBtn)} onClick={() => removeImage('placeholderImage')}>
                <CloseIcn size="13" />
              </button>
            )
          }
        </div>
      </div> */}

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <OptionsListHeightSettings />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <Btn
          dataTestId="edt-opt-stng"
          variant="primary-outline"
          size="sm"
          className={css({ mt: 10 })}
          onClick={openOptionModal}
        >
          {__('Edit Options')}
          <span className={css({ ml: 3, mt: 3, tm: 'rotate(45deg)' })}>
            <CloseIcn size="13" stroke="3" />
          </span>
        </Btn>
      </div>

      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options 2')}
        width="730px"
      >
        <div className="pos-rel">
          <EditOptions
            optionMdl={optionMdl}
            options={options}
            setOptions={newOpts => handleOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            type="radio"
            onlyVisualOptionsTab
            hideNDisabledOptions
          />
        </div>
      </Modal>

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title="Image"
      >
        <div className="pos-rel" />

        <Icons
          iconType={fieldName}
          selected="Upload Image"
          uploadLbl="Upload Image"
          setModal={setIcnMdl}
          addPaddingOnSelect={false}
        />
      </Modal>

    </>
  )
}

const propNameLabel = {
  inputFormat: 'Input Formate Changed to',
  valueFormat: 'Value Formate Changed to',
  noCountryFoundText: 'Country Not Found Text',
  selectedFlagImage: 'Selected Flag Image',
  selectedCountryClearable: 'Selected Country Clearable',
  searchClearable: 'Search Clearable',
  optionFlagImage: 'Option Flag Image',
  detectCountryByIp: 'Detect Country By IP',
  detectCountryByGeo: 'Detect Country By Geo',
}

export default PhoneNumberFieldSettings
