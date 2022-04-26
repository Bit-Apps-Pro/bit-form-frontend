import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function ReCaptchaSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const { theme, size } = fieldData.config
  const fldStyleObj = styles?.fields?.[fldKey]
  const { fieldType, classes } = fldStyleObj
  const wrpCLass = `.${fldKey}-fld-wrp`
  const { 'justify-content': alignment } = classes[wrpCLass] || ''

  function setConfigValue(propName, value) {
    fieldData.config[propName] = value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[wrpCLass].display = 'flex'
      drftStyle.fields[fldKey].classes[wrpCLass][type] = val
    }))
  }

  return (
    <>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <SimpleAccordion
        id="thm-stng"
        title={__('Theme', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <select
            data-testid="thm-slct"
            className={css(FieldStyle.input)}
            aria-label="Theme for ReCaptcha Field"
            placeholder="Select Theme here..."
            value={theme}
            onChange={e => setConfigValue('theme', e.target.value)}
          >
            <option value="dark">{__('Dark', 'bitform')}</option>
            <option value="light">{__('Light', 'bitform')}</option>
          </select>
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      <SimpleAccordion
        id="siz-stng"
        title={__('Size', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <select
            data-testId="siz-slct"
            className={css(FieldStyle.input)}
            aria-label="Size for ReCaptcha Field"
            placeholder="Select Size here..."
            value={size}
            onChange={e => setConfigValue('size', e.target.value)}
          >
            <option value="normal">{__('Normal', 'bitform')}</option>
            <option value="compact">{__('Compact', 'bitform')}</option>
          </select>
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <div className={css(ut.flxcb)}>
          <span className={css(style.label)}>Label Alignment</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            className={css(style.segment)}
            options={[
              { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
              { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
            ]}
            onChange={val => flexDirectionHandle(val, 'justify-content')}
            defaultActive={alignment}
          />
        </div>
      </div>
      <FieldSettingsDivider />
    </>
  )
}
