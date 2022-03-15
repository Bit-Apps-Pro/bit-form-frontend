/* eslint-disable camelcase */
import inputWrapperClasses from './inputWrapperClasses'

export default function dropdownStyle_1_BitformDefault({ fk, type, direction }) {
  return {
    ...inputWrapperClasses(fk),

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
