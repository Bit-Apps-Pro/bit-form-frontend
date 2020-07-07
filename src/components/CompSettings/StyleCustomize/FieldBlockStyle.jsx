import React from 'react'
import StyleAccordion from './ChildComp/StyleAccordion'
import BtnGrp from './ChildComp/BtnGrp'
import ColorPicker from './ChildComp/ColorPicker'

function FieldBlockStyle({ blkStyle, styleDispatch, brkPoint, setResponsiveView }) {
  // console.log('ssssss', blkStyle)
  const bgClr = blkStyle.background || 'rgba(0, 0, 0, 1)'
  let bgTyp = 'Transparent'

  if (bgClr !== undefined && bgClr.includes('gradient')) {
    bgTyp = 'Gradient'
  } else if (bgClr !== undefined) {
    bgTyp = 'Solid'
  }

  const tmp = { ...blkStyle }

  const setCss = (val, property) => {
    if (val === '0px 0px 0px 0px') {
      delete tmp[property]
    } else {
      tmp[property] = val
    }
    styleDispatch({ typ: 'fld-wrp', newstyle: tmp })
  }

  const setBgTyp = (typ) => {
    tmp.background = 'rgba(242, 246, 249, 0.59)'
    if (typ === 'Gradient') {
      tmp.background = 'gradientrgba(142, 146, 149, 0.59)'
    } else if (typ === 'Transparent') {
      delete tmp.background
    }
    styleDispatch({ typ: 'fld-wrp', newstyle: tmp })
  }

  return (
    <div>
      <StyleAccordion className="style-acc w-9" title="Background">
        <div className="flx flx-between">
          <span className="f-5">Type</span>
          <BtnGrp
            value={bgTyp}
            onChange={setBgTyp}
            btns={[
              { lbl: 'Solid', icn: 's' },
              { lbl: 'Gradient', icn: 'G' },
              { lbl: 'Transparent', icn: 'T' },
            ]}
          />
        </div>
        {bgTyp !== 'Transparent' && (
          <div className="flx flx-between mt-2">
            <span className="f-5">Color Fill</span>
            <ColorPicker value={bgClr} onChange={clr => setCss(clr.style, 'background')} />
          </div>
        )}
        Picture
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
    </div>
  )
}

export default FieldBlockStyle
