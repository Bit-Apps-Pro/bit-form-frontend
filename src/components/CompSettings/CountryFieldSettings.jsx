import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
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
import PlaceholderSettings from './CompSettingsUtils/PlaceholderSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

const CountryFieldSettings = () => {
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const [optionMdl, setOptionMdl] = useState(false)
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''
  const { options } = fieldData

  const { selectedFlagImage,
    selectedCountryClearable,
    searchClearable,
    optionFlagImage,
    detectCountryByIp,
    detectCountryByGeo,
    showSearchPh,
    searchPlaceholder } = fieldData.config

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const handleOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].options = newOpts }))
  }

  const handleConfigChange = (val, name) => {
    fieldData.config[name] = val
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

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

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <PlaceholderSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        title={__('Search Placeholder', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={toggleSearchPlaceholder}
        toggleChecked={showSearchPh}
        open={showSearchPh}
        disable={!showSearchPh}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
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

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Show Selected File Image:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedFlagImage')}
        isChecked={selectedFlagImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Selected Country Clearable:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedCountryClearable')}
        isChecked={selectedCountryClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Search Clearable:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'searchClearable')}
        isChecked={searchClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Option Flag Image:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'optionFlagImage')}
        isChecked={optionFlagImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Detect Country By IP:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByIp')}
        isChecked={detectCountryByIp}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Detect Country By Geo:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'detectCountryByGeo')}
        isChecked={detectCountryByGeo}
      />

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <button onClick={openOptionModal} className={css(app.btn, { my: 0 })} type="button">
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

    </>
  )
}

export default CountryFieldSettings
