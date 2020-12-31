/* eslint-disable no-undef */
import StyleAccordion from '../ChildComp/StyleAccordion';
import usePseudo from '../ChildComp/usePseudo'
import Range from '../ChildComp/Range'

export default function FontSetting({ style, cls, styleConfig, styleDispatch, brkPoint }) {
  const [, pcls] = usePseudo(cls)
  const fSize = style?.[pcls]?.['font-size'] || style?.[cls]?.['font-size'] || '16px'
  const lineHeight = style?.[pcls]?.['line-height'] || style?.[cls]?.['line-height'] || '1'

  const setFontSize = value => {
    const property = 'font-size'
    const val = styleConfig.important ? `${value}!important` : value
    styleDispatch({ apply: [{ cls: pcls, property, delProp: false, value: val }], brkPoint })
  }

  const setLineHeight = value => {
    const property = 'line-height'
    const val = styleConfig.important ? `${value}!important` : value
    styleDispatch({ apply: [{ cls: pcls, property, delProp: false, value: val }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Font">
      {'size' in styleConfig && (
        <div className="mt-2">
          <span className="f-5">Font Size</span>
          <Range
            info={[
              { icn: <i className="font-w-m"><u>A</u></i>, lbl: 'Font Size' },
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
      {'lineHeight' in styleConfig && (
        <div className="mt-2">
          <span className="f-5">Line height</span>
          <Range
            info={[
              { icn: <i className="font-w-m"><u>A</u></i>, lbl: 'Font Size' },
            ]}
            className="btc-range"
            master={false}
            maxRange={5}
            minRange={1}
            value={lineHeight}
            onChange={setLineHeight}
            step={0.1}
          />
        </div>
      )}
    </StyleAccordion>
  )
}
