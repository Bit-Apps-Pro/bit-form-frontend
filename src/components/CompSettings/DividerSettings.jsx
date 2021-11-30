/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId, $styles } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function DividerSettings() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useRecoilState($styles)

  const dividerCLass = `.${fldKey}-divider`
  const { 'border-width': borderWidth, 'border-style': borderStyle } = styles.fields[fldKey].classes[dividerCLass]

  const inputHandler = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[dividerCLass][type] = val
    }))
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />
      <br />
      <div className={css(ut.flxcb)}>
        <span className={css(ut.fw500, ut.ml2)}>Border Type</span>
        <div className={css(ut.flxcb, ut.mr2, ut.w3)}>
          <select className={css(style.select)} value={borderStyle} onChange={(e) => inputHandler(e.target.value, 'border-style')}>
            <option value="dotted">dotted</option>
            <option value="dashed">dashed</option>
            <option value="solid">solid</option>
            <option value="double">double</option>
            <option value="groove">groove</option>
            <option value="ridge">ridge</option>
            <option value="inset">inset</option>
            <option value="outset">outset</option>
            <option value="none">none</option>
            <option value="hidden">hidden</option>
          </select>
        </div>
      </div>
      <br />
      <div className={css(ut.flxcb)}>
        <span className={css(ut.fw500, ut.ml2)}>Border Width</span>
        <div className={css(ut.flxcb, ut.mr2)}>
          <SizeControl
            className={css(ut.mt1)}
            label=""
            width={89}
            options={['px']}
            value={borderWidth}
            inputHandler={(e) => inputHandler(e.value, 'border-width')}
          />
        </div>
      </div>
    </div>
  )
}
const style = {
  select: {
    fs: 14,
    fw: 500,
    w: '96%',
    bd: 'var(--b-79-96) !important',

    oe: 'none !important',
    ae: 'auto !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    p: '0 !important',
    mt: 10,
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },
}
export default DividerSettings