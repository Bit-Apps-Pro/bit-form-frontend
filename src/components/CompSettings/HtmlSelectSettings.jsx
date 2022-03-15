import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $bits, $fields } from '../../GlobalStates/GlobalStates'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import PlaceholderSettings from './CompSettingsUtils/PlaceholderSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import EditOptions from './EditOptions/EditOptions'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function HtmlSelectSettings() {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>
  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const [optionMdl, setOptionMdl] = useState(false)
  const fieldData = deepCopy(fields[fldKey])
  const options = fieldData.opt

  const handleOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].opt = newOpts }))
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

      <PlaceholderSettings />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <button onClick={() => setOptionMdl(true)} className={css(app.btn, { my: 0 })} type="button">
          &nbsp;
          {__('Edit Options', 'bitform')}
        </button>
      </div>
      <FieldSettingsDivider />
      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={() => setOptionMdl(false)}
        className="o-v"
        title={__('Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
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
    </>
  )
}
