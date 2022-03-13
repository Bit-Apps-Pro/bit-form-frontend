/* eslint-disable camelcase */
import inputWrapperClasses from './inputWrapperClasses'

export default function fileUploadStyle_1_BitformDefault({ fk, type, direction }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-file-upload-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },

    [`.${fk}-btn-wrpr`]: {
      display: 'flex',
      'align-items': 'center',
      position: 'relative',
    },

    [`.${fk}-inp-btn`]: {
      'align-items': 'center',
      'background-color': '#0083f3',
      border: 'none',
      'border-radius': '8px',
      'box-shadow': 'none',
      color: '#fff',
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
    },
    [`.${fk}-suf-i`]: {
      width: '15px',
      height: '15px',
      'margin-left': '5px',
    },

    [`.${fk}-file-select-status`]: { 'font-size': '14px' },

    [`.${fk}-max-size-lbl`]: {
      color: 'gray',
      'font-size': '10px',
      'margin-left': '5px',
    },

    [`.${fk}-file-title`]: {
      margin: '0px 10px',
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
      'margin-left': '5px',
    },
    [`.${fk}-cross-btn`]: {
      cursor: 'pointer',
      'background-color': '#e8e8e8',
      border: 'none',
      'border-radius': '50px',
      'box-shadow': 'none',
      color: 'gray',
      'font-size': '20px',
      height: '25px',
      'line-height': '1',
      'margin-right': '6px',
      'min-height': '25px',
      'min-width': '25px',
      padding: '0',
      'text-decoration': 'none',
      width: '25px',
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
      'align-items': 'center',
      'background-color': '#f8f8f8',
      'border-radius': '10px',
      display: 'flex',
      height: '40px',
      'margin-top': '10px',
      width: '100%',
    },
    [`.${fk}-file-preview`]: {
      'border-radius': '10px',
      height: '35px',
      'margin-right': '10px',
      width: '35px',
    },
    [`.${fk}-file-details`]: {
      display: 'flex',
      'align-items': 'center',
      width: '90%',
    },

    [`.${fk}-err-wrp`]: {
      display: 'none',
      opacity: '0',
      transition: 'display 1s, opacity 1s',
      'justify-content': 'left',
      'align-items': 'center',
      'background-color': '#fff2f2',
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
