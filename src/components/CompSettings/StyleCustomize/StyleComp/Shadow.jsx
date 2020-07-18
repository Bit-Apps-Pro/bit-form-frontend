import React from 'react'
import StyleAccordion from '../ChildComp/StyleAccordion'
import BtnGrp from '../ChildComp/BtnGrp'
import ColorPicker from '../ChildComp/ColorPicker'
import Range from '../ChildComp/Range'
import usePseudo from '../ChildComp/usePseudo'
import ResponsiveBtns from '../ChildComp/ResponsiveBtns'

export default function Shadow({ style, cls, styleConfig, styleDispatch, brkPoint, setResponsiveView }) {
  const [pseudo, pcls, setPseudo] = usePseudo(cls)

  let shadw = style?.[pcls]?.['box-shadow'] || style?.[cls]?.['box-shadow']
  let shadwClr = ''
  let shadwTyp = 'None'
  let shadwInset = ''

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

  const setShadwType = (typ) => {
    if (typ === 'Outside') {
      if (style?.[pcls]?.['box-shadow'] === undefined) {
        styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: false, value: '0px 0px 8px -5px rgba(0, 0, 0, 1)' }], brkPoint })
      } else {
        const replaceOld = style?.[pcls]?.['box-shadow'].replace('inset', '')
        styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: false, value: replaceOld }], brkPoint })
      }
    } else if (typ === 'Inside') {
      if (style?.[pcls]?.['box-shadow'] === undefined) {
        styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: false, value: '0px 0px 8px -5px rgba(0, 0, 0, 1) inset' }], brkPoint })
      } else if (!style?.[pcls]?.['box-shadow'].match(/inset/g)) {
        const replaceOld = `${style?.[pcls]?.['box-shadow']} inset`
        styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: false, value: replaceOld }], brkPoint })
      }
    } else if (typ === 'None') {
      styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: true, value: '' }], brkPoint })
    }
  }

  const setShadow = value => {
    styleDispatch({ apply: [{ cls: pcls, property: 'box-shadow', delProp: false, value }], brkPoint })
  }

  return (
    <StyleAccordion className="style-acc w-9" title="Shadow">
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
            <ColorPicker alwGradient={false} value={shadwClr} onChange={clr => setShadow(`${shadw} ${clr.style} ${shadwInset}`)} />
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
            onChange={val => setShadow(`${val} ${shadwClr} ${shadwInset}`)}
          />
        </>
      )}
    </StyleAccordion>
  )
}
