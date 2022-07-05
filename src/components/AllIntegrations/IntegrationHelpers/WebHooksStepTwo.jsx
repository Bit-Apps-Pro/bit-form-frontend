import { useFela } from 'react-fela'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'

export default function WebHooksStepTwo({ step, saveConfig, edit, disabled }) {
  const { css } = useFela()
  return (
    edit
      ? (
        <div className="txt-center w-9 mt-3">
          <button id="secondary-update-btn" onClick={saveConfig} className={`${css(app.btn)} btcd-btn-lg green sh-sm flx`} type="button" disabled={disabled}>
            {__('Save', 'bitform')}
          </button>
        </div>
      )
      : (
        <div className="txt-center" style={{ marginLeft: 210 }}>
          <h2 className="ml-3">{__('Successfully Integrated', 'bitform')}</h2>
          <button id="secondary-update-btn" onClick={saveConfig} className={`${css(app.btn)} btcd-btn-lg green sh-sm`} type="button">
            {__('Finish & Save ', 'bitform')}
            ✔
          </button>
        </div>
      )
  )
}
