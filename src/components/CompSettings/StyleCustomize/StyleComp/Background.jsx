import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import BtnGrp from '../ChildComp/BtnGrp'
import ColorPicker from '../ChildComp/ColorPicker'
import usePseudo from '../ChildComp/usePseudo'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'

export default function Background({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const [pseudo, pcls, setPseudo] = usePseudo(cls)
  const bgClr = style?.[pcls]?.background || style?.[cls]?.background
  const bgTyp = bgClr ? 'Color' : 'None'

  const setBG = colr => {
    const clr = 'type' in colr ? `${colr.style})` : colr.style
    styleDispatch({ apply: [{ cls: pcls, property: 'background', delProp: false, value: clr }], brkPoint })
  }

  const setBgTyp = typ => {
    const actn = { apply: [{ cls: pcls, property: 'background', delProp: false, value: 'rgba(242, 246, 249, 0.59)' }], brkPoint }
    if (typ === 'None') {
      actn.apply[0].delProp = true
    }
    styleDispatch(actn)
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Background">
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
          value={bgTyp}
          onChange={setBgTyp}
          btns={[
            { lbl: 'Color', icn: 's' },
            { lbl: 'None', icn: 'N' },
          ]}
        />
      </div>
      {bgTyp !== 'None' && (
        <div className="flx flx-between mt-2">
          <span className="f-5">Color Fill</span>
          <ColorPicker value={bgClr} onChange={setBG} />
        </div>
      )}
      Picture
    </StyleAccordion>
  )
}
