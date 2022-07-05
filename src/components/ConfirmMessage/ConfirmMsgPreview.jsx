/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { renderHTMR } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import confirmMsgCssStyles from './confirm_msg_css_styles'

export default function ConfirmMsgPreview({ active, setActive, position, animation, autoHide, duration, msgType, message, confirmationStyles }) {
  //   const setSuccessMessageStyle = useSetRecoilState($successMessageStyle)
  const { formID } = useParams()
  const styleObject = confirmMsgCssStyles(formID, msgType, position, animation, confirmationStyles)
  const delayTimeoutFunc = useRef(null)
  const handleBackdrop = ({ target }) => {
    if (target.dataset.modalBackdrop || target.parentNode.dataset.modalBackdrop) {
      setActive(false)
    }
  }

  useEffect(() => {
    if (autoHide) {
      if (active) {
        delayTimeoutFunc.current = setTimeout(() => {
          setActive(false)
        }, (duration * 1000))
      } else {
        clearTimeout(delayTimeoutFunc)
      }
    }
  }, [active])

  return (
    <>
      <RenderStyle styleClasses={styleObject} />
      <div
        tabIndex={-1}
        role="dialog"
        ariaHidden="true"
        data-modal-backdrop
        onClick={handleBackdrop}
        className={`msg-container-${formID} ${active ? 'active' : 'deactive'}`}
      >
        <div role="button" className={`msg-background-${formID}`}>
          <div className={`msg-content-${formID}`}>
            <button
              className={`close-${formID}`}
              type="button"
              onClick={() => setActive(false)}
            >
              <svg className={`close-icn-${formID}`} viewBox="0 0 30 30">
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="4" y1="3.88" x2="26" y2="26.12" />
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="26" y1="3.88" x2="4" y2="26.12" />
              </svg>
            </button>
            <div>{renderHTMR(message)}</div>
          </div>
        </div>
      </div>
    </>
  )
}
