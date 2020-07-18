/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Background from './StyleComp/Background'
import Borders from './StyleComp/Borders'
import Padding from './StyleComp/Padding'
import Margin from './StyleComp/Margin'
import Shadow from './StyleComp/Shadow'

function StyleEditor({ compStyle, styleDispatch, brkPoint, setResponsiveView, cls, styleConfig }) {
  const { formID, formType } = useParams()

  return (
    <div>

      <Link to={`/form/builder/${formType}/${formID}/style`}>
        <h4 className="w-9 m-a flx txt-dp">
          <button className="icn-btn" type="button" aria-label="back btn"><span className="btcd-icn icn-arrow_back" /></button>
          Back
        </h4>
      </Link>

      {'background' in styleConfig && (
        <Background
          cls={cls}
          style={compStyle}
          brkPoint={brkPoint}
          styleConfig={styleConfig.background}
          styleDispatch={styleDispatch}
          setResponsiveView={setResponsiveView}
        />
      )}

      <div className="btcd-hr w-9 m-a" />

      {'border' in styleConfig && (
        <Borders
          cls={cls}
          style={compStyle}
          brkPoint={brkPoint}
          styleDispatch={styleDispatch}
          styleConfig={styleConfig.border}
          setResponsiveView={setResponsiveView}
        />
      )}

      <div className="btcd-hr w-9 m-a" />

      {'padding' in styleConfig && (
        <Padding
          cls={cls}
          style={compStyle}
          brkPoint={brkPoint}
          styleDispatch={styleDispatch}
          styleConfig={styleConfig.padding}
          setResponsiveView={setResponsiveView}
        />
      )}

      <div className="btcd-hr w-9 m-a" />

      {'margin' in styleConfig && (
        <Margin
          cls={cls}
          style={compStyle}
          brkPoint={brkPoint}
          styleDispatch={styleDispatch}
          styleConfig={styleConfig.margin}
          setResponsiveView={setResponsiveView}
        />
      )}

      <div className="btcd-hr w-9 m-a" />

      {'shadow' in styleConfig && (
        <Shadow
          cls={cls}
          style={compStyle}
          brkPoint={brkPoint}
          styleDispatch={styleDispatch}
          styleConfig={styleConfig.shadow}
          setResponsiveView={setResponsiveView}
        />
      )}

      <div className="btcd-hr w-9 m-a" />
    </div>
  )
}

export default (StyleEditor)
