/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { create } from 'mutative'
import { useCallback, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { IS_PRO } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import RenderThemeVarsAndFormCSS from '../style-new/RenderThemeVarsAndFormCSS'
import RenderHtml from '../Utilities/RenderHtml'
import confirmMsgCssStyles from './confirmMsgCssStyles'

export default function ConfirmMsgPreview({
  msgId, active, setActive, position, animation, autoHide, duration, msgType, message, confirmationStyles,
}) {
  //   const setSuccessMessageStyle = useSetRecoilState($successMessageStyle)
  const { formID } = useParams()
  const setStyles = useSetRecoilState($styles)

  const styleObject = useCallback(
    () => confirmMsgCssStyles(formID, msgId, msgType, position, animation, confirmationStyles),
    [formID, msgId, msgType, position, animation, confirmationStyles],
  )

  const delayTimeoutFunc = useRef(null)
  const handleBackdrop = ({ target }) => {
    if (target.dataset.modalBackdrop || target.parentNode.dataset.modalBackdrop) {
      setActive(false)
    }
  }
  useEffect(() => {
    setStyles(prvStyle => create(prvStyle, drft => {
      drft.confirmations?.filter(confMsgObj => {
        if (confMsgObj.confMsgId === msgId && (msgType === 'below' || IS_PRO)) {
          confMsgObj.style = styleObject()
        }
      })
    }))
  }, [styleObject])

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
      <RenderStyle styleClasses={styleObject()} />
      <RenderThemeVarsAndFormCSS />
      <div
        role="dialog"
        aria-hidden="true"
        data-modal-backdrop
        onClick={handleBackdrop}
        className={`msg-container-${msgId} ${active ? 'active' : 'deactive'}`}
      >
        <div role="button" className={`layout-wrapper msg-background-${msgId}`}>
          <div className={`msg-content-${msgId}`}>
            <button
              className={`close-${msgId}`}
              type="button"
              onClick={() => setActive(false)}
            >
              <svg
                className={`close-icn-${msgId}`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 30 30"
              >
                <line x1="4" y1="3.88" x2="26" y2="26.12" />
                <line x1="26" y1="3.88" x2="4" y2="26.12" />
              </svg>
            </button>
            <div><RenderHtml html={message} /></div>
          </div>
        </div>
      </div>
    </>
  )
}
