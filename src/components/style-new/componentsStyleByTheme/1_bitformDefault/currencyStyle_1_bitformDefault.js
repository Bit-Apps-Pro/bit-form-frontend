/* eslint-disable camelcase */
import inputWrapperClasses from './inputWrapperClasses'

export default function currencyStyle_1_BitformDefault({ fk, type, direction }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-currency-fld-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },
    [`.${fk}-currency-fld-wrp`]: {
      width: '100%',
      'border-radius': '8px',
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      border: '1px solid rgba(199, 212, 221, 1)',
      transition: 'box-shadow .3s',
    },
    [`.${fk}-currency-fld-wrp:hover:not(.${fk}-menu-open,.${fk}-disabled)`]: { 'border-color': 'rgba(29, 158, 249, 1)' },
    [`.${fk}-currency-fld-wrp:focus-within:not(.${fk}-menu-open,.${fk}-disabled)`]: {
      'border-color': 'rgba(29, 158, 249, 1)',
      'box-shadow': '0 0 0 3px rgba(0, 132, 255, 0.26)',
    },
    [`.${fk}-menu-open`]: {
      'z-index': 999,
      'box-shadow': '0px 1.2px 2.2px rgba(0, 0, 0, 0.032), 0px 2.9px 5.3px rgba(0, 0, 0, 0.045), 0px 5.4px 10px rgba(0, 0, 0, 0.054), 0px 9.6px 17.9px rgba(0, 0, 0, 0.062), 0px 18px 33.4px rgba(0, 0, 0, 0.073), 0px 43px 80px rgba(0, 0, 0, 0.1)',
      'border-color': '#ddd',
    },
    [`.${fk}-currency-inner-wrp`]: { display: 'flex' },
    [`.${fk}-dpd-wrp:focus-visible`]: { 'box-shadow': '0 0 0 2px red inset' },
    [`.${fk}-dpd-wrp`]: {
      overflow: 'hidden',
      'border-radius': '7px',
      'font-weight': 500,
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      cursor: 'pointer',
      height: '38px',
      padding: '8px 12px',
      'box-sizing': 'border-box',
      position: 'relative',
      'font-size': '12px',
      outline: 'none',
    },
    [`.${fk}-dpd-wrp:hover`]: { 'background-color': '#f1f1f1' },
    [`.${fk}-selected-currency-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      height: '100%',
    },

    [`.${fk}-selected-currency-lbl`]: { 'font-size': '16px' },
    [`.${fk}-selected-currency-img`]: {
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'box-shadow': '0 0 0 1px #e1e1e1',
      'margin-right': '10px',
      'background-color': 'rgb(0 0 0 / 5%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },
    [`.${fk}-input-clear-btn`]: {
      display: 'none',
      right: '6px',
      padding: 0,
      margin: 0,
      background: 'transparent',
      border: 0,
      outline: 0,
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      width: '16px',
      height: '15px',
      'border-radius': '50%',
    },

    [`.${fk}-input-clear-btn:hover`]: { 'background-color': '#fafafa' },

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
      'font-size': '16px',
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
      height: 0,
      margin: 'auto',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      'background-color': 'white',
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
      'margin-bottom': '5px',
      padding: '0 7px',
    },

    [`.${fk}-icn`]: {
      position: 'absolute',
      stroke: '#afadad',
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
      border: 'none',
      height: '35px',
      'border-radius': '8px',
      'background-color': 'rgb(241, 242, 248)',
      'font-size': '16px',
    },

    [`.${fk}-opt-search-input:focus~svg`]: { stroke: 'rgba(29, 158, 249, 1)' },

    [`.${fk}-opt-search-input::-webkit-search-decoration`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-cancel-button`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-results-button`]: { display: 'none' },
    [`.${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

    [`.${fk}-search-clear-btn`]: {
      display: 'none',
      right: '6px',
      padding: 0,
      margin: 0,
      background: 'transparent',
      border: 0,
      outline: 0,
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      width: '16px',
      height: '16px',
      'border-radius': '50%',
    },

    [`.${fk}-search-clear-btn:hover`]: { 'background-color': '#fafafa' },

    [`.${fk}-search-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px blue inset',
      outline: 'none',
    },

    [`.${fk}-option-list`]: {
      padding: 0,
      margin: 0,
      height: '100%',
      'overflow-y': 'auto',

      /* firefox */
      'scrollbar-width': 'thin !important',
      'scrollbar-color': 'rgba(0, 0, 0, 0.2) !important',
    },

    [`.${fk}-option-list::-webkit-scrollbar`]: { width: '8px' },

    [`.${fk}-option-list::-webkit-scrollbar-thumb`]: {
      'background-color': 'rgba(0, 0, 0, 0.1)',
      'border-radius': '10px',
    },

    [`.${fk}-option`]: {
      margin: '0 5px',
      transition: 'background 0.2s',
      'border-radius': '6px',
      'font-size': '14px',
      cursor: 'pointer',
      'text-align': 'left',
      border: 'none',
      padding: '5px 7px',
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-option:hover:not(.selected-opt)`]: { 'background-color': 'rgb(236, 236, 236)' },

    [`.${fk}-option:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsl(216, 100%, 50%) inset',
      outline: 'none',
    },

    [`.${fk}-selected-opt`]: {
      color: 'white',
      'background-color': 'hsl(216, 100%, 50%)',
    },

    [`.${fk}-selected-opt:focus-visible`]: { 'background-color': 'hsl(216, 100%, 40%)' },

    [`.${fk}-opt-not-found`]: {
      'text-align': 'center',
      'list-style': 'none',
      'margin-top': '5px',
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
      'box-shadow': '0 0 0 1px #e1e1e1',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-opt-suffix`]: {
      color: 'rgb(3, 3, 3)',
      'font-size': '10px',
    },

    [`.${fk}-menu-open .${fk}-dpd-down-btn`]: { transform: 'rotate(180deg)' },

    // field style
    [`.${fk}-fld`]: {
      display: ' inline-block !important',
      direction: 'inherit !important',
      'max-width': '100% !important',
      'font-family': 'sans-serif',
      width: '100% !important',
      outline: 'none !important',
      'background-color': 'var(--global-fld-bg-color, transparent)!important',
      'border-color': 'var(--global-fld-bdr-clr)!important',
      'border-radius': 'var(--g-bdr-rad)!important',
      'border-style': 'solid!important',
      'border-width': 'var(--g-bdr-width)!important',
      'font-size': 'var(--fld-fs)!important',
      color: 'var(--global-font-color)!important',
      padding: '10px 8px 10px 8px!important',
      'line-height': '1.4 !important',
      height: type === 'textarea' ? 'calc(100% - 30px)' : '40px',
      ...type === 'textarea' && { resize: 'vertical' },
    },
    [`.${fk}-fld:focus`]: {
      'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30)!important',
      'border-color': 'var(--global-accent-color)!important',
    },
    [`.${fk}-fld:hover`]: { 'border-color': 'var(--global-accent-color)!important' },
    [`.${fk}-fld::placeholder`]: { color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.4)!important' },

    // title icon
    [`.${fk}-title-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-title-suf-i`]: {
      width: '20px',
      height: '20px',
    },

    // field icon
    [`.${fk}-pre-i`]: {
      position: 'absolute',
      left: '3px',
      top: '50%',
      padding: '7px',
      transform: 'translateY(-50%)',
    },
    [`.${fk}-suf-i`]: {
      position: 'absolute',
      padding: '7px',
      right: '3px',
      top: '50%',
      transform: 'translateY(-50%)',
    },

  }
}
