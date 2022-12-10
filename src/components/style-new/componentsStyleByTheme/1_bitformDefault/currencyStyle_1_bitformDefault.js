/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import inputWrapperClasses from '../common/inputWrapperClasses'

export default function currencyStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-currency-fld-container`]: {
        position: 'relative',
        height: '40px', // unused css
        width: '100%',
        display: 'inline-block', // unused css
      },
      [`.${fk}-currency-fld-wrp`]: {
        position: 'absolute',
        width: '100%',
        'background-color': 'var(--global-fld-bg-color)',
        'border-style': 'var(--global-fld-bdr) !important',
        'border-color': 'var(--global-fld-bdr-clr) !important',
        'border-radius': 'var(--g-bdr-rad) !important',
        'border-width': 'var(--g-bdr-width) !important',
        'font-size': 'var(--fld-fs) !important',
        // 'font-family': 'var(--g-font-family)',
        color: 'var(--global-font-color) !important',
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column',
        transition: 'box-shadow .3s',
      },
      [`.${fk}-currency-fld-wrp.disabled .${fk}-currency-inner-wrp`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },
      [`.${fk}-currency-fld-wrp.readonly .${fk}-currency-inner-wrp`]: {
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },

      [`.${fk}-currency-fld-wrp.disabled .${fk}-currency-amount-input`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa)) !important',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },
      [`.${fk}-currency-fld-wrp.readonly .${fk}-currency-amount-input`]: {
        'pointer-events': 'none',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
        color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa)) !important',
        'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
      },
      [`.${fk}-currency-fld-wrp:hover:not(.menu-open):not(.disabled)`]: {
        // border: 'solid hsla(0, 0%, 93%, 100%)',
        // 'border-width': '1px',
        'border-color': 'var(--global-accent-color) !important',
      },
      [`.${fk}-currency-fld-wrp:focus-within:not(.menu-open):not(.disabled)`]: {
        // border: 'solid hsla(205, 95%, 55%, 100%)',
        // 'border-width': '1px',
        // 'box-shadow': '0 0 0 3px hsla(209, 100%, 50%, 26%)',
        'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30) !important',
        'border-color': 'var(--global-accent-color) !important',
      },

      [`.${fk}-currency-fld-wrp.menu-open`]: {
        'background-color': 'var(--bg-0)',
        'z-index': '999',
        'box-shadow':
          `0px 1.2px 2.2px hsla(0, 0%, 0%, 3.2%),
        0px 2.9px 5.3px hsla(0, 0%, 0%, 4.5%),
        0px 5.4px 10px hsla(0, 0%, 0%, 5.4%),
        0px 9.6px 17.9px hsla(0, 0%, 0%, 6.2%),
        0px 18px 33.4px hsla(0, 0%, 0%, 7.3%),
        0px 43px 80px hsla(0, 0%, 0%, 10%)`,
        border: 'solid var(--bg-20)',
        'border-width': '1px',
      },
      [`.${fk}-currency-inner-wrp`]: {
        display: 'flex',
        height: '100%',
        position: 'relative',
      },

      [`.${fk}-dpd-wrp`]: {
        'background-color': 'transparent',
        overflow: 'hidden', // unused css
        'font-weight': '500', // unused css
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        cursor: 'pointer',
        height: '34px',
        margin: '3px',
        padding: '8px 8px',
        'box-sizing': 'border-box', // unused css
        position: 'relative', // unused css
        'font-size': '12px',
        outline: 'none', // unused css
        'border-radius': 'calc(var(--g-bdr-rad) - 3px)',
      },
      [`.${fk}-dpd-wrp:hover`]: {
        'background-color': 'hsla(var(--gbg-h), var(--gbg-s), calc(var(--gbg-l) + 20%), 0.4)',
      },
      [`.${fk}-dpd-wrp:focus-visible`]: {
        outline: '2px solid var(--global-accent-color)',
      },

      [`.${fk}-selected-currency-wrp`]: {
        display: 'flex',
        'align-items': 'center',
        height: '100%', // unused css
      },

      [`.${fk}-selected-currency-lbl`]: {
        // 'font-size': 'var(--fld-fs) !important',
        // 'font-family': 'var(--g-font-family)',
        // color: 'var(--global-font-color) !important',
      },
      [`.${fk}-selected-currency-img`]: {
        height: '17px !important',
        width: '25px',
        border: 'none', // unused css
        'border-width': '0px', // unused css
        'border-radius': '3px !important',
        'box-shadow': '0 0 0 1px var(--bg-50)',
        margin: '0px 10px 0px 0px',
        'background-color': 'var(--bg-55)',
        '-webkit-user-select': 'none',
        'user-select': 'none',
      },
      [`.${fk}-input-clear-btn`]: {
        position: 'absolute',
        stroke: 'hsla(0, 1%, 68%, 100%)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'none',
        right: '6px',
        padding: '0px !important',
        margin: '0px 5px 0px 0px',
        background: 'transparent !important',
        border: 'none',
        'border-width': '0px',
        'border-radius': '50% !important',
        outline: 0,
        cursor: 'pointer',
        'place-content': 'center',
        width: '16px',
        height: '15px',
        color: 'var(--global-font-color) !important',
      },

      [`.${fk}-input-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%) !important' },

      [`.${fk}-input-clear-btn:focus-visible`]: {
        'box-shadow': '0 0 0 1.5px blue inset',
        outline: 'none',
      },

      [`.${fk}-dpd-down-btn`]: {
        width: '15px', // unused css
        display: 'grid', // unused css
        'place-content': 'center', // unused css
        transition: 'transform 0.2s',
      },

      [`.${fk}-currency-amount-input`]: {
        border: '0px !important',
        outline: '0px',
        width: 'calc(100% - 50px)',
        padding: '8px !important',
        'padding-right': '26px !important',
        'font-size': 'var(--fld-fs) !important',
        // 'font-family': 'var(--g-font-family)',
        color: 'var(--global-font-color) !important',
        'background-color': 'transparent',
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

      [`.${fk}-currency-amount-input::placeholder`]: { color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 40%) !important' },

      [`.${fk}-option-wrp`]: {
        'max-height': '0px',
        'min-height': 'auto', // unused css
        margin: 'auto', // unused css
        width: '100%', // unused css
        overflow: 'hidden', // unused css
        display: 'flex',
        'flex-direction': 'column',
        // 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a))',
        transition: 'max-height 150ms',
      },

      [`.${fk}-option-inner-wrp`]: {
        'padding-top': 0, // unused css
        'border-top': 0, // unused css
        margin: 0, // unused css
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column',
        position: 'relative',
      },

      [`.${fk}-option-search-wrp`]: {
        position: 'relative',
        // 'margin-bottom': '5px',
        // padding: '5px',
        margin: '5px 5px 0 5px',
      },

      [`.${fk}-icn`]: {
        position: 'absolute',
        stroke: 'hsla(0, 1%, 68%, 100%)',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--global-font-color) !important',
      },

      [`.${fk}-opt-search-icn`]: {
        position: 'absolute',
        stroke: 'hsla(0, 1%, 68%, 100%)',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--global-font-color) !important',
        left: '13px',
      },

      [`.${fk}-opt-search-input`]: {
        width: '100%',
        padding: '5px',
        'padding-left': '41px !important',
        outline: 'none',
        'box-shadow': 'none',
        border: 'none !important',
        height: '35px',
        'border-radius': 'calc(var(--g-bdr-rad) - 1px)!important',
        'font-size': '1rem',
        'background-color': 'var(--bg-5)',
        // 'font-family': 'var(--g-font-family)',
        color: 'var(--global-font-color) !important',
      },
      [`.${fk}-opt-search-input::placeholder`]: {
        color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.5)',
      },
      [`.${fk}-opt-search-input:focus`]: {
        'background-color': 'var(--bg-0)',
        'box-shadow': '0 0 0 2px var(--global-accent-color) inset',
      },
      [`.${fk}-opt-search-input:focus~svg`]: { stroke: 'var(--global-accent-color)' },

      [`.${fk}-opt-search-input::-webkit-search-decoration`]: { display: 'none' },
      [`.${fk}-opt-search-input::-webkit-search-cancel-button`]: { display: 'none' },
      [`.${fk}-opt-search-input::-webkit-search-results-button`]: { display: 'none' },
      [`.${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

      [`.${fk}-search-clear-btn`]: {
        position: 'absolute',
        stroke: 'hsla(0, 1%, 68%, 100%)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'none',
        right: '6px',
        padding: '0px !important',
        margin: '0',
        background: 'transparent !important',
        border: '',
        'border-width': '0px',
        'border-radius': '50% !important',
        outline: 0,
        cursor: 'pointer',
        'margin-right': '5px !important',
        'place-content': 'center',
        width: '16px',
        height: '16px',
        color: 'var(--bg-0)',
      },

      [`.${fk}-search-clear-btn:hover`]: {
        'background-color': 'var(--bg-50)!important',
      },

      [`.${fk}-search-clear-btn:focus-visible`]: {
        'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
        outline: 'none',
      },

      [`.${fk}-option-list`]: {
        padding: 0,
        margin: '0px !important',
        height: '100%', // unused css
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

      [`.${fk}-option-list .option`]: {
        margin: '0 5px !important', // unused css
        transition: 'background 0.2s',
        'border-radius': '6px',
        // 'font-size': 'var(--fld-fs)',
        cursor: 'pointer',
        'text-align': 'left', // unused css
        border: 'none', // unused css
        padding: '5px 7px',
        display: 'flex',
        'align-items': 'center',
      },

      [`.${fk}-option-list .option:hover:not(.selected-opt):not(.disabled-opt)`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-l))' },

      [`.${fk}-option-list .option:focus-visible`]: {
        'box-shadow': '0 0 0 1.5px hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a)) inset',
        outline: 'none',
      },

      [`.${fk}-option-list .option:focus-within:not(.selected-opt):not(.disabled-opt)`]: {
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-l))',
      },

      [`.${fk}-option-list .selected-opt`]: {
        // color: 'white',
        'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))',
      },

      [`.${fk}-option-list .selected-opt:focus-visible`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

      [`.${fk}-option-list .opt-not-found`]: {
        'text-align': 'center',
        'list-style': 'none',
        margin: '5px',
      },
      [`.${fk}-option-list .opt-lbl`]: {},

      [`.${fk}-option-list .opt-lbl-wrp`]: {
        display: 'flex',
        'align-items': 'center',
        'margin-right': '5px',
      },

      [`.${fk}-option-list .opt-icn`]: {
        margin: '0px 10px 0px 0px',
        height: '17px',
        width: '25px',
        'border-radius': '3px',
        'border-width': '1px', // unused css
        'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
        '-webkit-user-select': 'none',
        'user-select': 'none',
      },

      [`.${fk}-option-list .opt-suffix`]: { 'font-size': 'calc(var(--fld-fs) - 50%)' },

      [`.${fk}-currency-fld-wrp.menu-open .${fk}-dpd-down-btn`]: { transform: 'rotate(180deg)' },

      [`.${fk}-option-list .disabled-opt`]: {
        'pointer-events': 'none',
        cursor: 'not-allowed',
        color: 'hsla(0, 0%, 33%, 100%) !important',
        opacity: '0.5',
      },
    }
  }
  return {}
}
