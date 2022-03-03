import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import app from '../../styles/app.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSetting from './CompSettingsUtils/HelperTxtSetting'
import SubTitleSetting from './CompSettingsUtils/SubTitleSetting'
import EditOptions from './EditOptions/EditOptions'
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

  console.log('fieldData', fieldData)

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <FieldSettingsDivider />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSetting />

      <FieldSettingsDivider />

      <HelperTxtSetting />

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
            type={fieldData.typ}
          />
        </div>
      </Modal>

    </div>
  )
}

export default CurrencyFieldSettings
