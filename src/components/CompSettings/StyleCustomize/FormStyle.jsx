/* eslint-disable no-underscore-dangle */
import React from 'react'
import BtnGrp from './ChildComp/BtnGrp'
import ColorPicker from './ChildComp/ColorPicker'
import StyleAccordion from './ChildComp/StyleAccordion'
import Range from './ChildComp/Range'

export default function FormStyle({ style, setStyle }) {
  const bgClr = style['._frm'].background
  let bgTyp = 'Transparent'
  const bdrTyp = style['._frm']['border-style'] !== undefined ? style['._frm']['border-style'] : 'None'
  const bdrClr = style['._frm']['border-color'] !== undefined ? style['._frm']['border-color'] : 'rgba(0, 0, 0, 1)'
  const bdr = style['._frm']['border-width'] !== undefined ? style['._frm']['border-width'] : '0px 0px 0px 0px'

  if (bgClr !== undefined && bgClr.includes('gradient')) {
    bgTyp = 'Gradient'
  } else if (bgClr !== undefined) {
    bgTyp = 'Solid'
  }

  const tmp = { ...style }

  const setCss = (val, typ) => {
    if (typ === 'bg') {
      tmp['._frm'].background = val.style
    } else if (typ === 'bd') {
      tmp['._frm']['border-color'] = val.style
    } else if (typ === 'bdw') {
      tmp['._frm']['border-width'] = val
    }
    setStyle(tmp)
  }


  const changebgTyp = (typ) => {
    tmp['._frm'].background = 'rgba(242, 246, 249, 0.59)'
    if (typ === 'Gradient') {
      tmp['._frm'].background = 'gradientrgba(142, 146, 149, 0.59)'
    } else if (typ === 'Transparent') {
      delete tmp['._frm'].background
    }
    setStyle(tmp)
  }

  const changeBdrType = (typ) => {
    if (typ === 'None') {
      delete tmp['._frm']['border-style']
      delete tmp['._frm']['border-width']
    } else {
      tmp['._frm']['border-style'] = typ
    }
    setStyle(tmp)
  }

  const bdrWidth = (typ) => {

  }

  return (
    <div>
      <StyleAccordion className="style-acc w-9" title="Background">
        <div className="flx flx-between">
          Type
          <BtnGrp
            value={bgTyp}
            onChange={changebgTyp}
            btns={[
              { lbl: 'Solid', icn: 's' },
              { lbl: 'Gradient', icn: 'G' },
              { lbl: 'Transparent', icn: 'T' },
            ]}
          />
        </div>
        {bgTyp !== 'Transparent' && (
          <div className="flx flx-between mt-2">
            <span>Color Fill</span>
            <ColorPicker value={bgClr} onChange={clr => setCss(clr, 'bg')} />
          </div>
        )}
        Picture
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
      <StyleAccordion className="style-acc w-9" title="Border">
        <div className="flx flx-between">
          Type
          <BtnGrp
            value={bdrTyp}
            onChange={changeBdrType}
            btns={[
              { lbl: 'solid', icn: 's' },
              { lbl: 'dotted', icn: 's' },
              { lbl: 'dashed', icn: 's' },
              { lbl: 'double', icn: 's' },
              { lbl: 'None', icn: 's' },
            ]}
          />
        </div>
        {bdrTyp !== 'None' && (
          <div className="flx flx-between mt-2">
            <span>Border Color</span>
            <ColorPicker value={bdrClr} onChange={clr => setCss(clr, 'bd')} />
          </div>
        )}
      </StyleAccordion>
      <Range
        title="asdfasdf"
        className="btc-range w-9 m-a"
        value={bdr}
        onChange={val => setCss(val, 'bdw')}
      />
      <div className="btcd-hr w-9 m-a" />
    </div>
  )
}
