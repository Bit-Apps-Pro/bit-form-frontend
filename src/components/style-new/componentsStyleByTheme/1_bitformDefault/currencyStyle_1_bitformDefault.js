/* eslint-disable camelcase */
import inputWrapperClasses from './inputWrapperClasses'

export default function currencyStyle_1_BitformDefault({ fk }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-currency-fld-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },
    [`.${fk}-currency-fld-wrp`]: {
      position: 'absolute',
      width: '100%',
      'background-color': 'var(--global-fld-bg-color, transparent)',
      border: 'solid var(--global-fld-bdr-clr) !important',
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
    [`.disabled .${fk}-currency-inner-wrp`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },
    [`.readonly .${fk}-currency-inner-wrp`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },

    [`.disabled .${fk}-currency-amount-input`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },
    [`.readonly .${fk}-currency-amount-input`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },
    [`.${fk}-currency-fld-wrp:hover:not(.${fk}-menu-open, .${fk}-disabled)`]: {
      // border: 'solid hsla(0, 0%, 93%, 100%)',
      // 'border-width': '1px',
      'border-color': 'var(--global-accent-color) !important',
    },
    [`.${fk}-currency-fld-wrp:focus-within:not(.${fk}-menu-open, .${fk}-disabled)`]: {
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
    [`.${fk}-currency-inner-wrp`]: {
      display: 'flex',
      height: '100%',
    },

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
    [`.${fk}-dpd-wrp:focus-visible`]: { 'box-shadow': '0 0 0 2px hsla(0, 100%, 50%, 100%) inset' },

    [`.${fk}-selected-currency-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      height: '100%',
    },

    [`.${fk}-selected-currency-lbl`]: {
      // 'font-size': 'var(--fld-fs) !important',
      // 'font-family': 'var(--g-font-family)',
      // color: 'var(--global-font-color) !important',
    },
    [`.${fk}-selected-currency-img`]: {
      height: '17px',
      width: '25px',
      border: 'none',
      'border-width': '0px',
      'border-radius': '3px',
      'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
      margin: '0px 10px 0px 0px',
      'background-color': 'hsla(0, 0%, 0%, 5%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },
    [`.${fk}-input-clear-btn`]: {
      display: 'none',
      right: '6px',
      padding: '0px',
      margin: '0px 5px 0px 0px',
      background: 'transparent',
      border: 'none',
      'border-width': '0px',
      'border-radius': '50%',
      outline: 0,
      cursor: 'pointer',
      'place-content': 'center',
      width: '16px',
      height: '15px',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-input-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-input-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px blue inset',
      outline: 'none',
    },

    [`.${fk}-dpd-down-btn`]: {
      width: '15px',
      display: 'grid',
      'place-content': 'center',
      transition: 'transform 0.2s',
    },

    [`.${fk}-currency-amount-input`]: {
      border: 0,
      outline: 0,
      width: 'calc(100% - 50px)',
      padding: '8px',
      'padding-right': '26px',
      'font-size': 'var(--fld-fs) !important',
      'font-family': 'var(--g-font-family)',
      color: 'var(--global-font-color) !important',
      'background-color': 'var(--global-fld-bg-color, transparent)',
    },

    // /* Chrome, Safari, Edge, Opera */
    [`.${fk}-currency-amount-input::-webkit-outer-spin-button`]: {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    [`.${fk}-currency-amount-input::-webkit-inner-spin-button`]: {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    // /* Firefox */
    [`.${fk}-currency-amount-input[type=number]`]: { '-moz-appearance': 'textfield' },

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
      'padding-top': 0,
      'border-top': 0,
      margin: 0,
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

    [`.${fk}-opt-search-input::-webkit-search-decoration`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-cancel-button`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-results-button`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

    [`.${fk}-search-clear-btn`]: {
      display: 'none',
      right: '6px',
      padding: '0px',
      margin: '0px',
      background: 'transparent',
      border: '',
      'border-width': '0px',
      'border-radius': '50%',
      outline: 0,
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      width: '16px',
      height: '16px',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-search-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-search-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
      outline: 'none',
    },

    [`.${fk}-option-list`]: {
      padding: 0,
      margin: 0,
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
      margin: '0 5px',
      transition: 'background 0.2s',
      'border-radius': '6px',
      // 'font-size': 'var(--fld-fs)',
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
      // color: 'white',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))',
    },

    [`.${fk}-selected-opt:focus-visible`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

    [`.${fk}-opt-not-found`]: {
      'text-align': 'center',
      'list-style': 'none',
      margin: '5px',
    },
    [`.${fk}-opt-lbl`]: {},

    [`.${fk}-opt-lbl-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      'margin-right': '5px',
    },

    [`.${fk}-opt-icn`]: {
      margin: '0px 10px',
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'border-width': '1px',
      'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-opt-suffix`]: { 'font-size': 'calc(var(--fld-fs) - 50%)' },

    [`.${fk}-menu-open .${fk}-dpd-down-btn`]: { transform: 'rotate(180deg)' },
  }
}
