import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'
import XYordinateIcn from '../../../../Icons/XYordinateIcn'

const spreadIn2Val = value => {
  const valArr = value.split(' ')
  if (valArr.length === 2) return value
  if (valArr.length === 1) return Array(2).fill(valArr[0]).join(' ')
}

export default function Gap({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView, formID }) {
  let gridGap = style[`._frm-g-${formID}`]?.gap || '0px 0px'
  gridGap = spreadIn2Val(gridGap)

  const setGridGap = value => {
    styleDispatch({ apply: [{ cls: `._frm-g-${formID}`, property: 'gap', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Block Gap">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: <b>C</b>, lbl: 'Column Gap' },
          { icn: <b>R</b>, lbl: 'Row Gap' },
          { icn: <XYordinateIcn />, lbl: 'Both Side Gap' },
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
