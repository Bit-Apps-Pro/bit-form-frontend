import StyleAccordion from '../ChildComp/StyleAccordion'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'
import Range from '../ChildComp/Range'
import BorderIcn from '../../../../Icons/BorderIcn'
import { spreadIn4Value } from '../../../../Utils/Helpers'

export default function Margin({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  let margin = style?.[cls]?.margin || '0px 0px 0px 0px'
  margin = spreadIn4Value(margin)

  console.log('wwwwwwwwwwwwwwww', margin)

  const setMargin = val => {
    const value = styleConfig.important ? `${val}!important` : val
    styleDispatch({ apply: [{ cls, property: 'margin', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Margin">
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: <BorderIcn borderWidth="3px 1px 1px 1px" />, lbl: 'Margin Top' },
          { icn: <BorderIcn borderWidth="1px 3px 1px 1px" />, lbl: 'Margin Right' },
          { icn: <BorderIcn borderWidth="1px 1px 3px 1px" />, lbl: 'Margin Bottom' },
          { icn: <BorderIcn borderWidth="1px 1px 1px 3px" />, lbl: 'Margin Left' },
          { icn: <BorderIcn borderWidth="3px 3px 3px 3px" />, lbl: 'All Side' },
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
