/* eslint-disable no-undef */

import { __ } from '../../../../Utils/i18nwrap'
import SimpleAccordion from '../ChildComp/SimpleAccordion'

export default function Direction({ style, cls, styleConfig, styleDispatch, brkPoint }) {
  const dir = style?.[cls]?.direction || 'ltr'

  const setDirecation = value => {
    const property = 'direction'
    styleDispatch({ apply: [{ cls, property, delProp: false, value }], brkPoint })
  }

  return (
    <SimpleAccordion className="style-acc w-9" title={__('Direction')}>
      <div className="mt-2 flx flx-between">
        <span className="f-5">{__('Content Direction')}</span>
        <select value={dir} className="btcd-paper-inp w-7" onChange={e => setDirecation(e.target.value)}>
          <option value="ltr">{__('Left to Right')}</option>
          <option value="rtl">{__('Right to Left')}</option>
        </select>
      </div>
    </SimpleAccordion>
  )
}
