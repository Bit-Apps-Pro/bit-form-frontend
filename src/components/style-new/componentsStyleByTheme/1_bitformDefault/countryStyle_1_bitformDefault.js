/* eslint-disable camelcase */

import inputWrapperClasses from './inputWrapperClasses'

export default function countryStyle_1_BitformDefault({ fk }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-country-fld-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },

    [`.${fk}-country-fld-wrp`]: {
      position: 'absolute',
      width: '100%',
      'background-color': 'var(--global-fld-bg-color, transparent)',
      border: 'var(--global-fld-bdr) !important',
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

    [`.disabled .dpd-wrp`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },
    [`.readonly .dpd-wrp`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 20%), var(--gfbg-a))',
      color: 'hsla(var(--gfh), var(--gfs), calc(var(--gfl) + 40%), var(--gfa))',
      'border-color': 'hsla(var(--gfbc-h), var(--gfbc-s), calc(var(--gfbc-l) + 20%), var(--gfbc-a))',
    },

    [`.${fk}-country-fld-wrp:hover:not(.menu-open):not(.disabled)`]: { 'border-color': 'var(--global-accent-color) !important' },

    [`.${fk}-country-fld-wrp:focus-within:not(.menu-open):not(.disabled)`]: {
      'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30) !important',
      'border-color': 'var(--global-accent-color) !important',
    },

    [`.${fk}-country-fld-wrp.menu-open`]: {
      'z-index': '999',
      'box-shadow': `0px 1.2px 2.2px hsla(0, 0%, 0%, 3.2%),
      0px 2.9px 5.3px hsla(0, 0%, 0%, 4.5%),
      0px 5.4px 10px hsla(0, 0%, 0%, 5.4%),
      0px 9.6px 17.9px hsla(0, 0%, 0%, 6.2%),
      0px 18px 33.4px hsla(0, 0%, 0%, 7.3%),
      0px 43px 80px hsla(0, 0%, 0%, 10%)`,
      'border-color': 'hsla(0, 0%, 87%, 100%)',
    },

    [`.${fk}-country-fld-wrp:focus-within`]: {
      /* box-shadow: 0 0 0 2px white, 0 0 0 4px blue, */
    },

    [`.${fk}-dpd-wrp:focus-visible`]: {
      /* box-shadow: 0 0 0 2px rgb(0, 132, 255) inset, */
    },

    [`.${fk}-dpd-wrp`]: {
      'background-color': 'transparent',
      overflow: 'hidden', // unused css
      'border-radius': '7px', // unused css
      'font-weight': '500', // unused css
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      cursor: 'pointer',
      height: '40px',
      padding: '8px 12px',
      'box-sizing': 'border-box', // unused css
      // 'font-size': '12px',
      position: 'relative', // unused css
      outline: 'none', // unused css
      /* border      : 1px solid red, */
    },

    [`.${fk}-selected-country-lbl`]: {
      // 'font-size': 'var(--fld-fs) !important',
      // 'font-family': 'var(--g-font-family)',
      // color: 'var(--global-font-color) !important',
    },

    [`.${fk}-selected-country-wrp`]: {
      height: '100%', // unused css
      display: 'flex',
      'align-items': 'center',
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

    [`.${fk}-inp-clr-btn`]: {
      display: 'none',
      right: '6px', // unused css
      padding: '0', // unused css
      margin: '0', // unused css
      background: 'transparent',
      border: '0',
      outline: '0', // unused css
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      width: '16px',
      height: '16px', // unused css
      'border-radius': '50%',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-inp-clr-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-dpd-btn-wrp`]: {
      display: 'flex',
      'align-items': 'center', // unused css
    },

    [`.${fk}-opt-lbl`]: {},

    [`.${fk}-option-wrp`]: {
      'max-height': '0px',
      'min-height': 'auto', // unused css
      margin: 'auto', // unused css
      width: '100%', // unused css
      overflow: 'hidden', // unused css
      display: 'flex',
      'flex-direction': 'column',
      'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a))',
      transition: 'height .3s',
    },

    [`.${fk}-option-inner-wrp`]: {
      /* padding: 5px, */
      'padding-top': '0', // unused css
      /* border     : 1px solid #ddd, */
      'border-top': '0', // unused css
      margin: '0', // unused css
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
    },

    [`.${fk}-option-list`]: {
      padding: '0',
      margin: '0',
      height: '100%', // unused css
      'overflow-y': 'auto',

      /* firefox */
      'scrollbar-width': 'thin !important',
      'scrollbar-color': 'hsla(0, 0%, 0%, 100%) !important',
    },

    [`.${fk}-option-list::-webkit-scrollbar`]: { width: '8px' },

    /* .option-list::-webkit-scrollbar-track {
      background: #fafafa,
    }, */

    [`.${fk}-option-list::-webkit-scrollbar-thumb`]: {
      'background-color': 'hsla(0, 0%, 0%, 2%)',
      'border-radius': '10px',
    },

    [`.${fk}-option-search-wrp`]: {
      position: 'relative',
      // 'margin-bottom': '5px',
      padding: '5px',
    },

    [`.${fk}-opt-search-icn`]: {
      position: 'absolute',
      stroke: 'hsla(0, 1%, 68%, 100%)',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '13px'
    },

    [`.${fk}-opt-search-input`]: {
      width: '100%',
      padding: '5px', // unused css
      'padding-left': '41px',
      outline: 'none',
      'box-shadow': 'none',
      /* border-radius: 8px, */
      border: 'none',
      /* border-top: 1px solid #ddd, */
      /* border-bottom: 1px solid #ddd, */
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

    [`.${fk}-opt-search-input:focus`]: {
      /* border-radius   : 20px,
      background-color: red, */
    },

    [`.${fk}-search-clear-btn`]: {
      display: 'none',
      right: '6px',
      width: '16px',
      height: '16px',
      padding: '0',
      margin: '0',
      background: 'transparent',
      border: '0',
      outline: '0',
      cursor: 'pointer',
      'margin-right': '5px',
      'place-content': 'center',
      'border-radius': '50%',
      color: 'var(--global-font-color) !important',
    },

    [`.${fk}-search-clear-btn:hover`]: { 'background-color': 'hsla(0, 0%, 98%, 100%)' },

    [`.${fk}-option`]: {
      margin: '0 5px',
      transition: 'background 0.2s',
      'border-radius': '6px',
      'font-size': 'var(--fld-fs)',
      cursor: 'pointer',
      'text-align': 'left', // unused css
      border: 'none', // unused css
      padding: '5px 7px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
    },

    [`.${fk}-option:hover:not(.selected-opt)`]: { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 90%, var(--gfbg-l))' },

    [`.${fk}-option:focus-visible`]: {
      'box-shadow': '0 0 0 2px hsla(var(--gfbg-h), var(--gfbg-s), var(--gfbg-l), var(--gfbg-a)) inset',
      outline: 'none',
    },

    '.selected-opt': { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

    '.selected-opt:focus-visible': { 'background-color': 'hsla(var(--gfbg-h), var(--gfbg-s), 80%, var(--gfbg-a))' },

    '.opt-not-found': {
      'text-align': 'center',
      'list-style': 'none',
      margin: '5px',
    },

    [`.${fk}-search-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
      outline: 'none',
    },

    [`.${fk}-inp-clr-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px hsla(240, 100%, 50%, 100%) inset',
      outline: 'none',
    },

    [`.${fk}-opt-lbl-wrp`]: {
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-opt-icn`]: {
      'margin-right': '10px',
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'box-shadow': '0 0 0 1px hsla(0, 0%, 88%, 100%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-dpd-down-btn`]: {
      width: '15px', // unused css
      display: 'grid',
      'place-content': 'center',
      transition: 'transform 0.2s',
    },

    [`.menu-open .dpd-down-btn`]: { transform: 'rotate(180deg)' },

    [`.disabled .selected-country-lbl`]: { color: 'hsla(0, 0%, 33%, 100%) !important' },

    [`.disabled .selected-country-clear-btn`]: { cursor: 'not-allowed' },

    '.disabled-opt': {
      'pointer-events': 'none',
      cursor: 'not-allowed',
      color: 'hsla(0, 0%, 33%, 100%) !important',
      opacity: '0.5',
    },
  }
}
