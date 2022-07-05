import { __ } from '../../../../Utils/i18nwrap'
import SimpleAccordion from '../ChildComp/SimpleAccordion'
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
    <SimpleAccordion className="style-acc w-9" title={__('Padding')}>
      {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

      <Range
        info={[
          { icn: <BorderIcn borderWidth="3px 1px 1px 1px" />, lbl: __('Padding Top') },
          { icn: <BorderIcn borderWidth="1px 3px 1px 1px" />, lbl: __('Padding Right') },
          { icn: <BorderIcn borderWidth="1px 1px 3px 1px" />, lbl: __('Padding Bottom') },
          { icn: <BorderIcn borderWidth="1px 1px 1px 3px" />, lbl: __('Padding Left') },
          { icn: <BorderIcn borderWidth="3px 3px 3px 3px" />, lbl: __('All Side') },
        ]}
        className="btc-range"
        unit="px"
        maxRange={50}
        value={padding}
        onChange={setPadding}
      />
    </SimpleAccordion>
  )
}
