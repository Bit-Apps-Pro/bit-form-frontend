import { __ } from '../../../../Utils/i18nwrap'

export default function ProOverlay({ style }) {
  const defaulStyle = { height: '100%', left: -15, width: '104%', marginTop: 15, ...style }
  return (
    <div className="pro-blur flx" style={defaulStyle}>
      <div className="pro">
        <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
          <span className="txt-pro">
              &nbsp;
            {__('Available On Pro')}
          </span>
        </a>
      </div>
    </div>
  )
}
