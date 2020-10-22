import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'
import BorderIcn from '../../../../Icons/BorderIcn'
import { spreadIn4Value } from '../../../../Utils/Helpers'

export default function Padding({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  let padding = style?.[cls]?.padding || '0px 0px 0px 0px'
  padding = spreadIn4Value(padding)

  const setPadding = val => {
    const value = styleConfig.important ? `${val}!important` : val
    styleDispatch({ apply: [{ cls, property: 'padding', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Padding">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: <BorderIcn borderWidth="3px 1px 1px 1px" />, lbl: 'Padding Top' },
          { icn: <BorderIcn borderWidth="1px 3px 1px 1px" />, lbl: 'Padding Right' },
          { icn: <BorderIcn borderWidth="1px 1px 3px 1px" />, lbl: 'Padding Bottom' },
          { icn: <BorderIcn borderWidth="1px 1px 1px 3px" />, lbl: 'Padding Left' },
          { icn: <BorderIcn borderWidth="3px 3px 3px 3px" />, lbl: 'All Side' },
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
