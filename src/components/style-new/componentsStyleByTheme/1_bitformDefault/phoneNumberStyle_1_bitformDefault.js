/* eslint-disable camelcase */
import inputWrapperClasses from './inputWrapperClasses'

export default function phoneNumberStyle_1_bitformDefault({ fk }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-phone-fld-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },

    [`.${fk}-phone-fld-wrp`]: {
      width: '100%',
      'background-color': 'var(--global-fld-bg-color, transparent)',
      border: 'solid var(--global-fld-bdr-clr) !important',
      'border-radius': 'var(--g-bdr-rad) !important',
      'border-width': 'var(--g-bdr-width) !important',
      'font-size': 'var(--fld-fs) !important',
      'font-family': 'var(--g-font-family)',
      color: 'var(--global-font-color) !important',
      overflow: 'hidden',
      // display: 'flex',
      'flex-direction': 'column',
      transition: 'box-shadow .3s',
    },
    [`.disabled .${fk}-phone-inner-wrp`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(0, 0%, 94%, 30%) !important',
      color: 'hsla(0, 0%, 33%, 100%) !important',
      'border-color': ' hsla(0, 0%, 46%, 30%) !important',
    },
    [`.readonly .${fk}-phone-inner-wrp`]: {
      'background-color': 'hsla(0, 0%, 94%, 30%) !important',
      color: 'hsla(0, 0%, 33%, 100%) !important',
      'border-color': ' hsla(0, 0%, 46%, 30%) !important',
      cursor: 'not-allowed',
      'pointer-events': 'none',
    },

    [`.disabled .${fk}-phone-number-input`]: {
      'background-color': 'hsla(0, 0%, 94%, 30%) !important',
      color: 'hsla(0, 0%, 33%, 100%) !important',
      'border-color': ' hsla(0, 0%, 46%, 30%) !important',
      cursor: 'not-allowed',
      'pointer-events': 'none',
    },
    [`.readonly .${fk}-phone-number-input`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(0, 0%, 94%, 30%) !important',
      color: 'hsla(0, 0%, 33%, 100%) !important',
      'border-color': ' hsla(0, 0%, 46%, 30%) !important',
    },

    [`.${fk}-phone-fld-wrp:hover:not(.${fk}-menu-open, .${fk}-disabled)`]: {
      // border: 'solid hsla(205, 95%, 55%, 100%)',
      // 'border-width': '1px',
      'border-color': 'var(--global-accent-color) !important',
    },

    [`.${fk}-phone-fld-wrp:focus-within:not(.${fk}-menu-open, .${fk}-disabled)`]: {
      // border: 'solid hsla(205, 95%, 55%, 100%)',
      // 'border-width': '1px',
      // 'box-shadow': '0 0 0 3px hsla(209, 100%, 50%, 26%)',
      'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30) !important',
      'border-color': 'var(--global-accent-color) !important',
    },

    [`.${fk}-menu-open`]: {
      'z-index': 999,
      'box-shadow':
        '0px 1.2px 2.2px hsla(0, 0%, 0%, 32%), 0px 2.9px 5.3px hsla(0, 0%, 0%, 22%),0px 5.4px 10px hsla(0, 0%, 0%, 21%),0px 9.6px 17.9px hsla(0, 0%, 0%, 17%),0px 18px 33.4px hsla(0, 0%, 0%, 17%),0px 43px 80px hsla(0, 0%, 0%, 10%)',
      border: 'solid hsla(0, 0%, 87%, 100%)',
      'border-width': '1px',
    },

    [`.${fk}-phone-inner-wrp`]: {
      display: 'flex',
      height: '100%',
    },

    [`.${fk}-dpd-wrp:focus-visible`]: { 'box-shadow': ' 0 0 0 2px hsla(0, 100%, 50%, 100%) inset' },

    [`.${fk}-dpd-wrp`]: {
      'background-color': 'transparent',
      overflow: 'hidden',
      'font-weight': 500,
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      cursor: 'pointer',
      height: '40px',
      padding: '8px 12px',
      'box-sizing': 'border-box',
      position: 'relative',
      'font-size': '12px',
      outline: 'none',
    },

    [`.${fk}-dpd-wrp:hover`]: { 'background-color': 'hsla(0, 0%, 95%, 100%)' },

    [`.${fk}-selected-country-wrp`]: {
      height: '100%',
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-selected-country-lbl`]: {
      // 'font-size': 'var(--fld-fs) !important',
      // 'font-family': 'var(--g-font-family)',
      // color: 'var(--global-font-color) !important',
    },

    [`.${fk}-selected-country-img`]: {
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
      'margin-right': '10px',
      'background-color': 'hsla(0, 0%, 0%, 5%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-input-clear-btn`]: {
      display: 'none',
      right: '6px',
      padding: '0px',
      background: 'transparent',
      border: '0px',
      outline: '0px',
      cursor: 'pointer',
      margin: '0px 5px 0px 0px',
      'place-content': 'center',
      width: '16px',
      height: '15px',
      'border-radius': '50%',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-input-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-input-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
      outline: 'none',
    },
    [`.${fk}-dpd-down-btn`]: {
      width: '15px',
      display: 'grid',
      'place-content': 'center',
      transition: 'transform 0.2s',
    },

    [`.${fk}-phone-number-input`]: {
      border: '0px',
      outline: '0px',
      width: 'calc(100% - 50px)',
      padding: '8px 26px 8px 8px',
      'font-size': 'var(--fld-fs) !important',
      'font-family': 'var(--g-font-family)',
      color: 'var(--global-font-color) !important',
      'background-color': 'var(--global-fld-bg-color, transparent)',
    },

    [`.${fk}-opt-lbl`]: {},

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
      'padding-top': '0px',
      'border-top': '0px',
      margin: '0px',
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
    },

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
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-opt-search-icn`]: { left: '13px' },

    [`.${fk}-opt-search-input`]: {
      width: '100%',
      padding: '5px',
      'padding-left': '41px',
      outline: 'none',
      'box-shadow': 'none',
      border: 'none',
      height: '35px',
      'border-radius': '8px',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-a))',
      'font-size': '16px',
      'font-family': 'var(--g-font-family)',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-opt-search-input:focus~svg`]: { stroke: 'var(--global-font-color)' },

    [`.${fk}-opt-search-input::-webkit-search-decoration, .${fk}-opt-search-input::-webkit-search-cancel-button, .${fk}-opt-search-input::-webkit-search-results-button, .${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

    [`.${fk}-search-clear-btn`]: {
      display: 'none',
      right: '6px',
      height: '16px',
      padding: '0px',
      margin: '0px',
      background: 'transparent',
      border: '0px',
      outline: '0px',
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      width: '16px',
      'border-radius': '50%',
      color: 'var(--global-font-color)',
    },

    [`.${fk}-search-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-search-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
      outline: 'none',
    },

    [`.${fk}-option-list`]: {
      padding: '0px',
      margin: '0px',
      height: '100%',
      'overflow-y': 'auto',

      /* firefox */
      'scrollbar-width': 'thin !important',
      'scrollbar-color': 'hsla(0, 0%, 0%, 20%) !important',
    },

    [`.${fk}-option-list::-webkit-scrollbar`]: { width: '8px' },

    [`.${fk}-option-list::-webkit-scrollbar-thumb`]: {
      'background-color': 'hsla(0, 0%, 0%, 10%)',
      'border-radius': '10px',
    },

    [`.${fk}-option`]: {
      margin: '0px 5px',
      transition: 'background 0.2s',
      'border-radius': '6px',
      // 'font-size': 'var(--fld-fs) !important',
      cursor: 'pointer',
      'text-align': 'left',
      border: 'none',
      padding: '5px 7px',
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-option:hover:not(.selected-opt)`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-l))' },

    [`.${fk}-option:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a)) inset',
      outline: 'none',
    },

    [`.${fk}-selected-opt`]: {
      // color: ' hsla(0, 0%, 100%, 100%)',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))',
    },

    [`.${fk}-selected-opt:focus-visible`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

    [`.${fk}-opt-not-found`]: {
      'text-align': 'center',
      ' list-style': 'none',
      ' margin-top': '5px',
    },

    [`.${fk}-opt-lbl-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      'margin-right': '5px',
    },

    [`.${fk}-opt-icn`]: {
      'margin-right': '10px',
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'box-shadow': ' 0 0 0 1px hsla(0, 0%, 88%, 100%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-opt-prefix`]: { 'font-size': 'calc(var(--fld-fs) - 40%)' },

    [`.${fk}-menu-open .${fk}-dpd-down-btn`]: { transform: 'rotate(180deg)' },
  }
}
