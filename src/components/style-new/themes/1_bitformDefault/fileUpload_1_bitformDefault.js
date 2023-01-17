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

      [`.${fk}-fld-wrp.readonly .${fk}-file-input-wrpr`]: {
        opacity: '.7',
        cursor: 'not-allowed',
        'pointer-events': 'none',
      },

      [`.${fk}-fld-wrp.disabled .${fk}-file-input-wrpr`]: {
        opacity: '.5',
        cursor: 'not-allowed',
        'pointer-events': 'none',
      },

      [`.${fk}-btn-wrpr`]: {
        display: 'flex',
        'align-items': 'center',
        position: 'relative',
        gap: '5px',
      },

      [`.${fk}-inp-btn`]: {
        'align-items': 'center',
        'background-color': 'var(--btn-bg) !important',
        border: 'none',
        'border-radius': 'var(--g-bdr-rad) !important',
        'box-shadow': 'none',
        color: 'hsla(0, 0%, 100%, 100%)',
        cursor: 'pointer',
        display: 'inline-flex',
        padding: 'var(--btn-p) !important',
        'font-size': 'var(--btn-fs) !important',
        gap: '5px',
        'line-height': '1',
      },

      [`.${fk}-inp-btn:focus-visible`]: {
        outline: '2px solid var(--global-accent-color)',
        'outline-offset': '2px',
        transition: 'outline-offset 0.2s ease',
      },
      [`.${fk}-inp-btn:active:focus-visible`]: {
        'outline-offset': '0',
      },
      [`.${fk}-pre-i`]: {
        width: '15px',
        height: '15px',
        filter: 'invert(1)',
      },

      [`.${fk}-suf-i`]: {
        width: '15px',
        height: '15px',
        'margin-left': '5px',
        filter: 'invert(1)',
      },

      [`.${fk}-btn-txt`]: {},

      [`.${fk}-file-select-status`]: {
        'font-size': '14px',
        color: 'var(--global-font-color)',
      },

      [`.${fk}-max-size-lbl`]: {
        color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.7)',
        'font-size': '10px',
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

      [`.${fk}-file-input-wrpr .files-list`]: {},

      [`.${fk}-file-input-wrpr .file-wrpr`]: {
        'background-color': 'var(--bg-10)',
        'border-radius': 'var(--g-bdr-rad)',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        width: '100%',
        height: 'auto',
        'margin-top': '10px',
        padding: '5px',
        outline: '1px solid var(--bg-15)',
      },

      [`.${fk}-file-input-wrpr .file-preview`]: {
        'border-radius': 'calc(var(--g-bdr-rad) - 4px)',
        height: '25px',
        width: '25px',
        outline: '1px solid var(--bg-5)',
      },

      [`.${fk}-file-input-wrpr .file-details`]: {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        padding: '0px 10px',
        width: '94%',
      },

      [`.${fk}-file-input-wrpr .file-title`]: {
        display: 'inline-block',
        'font-size': '12px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        color: 'var(--global-font-color)',
      },

      [`.${fk}-file-input-wrpr .file-size`]: {
        'font-size': '12px',
        'line-height': '1',
        color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.7)',
      },

      [`.${fk}-file-input-wrpr .cross-btn`]: {
        cursor: 'pointer',
        border: 'none',
        'border-radius': '50px',
        'box-shadow': 'none',
        color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.8)',
        'font-size': '20px',
        height: '25px',
        'line-height': '1',
        'min-height': '25px',
        'min-width': '25px',
        padding: '0',
        'text-decoration': 'none',
        width: '25px',
        transition: 'background-color 150ms',
        'background-color': 'var(--bg-15)',
      },
      [`.${fk}-file-input-wrpr .cross-btn:hover`]: {
        'background-color': 'var(--bg-20)',
        color: 'var(--global-font-color)',
      },
      [`.${fk}-file-input-wrpr .err-wrp`]: {
        display: 'none',
        opacity: '0',
        transition: 'display 1s, opacity 1s',
        'align-items': 'center',
        'background-color': 'hsla(0, 100%, 97%, 100%)',
        color: 'darkred',
        'border-radius': '10px',
        height: '40px',
        'margin-top': '10px',
        padding: '2px 10px',
        width: '100%',
      },

      [`.${fk}-file-input-wrpr .err-wrp.active`]: {
        display: 'flex',
        opacity: '1',
        transition: 'display 1s, opacity 1s',
      },

    }
  }
  return {}
}
