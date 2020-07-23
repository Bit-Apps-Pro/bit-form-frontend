import React from 'react'
import Range from '../ChildComp/Range'
import StyleAccordion from '../ChildComp/StyleAccordion'
import BtnGrp from '../ChildComp/BtnGrp'
import ColorPicker from '../ChildComp/ColorPicker'
import usePseudo from '../ChildComp/usePseudo'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'

export default function Borders({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const [pseudo, pcls, setPseudo] = usePseudo(cls)
  const bdrStyle = style?.[pcls]?.['border-style']?.replace(/!important/g, '') || style?.[cls]?.['border-style']?.replace(/!important/g, '') || 'None'
  const bdrClr = style?.[pcls]?.['border-color'] || style?.[cls]?.['border-color']
  const bdrW = style?.[pcls]?.['border-width'] || style?.[cls]?.['border-width']
  const bdrRad = style?.[pcls]?.['border-radius'] || style?.[cls]?.['border-radius']

  const setBdrStyle = bStyle => {
    const actions = [
      { cls: pcls, property: 'border-style', delProp: false, value: 'solid' },
      { cls: pcls, property: 'border-width', delProp: false, value: '1px 1px 1px 1px' },
      { cls: pcls, property: 'border-color', delProp: false, value: 'rgba(0, 0, 0, 1)' },
      { cls: pcls, property: 'border-radius', delProp: false, value: '0px 0px 0px 0px' },
    ]
    if (bStyle === 'None') {
      actions[0].delProp = true
      actions[1].delProp = true
      actions[2].delProp = true
      actions[3].delProp = true
    } else {
      // actions[0].value = styleConfig.important ? `${bStyle}!important` : bStyle
      actions[0].value = bStyle
      if (style?.[pcls]?.['border-width']) {
        actions[1].value = style?.[pcls]?.['border-width']
      }
      if (style?.[pcls]?.['border-color']) {
        actions[2].value = style?.[pcls]?.['border-color']
      }
      if (style?.[pcls]?.['border-radius']) {
        actions[3].value = style?.[pcls]?.['border-radius']
      }
    }
    styleDispatch({ apply: actions, brkPoint })
  }

  const setBdr = (property, val) => {
    const value = styleConfig.important ? `${val}!important` : val
    styleDispatch({ apply: [{ cls: pcls, property, delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Border">
      {('hover' in styleConfig
        || 'focus' in styleConfig
        || 'responsive' in styleConfig)
        && (
          <div className="flx flx-between">
            {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}
            <BtnGrp
              className="txt-center"
              value={pseudo}
              onChange={setPseudo}
              btns={[
                { lbl: 'Default', icn: 'Default' },
                ...('hover' in styleConfig ? [{ lbl: 'On Mouse Over', icn: 'Hover' }] : []),
                ...('focus' in styleConfig ? [{ lbl: 'On Focus', icn: 'Focus' }] : []),
              ]}
            />
          </div>
        )}
      <div className="flx flx-between mt-2">
        <span className="f-5">Type</span>
        <BtnGrp
          value={bdrStyle}
          onChange={setBdrStyle}
          btns={[
            { lbl: 'solid', icn: 's' },
            { lbl: 'dotted', icn: 's' },
            { lbl: 'dashed', icn: 's' },
            { lbl: 'double', icn: 's' },
            { lbl: 'None', icn: 's' },
          ]}
        />
      </div>

      {bdrClr && (
        <div className="flx flx-between mt-2">
          <span className="f-5">Border Color</span>
          <ColorPicker alwGradient={false} value={bdrClr} onChange={clr => setBdr('border-color', clr.style)} />
        </div>
      )}

      {bdrW && (
        <div className="mt-2">
          <span className="f-5">Border Width</span>
          <Range
            info={[
              { icn: 'd', lbl: 'Border Top' },
              { icn: 'd', lbl: 'Border Right' },
              { icn: 'd', lbl: 'Border Bottom' },
              { icn: 'd', lbl: 'Border Left' },
              { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
            ]}
            className="btc-range"
            unit="px"
            maxRange={20}
            value={bdrW}
            onChange={val => setBdr('border-width', val)}
          />
        </div>
      )}
      {bdrRad && (
        <div className="mt-2">
          <span className="f-5">Border Radius</span>
          <Range
            info={[
              { icn: 'd', lbl: 'Radius Top' },
              { icn: 'd', lbl: 'Radius Right' },
              { icn: 'd', lbl: 'Radius Bottom' },
              { icn: 'd', lbl: 'Radius Left' },
              { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
            ]}
            className="btc-range"
            unit="px"
            maxRange={30}
            value={bdrRad}
            onChange={val => setBdr('border-radius', val)}
          />
        </div>
      )}
    </StyleAccordion>
  )
}
