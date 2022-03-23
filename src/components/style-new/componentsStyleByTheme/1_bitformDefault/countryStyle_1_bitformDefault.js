/* eslint-disable camelcase */

import inputWrapperClasses from './inputWrapperClasses'

export default function countryStyle_1_BitformDefault({ fk, type, direction }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-country-fld-container`]: {
      position: 'relative',
      height: '40px',
      width: '100%',
      display: 'inline-block',
    },

    [`.${fk}-country-fld-wrp`]: {
      width: '100%',
      'border-radius': '8px',
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      border: 'solid hsla(205, 24%, 82%, 100%)',
      'border-width': '1px',
      transition: 'box-shadow .3s',
    },

    [`.${fk}-country-fld-wrp:hover:not(.menu-open,.disabled)`]: { 'border-color': 'rgba(29, 158, 249, 1)' },

    [`.${fk}-country-fld-wrp:focus-within:not(.menu-open,.disabled)`]: {
      'border-color': 'rgba(29, 158, 249, 1)',
      'box-shadow': '0 0 0 3px rgba(0, 132, 255, 0.26)',
    },

    '.menu-open': {
      'z-index': '999',
      'box-shadow':
        `0px 1.2px 2.2px rgba(0, 0, 0, 0.032),
        0px 2.9px 5.3px rgba(0, 0, 0, 0.045),
        0px 5.4px 10px rgba(0, 0, 0, 0.054),
        0px 9.6px 17.9px rgba(0, 0, 0, 0.062),
        0px 18px 33.4px rgba(0, 0, 0, 0.073),
        0px 43px 80px rgba(0, 0, 0, 0.1)`,
      'border-color': '#ddd',
    },

    [`.${fk}-country-fld-wrp:focus-within`]: {
      /* box-shadow: 0 0 0 2px white, 0 0 0 4px blue, */
    },

    [`.${fk}-dpd-wrp:focus-visible`]: {
      /* box-shadow: 0 0 0 2px rgb(0, 132, 255) inset, */
    },

    [`.${fk}-dpd-wrp`]: {
      overflow: 'hidden',
      'border-radius': '7px',
      'font-weight': '500',
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      cursor: 'pointer',
      height: '38px',
      padding: '8px 12px',
      'box-sizing': 'border-box',
      'font-size': '12px',
      position: 'relative',
      outline: 'none',
      /* border      : 1px solid red, */
    },

    [`.${fk}-selected-country-lbl`]: { 'font-size': '16px' },

    [`.${fk}-selected-country-wrp`]: {
      height: '100%',
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-selected-country-img`]: {
      height: '17px',
      width: '25px',
      'border-radius': '3px',
      'box-shadow': '0 0 0 1px #e1e1e1',
      'margin-right': '10px',
      'background-color': 'rgb(0 0 0 / 5%)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },

    [`.${fk}-selected-country-clear-btn`]: {
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
    },

    [`.${fk}-selected-country-clear-btn:hover`]: { 'background-color': '#fafafa' },

    [`.${fk}-dpd-btn-wrp`]: {
      display: 'flex',
      'align-items': 'center',
    },

    [`.${fk}-opt-lbl`]: {},

    [`.${fk}-option-wrp`]: {
      height: '0',
      margin: 'auto',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      'background-color': 'white',
      transition: 'height .3s',
    },

    [`.${fk}-option-inner-wrp`]: {
      /* padding: 5px, */
      'padding-top': '0',
      /* border     : 1px solid #ddd, */
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
      'scrollbar-color': 'rgba(0, 0, 0, 1) !important',
    },

    [`.${fk}-option-list::-webkit-scrollbar`]: { width: '8px' },

    /* .option-list::-webkit-scrollbar-track {
      background: #fafafa,
    }, */

    [`.${fk}-option-list::-webkit-scrollbar-thumb`]: {
      'background-color': 'rgba(0, 0, 0, 0.2)',
      'border-radius': '10px',
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
      /* border-radius: 8px, */
      border: 'none',
      /* border-top: 1px solid #ddd, */
      /* border-bottom: 1px solid #ddd, */
      height: '35px',
      'border-radius': '8px',
      'background-color': 'rgb(241, 242, 248)',
      'font-size': '16px',
    },

    [`.${fk}-opt-search-input:focus~svg`]: { stroke: 'rgba(29, 158, 249, 1)' },

    [`.${fk}-opt-search-input::-webkit-search-decoration,
    .${fk}-opt-search-input::-webkit-search-cancel-button,
    .${fk}-opt-search-input::-webkit-search-results-button,
    .${fk}-opt-search-input::-webkit-search-results-decoration`]: { display: 'none' },

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
    },

    [`.${fk}-search-clear-btn:hover`]: { 'background-color': '#fafafa' },

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
      'justify-content': 'space-between',
    },

    [`.${fk}-option:hover:not(.selected-opt)`]: { 'background-color': 'rgb(236, 236, 236)' },

    '.selected-opt': {
      color: 'white',
      'background-color': 'hsl(216, 100%, 50%)',
    },

    '.selected-opt:focus-visible': { 'background-color': 'hsl(216, 100%, 40%)' },

    '.opt-not-found': {
      'text-align': 'center',
      'list-style': 'none',
      'margin-top': '5px',
    },

    [`.${fk}-option:focus-visible`]: {
      'box-shadow': '0 0 0 2px hsl(216, 100%, 50%) inset',
      outline: 'none',
    },

    [`.${fk}-search-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px blue inset',
      outline: 'none',
    },

    [`.${fk}-selected-country-clear-btn:focus-visible`]: {
      'box-shadow': '0 0 0 1.5px blue inset',
      outline: 'none',
    },

    '.opt-lbl-wrp': {
      display: 'flex',
      'align-items': 'center',
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

    [`.${fk}-dpd-down-btn`]: {
      width: '15px',
      display: 'grid',
      'place-content': 'center',
      transition: 'transform 0.2s',
    },

    [`.menu-open .${fk}-dpd-down-btn`]: { transform: 'rotate(180deg)' },

    [`.disabled .${fk}-dpd-wrp`]: {
      'background-color': 'rgba(239, 239, 239, 0.3)',
      cursor: 'not-allowed',
      'pointer-events': 'none',
    },

    [`.disabled .${fk}-selected-country-lbl`]: { color: 'rgb(84, 84, 84) !important' },

    [`.disabled .${fk}-selected-country-clear-btn`]: { cursor: 'not-allowed' },

    '.disabled-opt': {
      'pointer-events': 'none',
      cursor: 'not-allowed',
      color: 'rgb(84, 84, 84) !important',
      opacity: '0.5',
    },
  }
}
