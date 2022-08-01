/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import inputWrapperClasses from '../common/inputWrapperClasses'

export default function dropdownStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-dpd-fld-container`]: {
        position: 'relative',
        height: '40px',
        width: '100%',
        display: 'inline-block',
      },

      [`.${fk}-dpd-fld-wrp`]: {
        position: 'absolute',
        width: '100%',
        'background-color': 'var(--global-fld-bg-color, transparent)',
        'border-style': 'var(--global-fld-bdr) !important',
        'border-color': 'var(--global-fld-bdr-clr) !important',
        'border-radius': 'var(--g-bdr-rad) !important',
        'border-width': 'var(--g-bdr-width) !important',
        'font-size': 'var(--fld-fs) !important',
        'font-family': 'var(--g-font-family)',
        color: 'var(--global-font-color) !important',
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column',
        transition: 'box-shadow .3s',
      },

      [`.${fk}-dpd-fld-wrp:hover:not(.${fk}-menu-open,.disabled)`]: { 'border-color': 'var(--global-accent-color) !important' },

      [`.${fk}-dpd-fld-wrp:focus-within:not(.${fk}-menu-open,.disabled)`]: {
        'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30) !important',
        'border-color': 'var(--global-accent-color) !important',
      },

      [`.disabled .${fk}-dpd-wrp`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },
      [`.readonly .${fk}-dpd-wrp`]: {
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },

      [`.${fk}-menu-open`]: {
        'z-index': '999',
        'box-shadow':
          `0px 1.2px 2.2px hsla(0, 0%, 0%, 3.2%),
        0px 2.9px 5.3px hsla(0, 0%, 0%, 4.5%),
        0px 5.4px 10px hsla(0, 0%, 0%, 5.4%),
        0px 9.6px 17.9px hsla(0, 0%, 0%, 6.2%),
        0px 18px 33.4px hsla(0, 0%, 0%, 7.3%),
        0px 43px 80px hsla(0, 0%, 0%, 10%)`,
        'border-color': 'hsla(0, 0%, 87%, 100%)',
      },

      [`.${fk}-dpd-wrp`]: {
        'background-color': 'transparent',
        overflow: 'hidden',
        // 'border-radius': '7px',
        'font-weight': '500',
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        cursor: 'pointer',
        height: '40px',
        padding: '8px 12px',
        'box-sizing': 'border-box',
        // 'font-size': '12px',
        position: 'relative',
        outline: 'none',
        /* border      : 1px solid 'red', */
      },

      [`.${fk}-selected-opt-wrp`]: {
        height: '100%',
        display: 'flex',
        'align-items': 'center',
      },

      [`.${fk}-selected-opt-lbl`]: {
        // 'font-size': 'var(--fld-fs)',
        // 'font-family': 'var(--g-font-family)',
        // color: 'var(--global-font-color)',
      },

      [`.${fk}-selected-opt-img`]: {
        height: '17px',
        width: '25px',
        'border-radius': '3px',
        'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
        'margin-right': '10px',
        'background-color': 'hsla(0, 0%, 0%, 5%)',
        '-webkit-user-select': 'none',
        'user-select': 'none',
      },

      [`.${fk}-selected-opt-clear-btn`]: {
        display: 'none',
        right: '6px',
        padding: '0',
        margin: '0',
        background: 'transparent',
        border: '0',
        outline: '0',
        cursor: 'pointer',
        'margin-right': '5px',
        'place-content': 'center',
        width: '16px',
        height: '16px',
        'border-radius': '50%',
        color: 'var(--global-font-color) !important',
      },

      [`.${fk}-selected-opt-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

      [`.${fk}-dpd-btn-wrp`]: {
        display: 'flex',
        'align-items': 'center',
      },

      [`.${fk}-option-wrp`]: {
        'max-height': '0px',
        'min-height': 'auto',
        margin: 'auto',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a))',
        transition: 'height .3s',
      },

      [`.${fk}-option-inner-wrp`]: {
        'padding-top': '0',
        'border-top': '0',
        margin: '0',
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column',
      },

      [`.${fk}-option-list`]: {
        padding: '0',
        margin: '0',
        height: '100%',
        'overflow-y': 'auto',

        /* firefox */
        'scrollbar-width': 'thin !important',
        'scrollbar-color': 'hsla(0, 0%, 0%, 10%) transparent !important',
      },

      [`.${fk}-option-list::-webkit-scrollbar`]: { width: '8px' },

      /* .option-list::-webkit-scrollbar-track`]: {
        background: #'fafafa',
      }, */

      [`.${fk}-option-list::-webkit-scrollbar-thumb`]: {
        'background-color': 'hsla(0, 0%, 0%, 10%)',
        'border-radius': '10px',
      },

      [`.${fk}-option-list:not(.active-list)`]: { display: 'none' },

      [`.${fk}-option-search-wrp`]: {
        position: 'relative',
        // 'margin-bottom': '5px',
        padding: '5px',
      },

      [`.${fk}-icn`]: {
        position: 'absolute',
        stroke: 'hsla(0, 1%, 68%, 100%)',
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`.${fk}-opt-search-icn`]: { left: '13px' },

      [`.${fk}-opt-search-input`]: {
        width: '100%',
        padding: '5px',
        'padding-left': '41px',
        outline: 'none',
        'box-shadow': 'none',
        /* border-radius: '8px', */
        border: 'none',
        /* border-top: 1px solid #'ddd', */
        /* border-bottom: 1px solid #'ddd', */
        height: '35px',
        'border-radius': '8px',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-a))',
        'font-size': '16px',
        'font-family': 'var(--g-font-family)',
        color: 'var(--global-font-color) !important',
      },

      [`.${fk}-opt-search-input:focus~svg`]: { stroke: 'var(--global-font-color)' },

      [`.${fk}-opt-search-input::-webkit-search-decoration,
    .${fk}-opt-search-input::-webkit-search-cancel-button,
    .${fk}-opt-search-input::-webkit-search-results-button,
    .${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

      [`.${fk}-search-clear-btn`]: {
        display: 'none',
        right: '6px',
        padding: '0',
        margin: '0',
        background: 'transparent',
        border: '0',
        outline: '0',
        cursor: 'pointer',
        'margin-right': '5px',
        'place-content': 'center',
        width: '16px',
        height: '16px',
        'border-radius': '50%',
        color: 'var(--global-font-color)',
      },

      [`.${fk}-search-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

      [`.${fk}-search-clear-btn:focus-visible`]: {
        'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
        outline: 'none',
      },

      [`.${fk}-custom-opt-btn`]: {
        display: 'none',
        right: '30px',
        padding: '5px',
        margin: '0',
        background: 'transparent',
        border: '0.5px solid hsla(var(--gfbg-h), var(--gfbg-s), 70%, var(--gfbg-a)) ',
        outline: '0',
        cursor: 'pointer',
        'place-content': 'center',
        height: '25px',
        'border-radius': '5px',
        color: 'var(--global-font-color)',
      },

      // [`.${fk}-create-opt`]: { display: 'none !important' },

      [`.${fk}-option`]: {
        margin: '2px 5px',
        transition: 'background 0.2s',
        'border-radius': '6px',
        // 'font-size': 'var(--fld-fs)',
        cursor: 'pointer',
        'text-align': 'left',
        border: 'none',
        padding: '5px 7px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
      },

      [`.${fk}-option:hover:not(.selected-opt):not(.${fk}-opt-group-title)`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-l))' },

      [`.${fk}-option:focus-visible`]: {
        'box-shadow': '0 0 0 2px hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a)) inset',
        outline: 'none',
      },

      '.selected-opt:focus-visible': { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

      [`.${fk}-opt-group-title`]: {
        'font-size': 'calc(var(--font-size) - 2px)',
        cursor: 'default',
        background: 'hsla(0, 0%, 98%, 100%)',
        opacity: '.7',
      },

      [`.${fk}-opt-group-child`]: { 'padding-left': '15px' },

      '.selected-opt': {
        // color: 'white',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))',
        // 'background-color': 'hsla(216, 100%, 50%, 100%)',
      },

      [`.${fk}-opt-not-found`]: {
        'text-align': 'center',
        'list-style': 'none',
        margin: '5px',
      },

      [`.${fk}-opt-lbl-wrp`]: {
        display: 'flex',
        'align-items': 'center',
      },
      [`.${fk}-opt-lbl`]: {},

      [`.${fk}-opt-icn`]: {
        'margin-right': '5px',
        height: '17px',
        width: '25px',
        'border-radius': '3px',
        /* box-shadow: 0 0 0 1px #'e1e1e1', */
        '-webkit-user-select': 'none',
        'user-select': 'none',
      },

      [`.${fk}-dpd-down-btn`]: {
        width: '15px',
        display: 'grid',
        'place-content': 'center',
        transition: 'transform 0.2s',
      },

      [`.${fk}-menu-open .dpd-down-btn`]: { transform: 'rotate(180deg)' },

      [`.${fk}-disabled .dpd-wrp`]: {
        'background-color': 'hsla(0, 0%, 94%, 30%)',
        cursor: 'not-allowed',
        'pointer-events': 'none',
      },

      [`.${fk}-disabled .selected-opt-lbl`]: { color: 'hsla(0, 0%, 94%, 30%) !important' },

      [`.${fk}-disabled .selected-opt-clear-btn`]: { cursor: 'not-allowed' },

      [`.${fk}-disabled-opt`]: {
        'pointer-events': 'none',
        cursor: 'not-allowed',
        color: 'hsla(0, 0%, 94%, 30%) !important',
        opacity: '0.5',
      },
    }
  }
  return {}
}
