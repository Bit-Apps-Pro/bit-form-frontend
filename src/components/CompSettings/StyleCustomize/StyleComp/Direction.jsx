/* eslint-disable no-undef */
import StyleAccordion from '../ChildComp/StyleAccordion';

export default function Direction({ style, cls, styleConfig, styleDispatch, brkPoint }) {
  const dir = style?.[cls]?.direction || 'ltr'

  const setDirecation = value => {
    const property = 'direction'
    styleDispatch({ apply: [{ cls, property, delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Direction">
      <div className="mt-2 flx flx-between">
        <span className="f-5">Content Direction</span>
        <select value={dir} className="btcd-paper-inp w-7" onChange={e => setDirecation(e.target.value)}>
          <option value="ltr">Left to Right</option>
          <option value="rtl">Right to Left</option>
        </select>
      </div>
    </StyleAccordion>
  )
}
