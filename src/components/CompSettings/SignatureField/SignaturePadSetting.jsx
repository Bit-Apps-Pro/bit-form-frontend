/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAtom } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

const msg = {
  penColor: __('Pen Color'),
  backgroundColor: __('Background Color'),
  maxWidth: __('Pen Width'),
  imgTyp: __('Image Type'),
}

export default function SignaturePadSetting() {
  const { fieldKey: fldKey } = useParams()
  const { css } = useFela()
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])

  function inputHandler(e) {
    const { value, name } = e.target

    fieldData.config[name] = value
    setFields(create(fields, draft => { draft[fldKey] = fieldData }))

    addToBuilderHistory({ event: `${msg[name]} changed to ${value}: ${fieldData.txt}`, type: `signature_pad_${name}`, state: { fields, fldKey } })
  }

  return (
    <SimpleAccordion
      id="signature-pad"
      title={__('Signature Pad')}
      className={css(FieldStyle.fieldSection)}
      open
    >
      <div className={css(FieldStyle.placeholder)}>
        <div className={css(s.inpWrp)}>
          <label htmlFor="maxWidth">Pen Width</label>
          <input
            className={css(FieldStyle.input, { w: '30%' })}
            type="text"
            name="maxWidth"
            id="maxWidth"
            min="1"
            max="10"
            value={fieldData.config.maxWidth}
            step="0.1"
            onChange={inputHandler}
          />
        </div>

        <div className={css(s.inpWrp)}>
          <label htmlFor="penColor">Pen Color</label>
          <input
            className={css(FieldStyle.input, { w: '30%' })}
            type="color"
            name="penColor"
            id="penColor"
            value={fieldData.config.penColor}
            onChange={inputHandler}
          />
        </div>
        <div className={css(s.inpWrp)}>
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            className={css(FieldStyle.input, { w: '30%' })}
            type="color"
            name="backgroundColor"
            id="backgroundColor"
            value={fieldData.config.backgroundColor}
            onChange={inputHandler}
          />
        </div>
        <div className={css(s.inpWrp)}>
          <label htmlFor="imgTyp">Image Type</label>
          <select
            className={css(FieldStyle.input, { w: '30%' })}
            name="imgTyp"
            id="imgTyp"
            value={fieldData.config.imgTyp}
            onChange={inputHandler}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/svg+xml">SVG</option>
          </select>
        </div>
      </div>
    </SimpleAccordion>
  )
}

const s = {
  inpWrp: {
    flx: 'center-between',
    mx: 5,
  },
}
