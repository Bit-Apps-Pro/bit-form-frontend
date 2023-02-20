import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { IS_PRO } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { convertOptionsToText } from './editOptionsHelper'

export default function TextOptionsTab({
  options, optionTxt, setOptionTxt, lblKey, valKey, imgKey, isPro,
}) {
  const { css } = useFela()

  useEffect(() => { setOptionTxt(convertOptionsToText(options, lblKey, valKey, imgKey)) }, [options])

  const handleOptionText = e => {
    setOptionTxt(e.target.value)
  }

  return (
    <div className="pos-rel">
      { isPro && !IS_PRO && (
        <div className="pro-blur flx" style={{ width: '100%', height: '100%', left: 0, top: 0 }}>
          <div className="pro">
            {__('Available On')}
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                    &nbsp;
                {__('Premium')}
              </span>
            </a>
          </div>
        </div>
      )}
      <textarea data-testid="txt-optns-tab-area" className={css(styles.textarea)} onChange={handleOptionText} value={optionTxt} />
    </div>
  )
}

const styles = {
  textarea: {
    w: '100%',
    p: 5,
    mt: 10,
    h: 200,
  },
}
