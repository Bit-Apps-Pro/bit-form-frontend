import fade from './Animations/fade'
import scale from './Animations/scale'
import modalSlide from './Animations/modal-slide'
import { objectArrayToStyleStringGenarator } from '../style-new/styleHelpers'

export default function modalCssStyles(formID, position, animation, width, background, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover) {
  const boxShadowString = objectArrayToStyleStringGenarator(boxShadow)

  return {
    [`.msg-container-${formID}`]: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      position: 'fixed',
      'z-index': 999,
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      visibility: 'hidden',
      opacity: 0,
      transition: 'opacity 100ms, visibility 0s',
    },

    [`.msg-container-${formID}.active`]: {
      opacity: 1,
      visibility: 'visible',
    },

    [`.msg-container-${formID}.deactive`]: {
      opacity: 0,
      'transition-delay': '400ms',
      visibility: 'hidden',
    },

    [`.msg-background-${formID}`]: {
      width: '100%',
      height: '100%',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      background: 'rgba(0, 0, 0, 0.4)',
    },

    [`.msg-content-${formID}`]: {
      background,
      padding: '20px',
      'border-width': borderWidth,
      'border-style': borderType,
      'border-color': borderColor,
      'border-radius': borderRadius,
      width,
      margin: 'auto',
      position: 'relative',
      'box-shadow': boxShadowString,

      ...animation === 'fade' && fade(position).msgContent,
      ...animation === 'scale' && scale(position).msgContent,
      ...animation === 'slide-down' && modalSlide(position, 'down').msgContent,
      ...animation === 'slide-up' && modalSlide(position, 'up').msgContent,

    },

    [`.active .msg-content-${formID}`]: {
      ...animation === 'fade' && fade(position).activeMsgContent,
      ...animation === 'scale' && scale(position).activeMsgContent,
      ...animation === 'slide-down' && modalSlide(position, 'down').activeMsgContent,
      ...animation === 'slide-up' && modalSlide(position, 'up').activeMsgContent,

    },
    [`.deactive .msg-content-${formID}`]: {
      ...animation === 'fade' && fade(position).deactiveMsgContent,
      ...animation === 'scale' && scale(position).deactiveMsgContent,
      ...animation === 'slide-down' && modalSlide(position, 'down').deactiveMsgContent,
      ...animation === 'slide-up' && modalSlide(position, 'up').deactiveMsgContent,
    },

    [`.close-${formID}`]: {
      color: closeIconColor,
      background: closeBackground,
      position: 'absolute',
      right: '7px',
      top: '7px',
      height: '25px',
      width: '25px',
      border: 'none',
      'border-radius': '50%',
      padding: 0,
      display: 'grid',
      'place-content': 'center',
      cursor: 'pointer',
    },

    [`.close-${formID}:hover`]: { color: closeIconHover, bd: closeHover },

    [`.close-${formID}:focus`]: { color: '#000' },

    [`.close-icn-${formID}`]: {
      width: '15px',
      height: '15px',
      'stroke-width': 2,
    },
  }
}
