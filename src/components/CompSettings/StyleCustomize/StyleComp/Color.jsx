/* eslint-disable no-undef */
import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import BtnGrp from '../ChildComp/BtnGrp'
import ColorPicker from '../ChildComp/ColorPicker'
import usePseudo from '../ChildComp/usePseudo'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'

const setPlceholderPseudo = (cls) => {
  const clss = cls.split(',')
  return `${clss.join('::placeholder,')}::placeholder`
}

export default function Color({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const [pseudo, pcls, setPseudo] = usePseudo(cls)
  const clr = style?.[pcls]?.['color'] || style?.[cls]?.['color']
  const placeholderClr = style?.[setPlceholderPseudo(pcls)]?.['color'] || style?.[setPlceholderPseudo(cls)]?.['color']
  const clrTyp = clr ? 'Color' : 'None'

  const setClr = colr => {
    const value = styleConfig.important ? `${colr.style}!important` : colr.style
    const action = { apply: [{ cls: pcls, property: 'color', delProp: false, value }], brkPoint }
    if (styleConfig.checkBoxColor) {
      action.apply.push({ cls: '.fld>.btcd-ck-wrp span:first-child', property: 'color', delProp: false, value })
    }
    styleDispatch(action)
  }

  const setPlcholderClr = colr => {
    styleDispatch({ apply: [{ cls: setPlceholderPseudo(pcls), property: 'color', delProp: false, value: `${colr.style}!important` }], brkPoint })
  }

  const setClrTyp = typ => {
    const actn = { apply: [{ cls: pcls, property: 'color', delProp: false, value: 'rgba(0, 0, 0, 1)' }], brkPoint }
    if (typ === 'None' && style[cls].color) {
      actn.apply[0].delProp = true
    }
    styleDispatch(actn)
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Color">
      {('hover' in styleConfig
        || 'focus' in styleConfig
        || 'responsive' in styleConfig)
        && (
          <div className="flx flx-between">
            {'responsive' in styleConfig && <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />}

            {('hover' in styleConfig
              || 'focus' in styleConfig)
              && (
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
              )}
          </div>
        )}
      <div className="flx flx-between mt-2">
        <span className="f-5">Text Color</span>
        <BtnGrp
          value={clrTyp}
          onChange={setClrTyp}
          btns={[
            { lbl: 'Color', icn: 's' },
            { lbl: 'None', icn: 'N' },
          ]}
        />
      </div>
      {clrTyp !== 'None' && (
        <div className="flx flx-between mt-2">
          <span className="f-5">Color</span>
          <ColorPicker alwGradient={false} value={clr} onChange={setClr} />
        </div>
      )}
      {'placeholder' in styleConfig && (
        <div className="flx flx-between mt-2">
          <span className="f-5">Placeholder Color</span>
          <ColorPicker alwGradient={false} value={placeholderClr} onChange={setPlcholderClr} />
        </div>
      )}
    </StyleAccordion>
  )
}
