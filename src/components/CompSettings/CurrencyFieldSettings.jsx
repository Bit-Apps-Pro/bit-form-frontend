import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
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

    console.log('handleConfigChange', val, name, config)
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

      <FieldHideSettings />

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
          <div className={css(ut.ml1, ut.mt1)}>
            <h4 className={css(ut.m0, FieldStyle.title)}>
              {__('Formatter', 'bitform')}
              :
            </h4>
            <select
              className={css(FieldStyle.input)}
              aria-label="Formatter"
              value={fieldData?.inputFormatOptions?.formatter}
              onChange={e => handleConfigChange(e.target.value, 'formatter', 'inputFormatOptions')}
            >
              <option value="none">{__('None', 'bitform')}</option>
              <option value="browser">{__('Browser', 'bitform')}</option>
              <option value="custom">{__('Custom', 'bitform')}</option>
            </select>
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}>
            <SingleToggle title={__('Currency Symbol:', 'bitform')} action={e => handleConfigChange(e.target.checked, 'showCurrencySymbol', 'inputFormatOptions')} isChecked={fieldData.inputFormatOptions.showCurrencySymbol} />
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}>
            <SingleToggle title={__('Round to Closest Integer:', 'bitform')} action={e => handleConfigChange(e.target.checked, 'roundToClosestInteger', 'inputFormatOptions')} isChecked={fieldData.inputFormatOptions.roundToClosestInteger} />
          </div>

          <div className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}>
            <SingleToggle title={__('Round to Closest Fraction Digits:', 'bitform')} action={e => handleConfigChange(e.target.checked, 'roundToClosestFractionDigits', 'inputFormatOptions')} isChecked={fieldData.inputFormatOptions.roundToClosestFractionDigits} />
          </div>
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <button onClick={openOptionModal} className={css(app.btn, { my: 0 })} type="button">
          &nbsp;
          {__('Edit Options', 'bitform')}
        </button>
      </div>

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

export default CurrencyFieldSettings
