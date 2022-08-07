/* eslint-disable no-underscore-dangle */
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../../GlobalStates/GlobalStates'
import BackIcn from '../../../Icons/BackIcn'
import { __ } from '../../../Utils/i18nwrap'
import CustomInputControl from './ChildComp/CustomInputControl'
import Background from './StyleComponents/Background'
import Borders from './StyleComponents/Borders'
import Color from './StyleComponents/Color'
import Direction from './StyleComponents/Direction'
import FontSetting from './StyleComponents/FontSetting'
import Gap from './StyleComponents/Gap'
import Height from './StyleComponents/Height'
import Margin from './StyleComponents/Margin'
import Padding from './StyleComponents/Padding'
import Shadow from './StyleComponents/Shadow'
import { showDraggableModal } from '../../style-new/styleHelpers'

function StyleEditor({ editorLabel, title, noBack, compStyle, styleDispatch, brkPoint, setResponsiveView, cls, styleConfig, formID: genaratedID }) {
  const navigate = useNavigate()

  const setDraggableModal = useSetRecoilState($draggableModal)

  const goBackUrl = () => {
    if (navigate.location.pathname.match(/style\/fl\/.+/g)) return navigate.location.pathname.replace(/style\/fl\/.+/g, 'style/fl')
    // if (/text|textarea|number|password|email|url|date|time|week|month|datetime-local|/g.test(typ){
    return navigate.location.pathname.replace(/style\/.+/g, 'style')
  }
  return (
    <div className="mt-2">
      {!noBack && (
        <Link to={`${goBackUrl()}`}>
          <h4 className="w-9 m-a flx txt-dp">
            <button className="icn-btn" type="button" aria-label="back btn"><BackIcn /></button>
            <div className="flx w-10">
              <span>{__('Back')}</span>
              <div className="txt-center w-10 f-5">{editorLabel}</div>
            </div>
          </h4>
          <div className="btcd-hr m-a" />
          <div className="btcd-hr m-a" />
        </Link>
      )}

      {title && <h4 className="ml-2 txt-blue">{title}</h4>}

      <CustomInputControl width="45%" label="Width" value={10} min={1} max={1000} />

      <div className="flx flx-between pos-rel">
        <span>Type</span>
        <div className="flx flx-between" style={{ backgroundColor: '#ddd' }}>
          <div role="button" tabIndex="0" onClick={e => showDraggableModal(e, setDraggableModal, 'border-style')} onKeyPress={e => showDraggableModal(e, setDraggableModal, 'border-style')}>
            <span style={{ backgroundColor: 'red' }}>&nbsp;</span>
            <span>10 rem dashed</span>
          </div>
          <span>x</span>
        </div>
      </div>

      {'background' in styleConfig && (
        <>
          <Background
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleConfig={styleConfig.background}
            styleDispatch={styleDispatch}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

      {'color' in styleConfig && (
        <>
          <Color
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            formID={genaratedID}
            styleConfig={styleConfig.color}
            styleDispatch={styleDispatch}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

      {'font' in styleConfig && (
        <>
          <FontSetting
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleConfig={styleConfig.font}
            styleDispatch={styleDispatch}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

      {'border' in styleConfig && (
        <>
          <Borders
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.border}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}
      {'height' in styleConfig && (
        <>
          <Height
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            formID={genaratedID}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.height}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}
      {'padding' in styleConfig && (
        <>
          <Padding
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.padding}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}
      {
        'gap' in styleConfig && (
          <>
            <Gap
              cls={cls}
              style={compStyle}
              brkPoint={brkPoint}
              formID={genaratedID}
              styleDispatch={styleDispatch}
              styleConfig={styleConfig.gap}
              setResponsiveView={setResponsiveView}
            />
            <div className="btcd-hr w-9 m-a" />
          </>
        )
      }

      {'margin' in styleConfig && (
        <>
          <Margin
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.margin}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

      {'shadow' in styleConfig && (
        <>
          <Shadow
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.shadow}
            setResponsiveView={setResponsiveView}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

      {'direction' in styleConfig && (
        <>
          <Direction
            cls={cls}
            style={compStyle}
            brkPoint={brkPoint}
            styleDispatch={styleDispatch}
            styleConfig={styleConfig.direction}
          />
          <div className="btcd-hr w-9 m-a" />
        </>
      )}

    </div>
  )
}

export default (StyleEditor)
