import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
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
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import EditOptions from './EditOptions/EditOptions'
import Icons from './Icons'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

const PhoneNumberFieldSettings = () => {
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>

  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''
  const { placeholderImage, options } = fieldData

  const { selectedFlagImage,
    selectedCountryClearable,
    searchClearable,
    optionFlagImage,
    detectCountryByIp,
    detectCountryByGeo,
    showSearchPh,
    searchPlaceholder,
    noCountryFoundText,
    inputFormat,
    valueFormat } = fieldData.config

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
    addToBuilderHistory(setBuilderHistory, { event: `${req} Search Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setSearchPlaceholder(e) {
    fieldData.config.searchPlaceholder = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Search Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const handleOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].options = newOpts }))
  }

  const handleConfigChange = (val, name, config) => {
    fieldData[config][name] = val
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
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

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSettings />

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
        title={__('Input Format Option', 'bitform')}
        className={css(FieldStyle.fieldSection)}
      // switching
      // toggleAction={hideAdminLabel}
      // toggleChecked={fieldData?.adminLblHide}
      // disable={!fieldData?.adminLblHide}
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
        title={__('Value Format Option', 'bitform')}
        className={css(FieldStyle.fieldSection)}
      // switching
      // toggleAction={hideAdminLabel}
      // toggleChecked={fieldData?.adminLblHide}
      // disable={!fieldData?.adminLblHide}
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

      <SimpleAccordion
        id="srch-plchldr-stng"
        title={__('Search Placeholder', 'bitform')}
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
        title={__('Country Not Found Text', 'bitform')}
        className={css(FieldStyle.fieldSection)}
      // switching
      // toggleAction={hideAdminLabel}
      // toggleChecked={fieldData?.adminLblHide}
      // disable={!fieldData?.adminLblHide}
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
        title={__('Show Selected Flag Image', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedFlagImage', 'config')}
        isChecked={selectedFlagImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="slctd-clrbl-stng"
        tip="By disabling this option, the selected country clearable button will be hidden"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        title={__('Selected Country Clearable', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedCountryClearable', 'config')}
        isChecked={selectedCountryClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="srch-clrbl-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, the selected country search clearable button will be hidden"
        title={__('Search Clearable', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'searchClearable', 'config')}
        isChecked={searchClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="opt-icn-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, the option flags image will be hidden"
        title={__('Option Flag Image', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'optionFlagImage', 'config')}
        isChecked={optionFlagImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="dtct-cntry-by-ip-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, are not detect county by ip"
        title={__('Detect Country By IP', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByIp', 'config')}
        isChecked={detectCountryByIp}
      />

      <FieldSettingsDivider />

      <SingleToggle
        id="dtct-cntry-by-geo-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        tip="By disabling this option, are not detect county by Geo location"
        title={__('Detect Country By Geo', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByGeo', 'config')}
        isChecked={detectCountryByGeo}
      />

      <FieldSettingsDivider />
      <div className={css(FieldStyle.section, FieldStyle.fieldSection, { pr: '26px !important' })}>
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
      </div>

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <button data-testid="edt-opt-stng" onClick={openOptionModal} className={css(app.btn, { my: 0 })} type="button">
          &nbsp;
          {__('Edit Options', 'bitform')}
        </button>
      </div>

      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options', 'bitform')}
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

export default PhoneNumberFieldSettings
