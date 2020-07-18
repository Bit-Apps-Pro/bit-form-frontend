import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'

export default function Margin({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const margin = style?.[cls]?.['margin'] || '0px 0px 0px 0px'

  const setMargin = value => {
    styleDispatch({ apply: [{ cls, property: 'margin', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Margin">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: 'd', lbl: 'Margin Top' },
          { icn: 'd', lbl: 'Margin Right' },
          { icn: 'd', lbl: 'Margin Bottom' },
          { icn: 'd', lbl: 'Margin Left' },
          { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
        ]}
        className="btc-range"
        unit="px"
        maxRange={50}
        value={margin}
        onChange={setMargin}
      />
    </StyleAccordion>
  )
}
