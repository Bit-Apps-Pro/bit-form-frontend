import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'

export default function Gap({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const gridGap = style?.['._frm-g']?.gap || '0px 0px'
  const setGridGap = value => {
    styleDispatch({ apply: [{ cls: '._frm-g', property: 'gap', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Block Gap">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: 'd', lbl: 'Column Gap' },
          { icn: 'd', lbl: 'Row Gap' },
          { icn: <span className="btcd-icn icn-settings" />, lbl: 'Both Side Gap' },
        ]}
        className="btc-range"
        unit="px"
        maxRange={50}
        value={gridGap}
        onChange={setGridGap}
      />
    </StyleAccordion>
  )
}
