import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'

export default function Padding({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const padding = style?.[cls]?.['padding'] || '0px 0px 0px 0px'

  const setPadding = val => {
    // console.log('dddddddddddd', val)
    const value = styleConfig.important ? `${val}!important` : val
    styleDispatch({ apply: [{ cls, property: 'padding', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Padding">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: 'd', lbl: 'Padding Top' },
          { icn: 'd', lbl: 'Padding Right' },
          { icn: 'd', lbl: 'Padding Bottom' },
          { icn: 'd', lbl: 'Padding Left' },
          { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
        ]}
        className="btc-range"
        unit="px"
        maxRange={50}
        value={padding}
        onChange={setPadding}
      />
    </StyleAccordion>
  )
}
