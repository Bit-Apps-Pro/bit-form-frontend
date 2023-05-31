/* eslint-disable react/jsx-props-no-spreading */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Cooltip from '../../Utilities/Cooltip'

export default function FileLblProperty({
  placeholder, type, title, inputType = 'text', max = '', min = '', coolTip = '',
}) {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])

  const setFieldProperty = (e, typ) => {
    const { value } = e.target
    if (Number(max) < value && max !== '') {
      return true
    }
    if (value) {
      fieldData.config[typ] = value
    } else {
      delete fieldData.config[typ]
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => create(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <div className={css(ut.flxcb)}>
      <div className={css({ flx: 'align-center' }, ut.w4, FieldStyle.hover_tip, FieldStyle.labelTip)}>
        <label htmlFor={type} className={css(ut.fw500)}>{__(title)}</label>
        <Cooltip width={250} icnSize={17} className="hover-tip">
          <div className={css(ut.tipBody)}>
            {coolTip}
          </div>
        </Cooltip>
      </div>
      <input
        placeholder={placeholder}
        className={css(FieldStyle.input, ut.w5)}
        value={fieldData?.config?.[type]}
        type={inputType}
        onChange={(e) => setFieldProperty(e, type)}
        {...inputType === 'number' && { max }}
        {...inputType === 'number' && { min }}
      />
    </div>
  )
}
