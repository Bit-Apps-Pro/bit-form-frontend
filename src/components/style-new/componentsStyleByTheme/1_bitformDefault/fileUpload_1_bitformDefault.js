/* eslint-disable camelcase */
import inputWrapperClasses from '../common/inputWrapperClasses'

export default function fileUploadStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-file-upload-container`]: {
        position: 'relative',
        height: '40px',
        width: '100%',
        display: 'inline-block',
      },

      [`.readonly .${fk}-file-input-wrpr`]: {
        opacity: '.7',
        cursor: 'not-allowed',
        'pointer-events': 'none',
      },
      [`.disabled .${fk}-file-input-wrpr`]: {
        opacity: '.5',
        cursor: 'not-allowed',
        'pointer-events': 'none',
      },

      [`.${fk}-btn-wrpr`]: {
        display: 'flex',
        'align-items': 'center',
        position: 'relative',
      },

      [`.${fk}-inp-btn`]: {
        'align-items': 'center',
        'background-color': 'var(--btn-bg)',
        border: 'none',
        'border-radius': '8px',
        'box-shadow': 'none',
        color: 'hsla(0, 0%, 100%, 100%)',
        cursor: 'pointer',
        display: 'inline-flex',
        height: '35px',
        'margin-right': '8px',
        padding: '5px 11px',
      },

      [`.${fk}-pre-i`]: {
        width: '15px',
        height: '15px',
        'margin-right': '5px',
        filter: 'invert(1)',
      },
      [`.${fk}-suf-i`]: {
        width: '15px',
        height: '15px',
        'margin-left': '5px',
        filter: 'invert(1)',
      },
      [`.${fk}-btn-txt`]: { color: 'hsla(0,100%,100%,100)', 'font-size': '14px' },

      [`.${fk}-file-select-status`]: { 'font-size': '14px' },

      [`.${fk}-max-size-lbl`]: {
        color: 'gray',
        'font-size': '10px',
        'margin-left': '5px',
      },

      [`.${fk}-file-upload-input`]: {
        display: 'block',
        width: '100%',
        height: '100%',
        border: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
        cursor: 'pointer',
      },
      [`.${fk}-file-wrpr`]: {
        'background-color': 'hsla(0, 0%, 97%, 100%)',
        'border-radius': '10px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        width: '100%',
        height: 'auto',
        'margin-top': '10px',
        padding: '5px',
      },
      [`.${fk}-file-preview`]: {
        'border-radius': '10px',
        height: '35px',
        width: '35px',
      },
      [`.${fk}-file-details`]: {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        width: 'inherit',
        padding: '0px 10px',
      },

      [`.${fk}-file-title`]: {
        display: 'inline-block',
        'font-size': '14px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        width: '80%',
      },

      [`.${fk}-file-size`]: {
        'font-size': '12px',
        'line-height': '1',
      },
      [`.${fk}-cross-btn`]: {
        cursor: 'pointer',
        border: 'none',
        'border-radius': '50px',
        'box-shadow': 'none',
        color: 'gray',
        'font-size': '20px',
        height: '25px',
        'line-height': '1',
        'min-height': '25px',
        'min-width': '25px',
        padding: '0',
        'text-decoration': 'none',
        width: '25px',
        transition: 'background-color 5ms',
      },
      [`.${fk}-cross-btn:hover`]: { 'background-color': 'hsla(0, 0%, 91%, 100%)' },
      [`.${fk}-err-wrp`]: {
        display: 'none',
        opacity: '0',
        transition: 'display 1s, opacity 1s',
        'justify-content': 'left',
        'align-items': 'center',
        'background-color': 'hsla(0, 100%, 97%, 100%)',
        color: 'darkred',
        'border-radius': '10px',
        height: '40px',
        'margin-left': '10px',
        'margin-top': '10px',
        padding: '2px 20px',
        width: '90%',
      },
      [`.${fk}-err-wrp.active`]: {
        display: 'flex',
        opacity: '1',
        transition: 'display 1s, opacity 1s',
      },

    }
  }
  return {}
}
