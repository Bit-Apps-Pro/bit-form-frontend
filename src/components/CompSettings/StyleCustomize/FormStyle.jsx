/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react'
import BtnGrp from './ChildComp/BtnGrp'
import ColorPicker from './ChildComp/ColorPicker'
import StyleAccordion from './ChildComp/StyleAccordion'
import Range from './ChildComp/Range'
import ResponsiveBtns from './ChildComp/ResponsiveBtns'

function FormStyle({ frmStyle, styleDispatch, brkPoint, setResponsiveView }) {
  const bgClr = frmStyle.background
  let bgTyp = 'Transparent'
  const bdrTyp = frmStyle['border-style'] || 'None'
  const bdrClr = frmStyle['border-color']
  const bdrW = frmStyle['border-width']
  const bdrRad = frmStyle['border-radius'] || '0px 0px 0px 0px'
  const padding = frmStyle.padding || '0px 0px 0px 0px'
  const margin = frmStyle.margin || '0px 0px 0px 0px'
  let shadw = frmStyle['box-shadow']
  let shadwClr = ''
  let shadwTyp = 'None'
  let shadwInset = ''
  console.log('ssss', 'formstyle')
  if (shadw !== undefined) {
    if (shadw.match(/inset/g)) {
      shadwTyp = 'Inside'
      shadwInset = 'inset'
    } else {
      shadwTyp = 'Outside'
    }
    const sd = shadw.replace('inset', '').trim().split(' ')
    shadw = sd.slice(0, 4).join(' ')
    shadwClr = sd.slice(4, sd.length).join(' ')
  }

  if (bgClr !== undefined && bgClr.includes('gradient')) {
    bgTyp = 'Gradient'
  } else if (bgClr !== undefined) {
    bgTyp = 'Solid'
  }

  const tmp = { ...frmStyle }

  const setCss = (val, property) => {
    if (val === '0px 0px 0px 0px') {
      delete tmp[property]
    } else {
      tmp[property] = val
    }
    styleDispatch({ typ: 'frm', newstyle: tmp })
  }


  const setBgTyp = (typ) => {
    tmp.background = 'rgba(242, 246, 249, 0.59)'
    if (typ === 'Gradient') {
      tmp.background = 'gradientrgba(142, 146, 149, 0.59)'
    } else if (typ === 'Transparent') {
      delete tmp.background
    }
    styleDispatch({ typ: 'frm', newstyle: tmp })
  }

  const setBdrType = (typ) => {
    if (typ === 'None') {
      delete tmp['border-style']
      delete tmp['border-width']
      delete tmp['border-color']
    } else {
      tmp['border-style'] = typ
      if (tmp['border-width'] === undefined) {
        tmp['border-width'] = '1px 1px 1px 1px'
      }
      if (tmp['border-color'] === undefined) {
        tmp['border-color'] = 'rgba(0, 0, 0, 1)'
      }
    }
    styleDispatch({ typ: 'frm', newstyle: tmp })
  }

  const setShadwType = (typ) => {
    if (typ === 'Outside') {
      if (tmp['box-shadow'] === undefined) {
        tmp['box-shadow'] = '0px 0px 8px -5px rgba(0, 0, 0, 1)'
      } else {
        tmp['box-shadow'] = tmp['box-shadow'].replace('inset', '')
      }
    } else if (typ === 'Inside') {
      if (tmp['box-shadow'] === undefined) {
        tmp['box-shadow'] = '0px 0px 8px -5px rgba(0, 0, 0, 1) inset'
      } else if (!tmp['box-shadow'].match(/inset/g)) {
        tmp['box-shadow'] += ' inset'
      }
    } else if (typ === 'None') {
      delete tmp['box-shadow']
    }
    styleDispatch({ typ: 'frm', newstyle: tmp })
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
      <StyleAccordion className="style-acc w-9" title="Border">
        <div className="flx flx-between">
          <span className="f-5">Type</span>
          <BtnGrp
            value={bdrTyp}
            onChange={setBdrType}
            btns={[
              { lbl: 'solid', icn: 's' },
              { lbl: 'dotted', icn: 's' },
              { lbl: 'dashed', icn: 's' },
              { lbl: 'double', icn: 's' },
              { lbl: 'None', icn: 's' },
            ]}
          />
        </div>
        {bdrClr !== undefined && (
          <div className="flx flx-between mt-2">
            <span className="f-5">Border Color</span>
            <ColorPicker value={bdrClr} onChange={clr => setCss(clr.style, 'border-color')} />
          </div>
        )}
        {bdrW !== undefined && (
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
              onChange={val => setCss(val, 'border-width')}
            />
          </div>
        )}
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
            onChange={val => setCss(val, 'border-radius')}
          />
        </div>
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
      <StyleAccordion className="style-acc w-9" title="Padding">
        <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />
        <Range
          info={[
            { icn: 'd', lbl: 'Padding Top' },
            { icn: 'd', lbl: 'Padding Right' },
            { icn: 'd', lbl: 'Padding Bottom' },
            { icn: 'd', lbl: 'Padding Left' },
            { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
          ]}
          className="btc-range"
          unit="px"
          maxRange={50}
          value={padding}
          onChange={val => setCss(val, 'padding')}
        />
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
      <StyleAccordion className="style-acc w-9" title="Margin">
        <ResponsiveBtns brkPoint={brkPoint} setResponsiveView={setResponsiveView} />
        <Range
          info={[
            { icn: 'd', lbl: 'Margin Top' },
            { icn: 'd', lbl: 'Margin Right' },
            { icn: 'd', lbl: 'Margin Bottom' },
            { icn: 'd', lbl: 'Margin Left' },
            { icn: <span className="btcd-icn icn-settings" />, lbl: 'All Side' },
          ]}
          className="btc-range"
          unit="px"
          maxRange={50}
          value={margin}
          onChange={val => setCss(val, 'margin')}
        />
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
      <StyleAccordion className="style-acc w-9" title="Shadow">
        <div className="flx flx-between">
          <span className="f-5">Type</span>
          <BtnGrp
            value={shadwTyp}
            onChange={setShadwType}
            btns={[
              { lbl: 'Inside', icn: 's' },
              { lbl: 'Outside', icn: 's' },
              { lbl: 'None', icn: 's' },
            ]}
          />
        </div>
        {shadwTyp !== 'None' && (
          <>
            <div className="flx flx-between mb-2 mt-2">
              <span className="f-5">Shadow Color</span>
              <ColorPicker value={shadwClr} onChange={clr => setCss(`${shadw} ${clr.style} ${shadwInset}`, 'box-shadow')} />
            </div>
            <span className="f-5">Shadow Style</span>
            <Range
              info={[
                { icn: <span className="btcd-icn icn-settings" />, lbl: 'X-axis' },
                { icn: 'd', lbl: 'Y-axis' },
                { icn: 'd', lbl: 'Blur' },
                { icn: 'd', lbl: 'Spread' },
              ]}
              className="btc-range"
              unit="px"
              master={false}
              maxRange={10}
              minRange={-10}
              value={shadw}
              onChange={val => setCss(`${val} ${shadwClr} ${shadwInset}`, 'box-shadow')}
            />
          </>
        )}
      </StyleAccordion>
      <div className="btcd-hr w-9 m-a" />
    </div>
  )
}
export default (FormStyle)
