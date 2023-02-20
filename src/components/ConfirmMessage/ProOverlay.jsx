import { IS_PRO } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'

export default function ProOverlay() {
  return (
    !IS_PRO && (
      <div className="pro-blur flx" style={{ minHeight: 100, height: '100%', left: 15, width: '94%', marginTop: 10 }}>
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
  )
}
