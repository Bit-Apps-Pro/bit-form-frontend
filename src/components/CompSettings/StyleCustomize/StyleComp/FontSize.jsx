/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import StyleAccordion from '../ChildComp/StyleAccordion';
import usePseudo from '../ChildComp/usePseudo'
import Range from '../ChildComp/Range'

export default function FontSize({ style, cls, styleConfig, styleDispatch, brkPoint }) {
  const [, pcls] = usePseudo(cls)
  const fSize = style?.[pcls]?.['font-size'] || style?.[cls]?.['font-size'] || '16px'

  const setFontSize = value => {
    const property = 'font-size'
    const val = styleConfig.important ? `${value}!important` : value
    styleDispatch({ apply: [{ cls: pcls, property, delProp: false, value: val }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title={__('Font', 'bitform')}>
      {'size' in styleConfig && (
        <div className="mt-2">
          <span className="f-5">{__('Font Size', 'bitform')}</span>
          <Range
            info={[
              { icn: <i className="font-w-m"><u>A</u></i>, lbl: __('Font Size', 'bitform') },
            ]}
            className="btc-range"
            unit="px"
            master={false}
            maxRange={30}
            minRange={5}
            value={fSize}
            onChange={setFontSize}
          />
        </div>
      )}
    </StyleAccordion>
  )
}
