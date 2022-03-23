import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
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
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const fieldData = deepCopy(fields[fldKey])
  const { options } = fieldData

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

  const removeImage = () => { }

  console.log('fieldData', fieldData)

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

      <SimpleAccordion
        title={__('Input Format Options', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        // switching
        // toggleAction={hideAdminLabel}
        // toggleChecked={fieldData?.adminLblHide}
        open
      // disable={!fieldData?.adminLblHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <div className={css(FieldStyle.placeholder)}>
            <h4 className={css(ut.m0, FieldStyle.title)}>
              {__('Search Country Placeholder', 'bitform')}
              :
            </h4>
            <AutoResizeInput
              aria-label="Search Country Placeholer"
              placeholder="Type Search Country here..."
              value={fieldData?.config?.searchCountryPlaceholder}
              changeAction={(e) => handleConfigChange(e.target.value, 'searchCountryPlaceholder', 'config')}
            />
          </div>
          <div className={css(FieldStyle.placeholder)}>
            <h4 className={css(ut.m0, FieldStyle.title)}>
              {__('Country Not Found Text', 'bitform')}
              :
            </h4>
            <AutoResizeInput
              aria-label="Country Not Found Text"
              placeholder="Type no country found text here..."
              value={fieldData?.config?.noCountryFoundText}
              changeAction={(e) => handleConfigChange(e.target.value, 'noCountryFoundText', 'config')}
            />
          </div>

          <div className={css(FieldStyle.fieldSection)}>
            <SingleToggle
              title={__('Selected Flag Image :', 'bitform')}
              action={e => handleConfigChange(e.target.checked, 'selectedFlagImage', 'config')}
              isChecked={fieldData.config.selectedFlagImage}
            />
          </div>

          <div className={css(FieldStyle.fieldSection)}>
            <SingleToggle
              title={__('Detect Country By Geo Location:', 'bitform')}
              action={e => handleConfigChange(e.target.checked, 'detectCountryByGeo', 'config')}
              isChecked={fieldData.config.detectCountryByGeo}
            />
          </div>

          <div className={css(FieldStyle.fieldSection)}>
            <SingleToggle
              title={__('Detect Country By IP:', 'bitform')}
              action={e => handleConfigChange(e.target.checked, 'detectCountryByIp', 'config')}
              isChecked={fieldData.config.detectCountryByIp}
            />
          </div>
          <div className={css(FieldStyle.section, FieldStyle.fieldSection)}>
            <span>Placeholder Image</span>
            <button type="button" className={css(ut.icnBtn)} onClick={() => setIconModel('placeholderImage')}>
              <EditIcn size={22} />
            </button>
            <button type="button" className={css(ut.icnBtn)} onClick={() => removeImage('placeholderImage')}>
              <CloseIcn size="13" />
            </button>
          </div>

          {/*
          <div className={css(FieldStyle.fieldSection)}>
            <SingleToggle title={__('Round to Closest Fraction Digits:', 'bitform')} action={e => handleConfigChange(e.target.checked, 'roundToClosestFractionDigits', 'config')} isChecked={fieldData.config.roundToClosestFractionDigits} />
          </div> */}
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <button onClick={openOptionModal} className={css(app.btn)} type="button">
        &nbsp;
        {__('Edit Options', 'bitform')}
      </button>

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
        />
      </Modal>

    </>
  )
}

export default PhoneNumberFieldSettings
