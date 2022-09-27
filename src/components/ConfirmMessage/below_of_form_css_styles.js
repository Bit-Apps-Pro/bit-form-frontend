import { objectArrayToStyleStringGenarator } from '../style-new/styleHelpers'
import belowOfFormFade from './Animations/below-of-form-fade'
import belowOfFormScale from './Animations/below-of-form-scale'

export default function belowOfFormCssStyles(formID, msgId, position, animation, padding, width, background, color, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover) {
  const boxShadowString = objectArrayToStyleStringGenarator(boxShadow || [])
  return {
    [`.msg-container-${msgId}`]: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'z-index': 999,
      width: 'inherit',
      height: '0',
      visibility: 'hidden',
      opacity: 0,
      transition: 'opacity 100ms, visibility 0s',

      ...animation === 'fade' && belowOfFormFade().msgContainer,
      ...animation === 'scale' && belowOfFormScale().msgContainer,

    },

    [`.msg-container-${msgId}.active`]: {
      opacity: 1,
      visibility: 'visible',
      'margin-top': '10px',
      height: 'auto',
      ...animation === 'fade' && belowOfFormFade().activeMsgContainer,
      ...animation === 'scale' && belowOfFormScale().activeMsgContainer,
    },

    [`.msg-container-${msgId}.deactive`]: {
      opacity: 0,
      visibility: 'hidden',
      'margin-top': '0',
      height: '0',
      ...animation === 'fade' && belowOfFormFade().deactiveMsgContainer,
      ...animation === 'scale' && belowOfFormScale().deactiveMsgContainer,
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
      color,
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
