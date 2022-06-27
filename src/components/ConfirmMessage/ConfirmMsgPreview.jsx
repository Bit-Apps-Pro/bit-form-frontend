/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import produce from 'immer'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $confirmations } from '../../GlobalStates/GlobalStates'
import { renderHTMR } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import confirmMsgCssStyles from './confirm_msg_css_styles'

export default function ConfirmMsgPreview({ index, msgId, active, setActive, position, animation, autoHide, duration, msgType, message, confirmationStyles }) {
  //   const setSuccessMessageStyle = useSetRecoilState($successMessageStyle)
  const { formID } = useParams()
  const setAllConf = useSetRecoilState($confirmations)
  const styleObject = confirmMsgCssStyles(formID, msgId, msgType, position, animation, confirmationStyles)
  const delayTimeoutFunc = useRef(null)
  const handleBackdrop = ({ target }) => {
    if (target.dataset.modalBackdrop || target.parentNode.dataset.modalBackdrop) {
      setActive(false)
    }
  }
  useEffect(() => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[index].config.stylesObj = styleObject
    }))
  }, [])

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

  useEffect(() => {

  }, [styleObject])

  return (
    <>
      <RenderStyle styleClasses={styleObject} />
      <div
        role="dialog"
        aria-hidden="true"
        data-modal-backdrop
        onClick={handleBackdrop}
        className={`msg-container-${msgId} ${active ? 'active' : 'deactive'}`}
      >
        <div role="button" className={`msg-background-${msgId}`}>
          <div className={`msg-content-${msgId}`}>
            <button
              className={`close-${msgId}`}
              type="button"
              onClick={() => setActive(false)}
            >
              <svg className={`close-icn-${msgId}`} viewBox="0 0 30 30">
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
