/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Background from './StyleComp/Background'
import Borders from './StyleComp/Borders'
import Padding from './StyleComp/Padding'
import Margin from './StyleComp/Margin'
import Shadow from './StyleComp/Shadow'
import Color from './StyleComp/Color'
import FontSize from './StyleComp/FontSize'
import Direction from './StyleComp/Direction'
import Gap from './StyleComp/Gap'

function StyleEditor({ editorLabel, title, noBack, compStyle, styleDispatch, brkPoint, setResponsiveView, cls, styleConfig, formID: genaratedID }) {
  const { formID, formType } = useParams()
  return (
    <div className="mt-2">
      {!noBack && (
        <Link to={`/form/builder/${formType}/${formID}/style`}>
          <h4 className="w-9 m-a flx txt-dp">
            <button className="icn-btn" type="button" aria-label="back btn"><span className="btcd-icn icn-arrow_back" /></button>
            <div className="flx w-10">
              <span>Back</span>
              <div className="txt-center w-10 f-5">{editorLabel}</div>
            </div>
          </h4>
        </Link>
      )}

      {title && <h4 className="ml-2">{title}</h4>}

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
          <FontSize
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
