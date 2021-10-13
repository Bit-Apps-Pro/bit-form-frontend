import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Back2FldBtn from './Back2FldBtn'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'

export default function ReCaptchaSettigns() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const onInput = ({ target: { name, value } }) => {
    fieldData[name] = value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <div>
      <div className={css(style.section, style.flxColumn)}>
        <Back2FldBtn size="20" className={css(style.btn)} />
        <div>
          <div className={css(style.mainTitle)}>{__('Field Settings', 'bitform')}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__('reCAPTCHA', 'bitform')}</span>
        </div>
      </div>
      <hr className={css(style.divider)} />

      {/* 
      <div className="mb-2">
        <span className="font-w-m">
          {__('Field Type :', 'bitform')}
        </span>
        {__('reCAPTCHA', 'bitform')}
      </div> */}
      <SimpleAccordion
        title="Theme"
        className={css(FieldStyle.fieldSection)}
      >
        <select onChange={onInput} name="theme" value={fieldData.theme} className={css(FieldStyle.input, ut.w10)}>
          <option value="dark">{__('Dark', 'bitform')}</option>
          <option value="light">{__('Light', 'bitform')}</option>
        </select>
      </SimpleAccordion>
      <hr className={css(style.divider)} />
      {/* <div className={css(style.section)}>
        <label htmlFor="recap-thm">
          {__('Theme', 'bitform')}
          <select onChange={onInput} name="theme" value={fieldData.theme} className={css(style.input, ut.w10)}>
            <option value="dark">{__('Dark', 'bitform')}</option>
            <option value="light">{__('Light', 'bitform')}</option>
          </select>
        </label>
      </div> */}
    </div>
  )
}
