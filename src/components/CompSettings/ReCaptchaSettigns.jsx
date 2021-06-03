import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Back2FldList from './Back2FldList'

export default function ReCaptchaSettigns({ elm, updateData, setElementSetting }) {
  const onInput = ({ target: { name, value } }) => {
    const tmp = deepCopy(elm)
    tmp.data[name] = value
    updateData(tmp)
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">
          {__('Field Type :', 'bitform')}
          {' '}
        </span>
        {__('reCAPTCHA', 'bitform')}
      </div>
      <div>
        <label htmlFor="recap-thm">
          {__('Theme', 'bitform')}
          <select onChange={onInput} name="theme" value={elm.data.theme} className="btcd-paper-inp mt-1">
            <option value="dark">{__('Dark', 'bitform')}</option>
            <option value="light">{__('Light', 'bitform')}</option>
          </select>
        </label>
      </div>
    </div>
  )
}
