import { objectArrayToStyleStringGenarator } from '../style-new/styleHelpers'
import snackbarFade from './Animations/snackbar-fade'
import snackbarScale from './Animations/snackbar-scale'
import snackbarSlide from './Animations/snackbar-slide'

export default function snackbarCssStyles(formID, msgId, position, animation, padding, width, background, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover) {
  const boxShadowString = objectArrayToStyleStringGenarator(boxShadow || [])
  return {
    [`.msg-container-${msgId}`]: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      position: 'fixed',
      'z-index': 999,
      width,
      height: 'auto',
      visibility: 'hidden',
      opacity: 0,
      transition: 'opacity 100ms, visibility 0s',

      ...animation === 'fade' && snackbarFade(position).msgContainer,
      ...animation === 'scale' && snackbarScale(position).msgContainer,
      ...animation === 'slide-down' && snackbarSlide(position, 'down').msgContainer,
      ...animation === 'slide-up' && snackbarSlide(position, 'up').msgContainer,
      ...animation === 'slide-left' && snackbarSlide(position, 'left').msgContainer,
      ...animation === 'slide-right' && snackbarSlide(position, 'right').msgContainer,
    },

    [`.msg-container-${msgId}.active`]: {
      opacity: 1,
      visibility: 'visible',
      ...animation === 'fade' && snackbarFade(position).activeMsgContainer,
      ...animation === 'scale' && snackbarScale(position).activeMsgContainer,
      ...animation === 'slide-down' && snackbarSlide(position, 'down').activeMsgContainer,
      ...animation === 'slide-up' && snackbarSlide(position, 'up').activeMsgContainer,
      ...animation === 'slide-left' && snackbarSlide(position, 'left').activeMsgContainer,
      ...animation === 'slide-right' && snackbarSlide(position, 'right').activeMsgContainer,
    },

    [`.msg-container-${msgId}.deactive`]: {
      opacity: 0,
      visibility: 'hidden',
      ...animation === 'fade' && snackbarFade(position).deactiveMsgContainer,
      ...animation === 'scale' && snackbarScale(position).deactiveMsgContainer,
      ...animation === 'slide-down' && snackbarSlide(position, 'down').deactiveMsgContainer,
      ...animation === 'slide-up' && snackbarSlide(position, 'up').deactiveMsgContainer,
      ...animation === 'slide-left' && snackbarSlide(position, 'left').deactiveMsgContainer,
      ...animation === 'slide-right' && snackbarSlide(position, 'right').deactiveMsgContainer,
    },

    [`.msg-background-${msgId}`]: {
      width: '100%',
      height: '100%',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      background: 'rgba(0, 0, 0, 0.0)',
    },

    [`.msg-content-${msgId}`]: {
      background,
      padding,
      'border-width': borderWidth,
      'border-style': borderType,
      'border-color': borderColor,
      'border-radius': borderRadius,
      width: '100%',
      margin: 'auto',
      position: 'relative',
      'word-break': 'break-all',
      'box-shadow': boxShadowString,
    },

    [`.close-${msgId}`]: {
      color: closeIconColor,
      background: closeBackground,
      position: 'absolute',
      right: '7px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '25px',
      width: '25px',
      border: 'none',
      'border-radius': '50%',
      padding: 0,
      display: 'grid',
      'place-content': 'center',
      cursor: 'pointer',
    },

    [`.close-${msgId}:hover`]: { color: closeIconHover, bd: closeHover },

    [`.close-${msgId}:focus`]: { color: closeIconHover },

    [`.close-icn-${msgId}`]: {
      width: '15px',
      height: '15px',
      'stroke-width': 2,
    },
  }
}
