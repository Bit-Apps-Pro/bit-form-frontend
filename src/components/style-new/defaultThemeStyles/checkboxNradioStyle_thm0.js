/* eslint-disable camelcase */
export default function checkboxNradioStyle_thm0({ fk, type, direction }) {
  return {
    // checkbox symbol
    [`.${fk}-cks`]: {
      position: 'absolute',
      width: 0,
      height: 0,
      'pointer-events': 'none',
      'user-select': 'none',
    },
    [`.${fk}-fw`]: {
      height: '100%',
      'text-align': 'start',
      width: '100%',
      padding: '10px',
    },
    [`.${fk}-lbl`]: {
      display: 'block',
      overflow: 'hidden',
      margin: 0,
      'font-weight': 500,
      'font-size': '16px',
      color: 'rgba(42, 49, 99, 1)!important',
      'line-height': '1.4!important',
    },
    // checkbox container
    [`.${fk}-cc`]: {
      display: 'flex',
      'flex-wrap': 'wrap',
      'margin-top': '8px',
    },
    // checkbox wrapper
    [`.${fk}-cw`]: { 'margin-right': '10px' },
    // checkbox label
    [`.${fk}-cl`]: {
      cursor: 'pointer',
      display: 'flex',
      'align-items': 'center',
    },
    [`.${fk}-ct`]: {
      'line-height': 'initial'
    },
    // checkbox input
    [`.${fk}-ci`]: {
      position: 'absolute',
      opacity: '0!important',
    },
    [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-bx`]: {
      background: 'var(--global-primary-color)',
      'border-color': 'var(--global-primary-color)',
    },
    [`.${fk}-ci:focus ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 3px hsla(var(--gph), var(--gps), var(--gpl), 0.3)' },
    [`.${fk}-ci:active ~ .${fk}-cl .${fk}-bx`]: { transform: 'scale(0.9)' },
    [`.${fk}-ci:disabled ~ .${fk}-cl`]: {
      opacity: 0.6,
      'pointer-events': 'none',
      cursor: 'not-allowed',
    },
    // [`.${fk}-ci:disabled ~ .${fk}-cl .${fk}-bx`]: {
    //   opacity: 0.6,
    //   cursor: 'not-allowed'
    // },
    [`.${fk}-cw:hover .box`]: { 'border-color': 'var(--global-primary-color)' },
    [`.${fk}-bx`]: {
      position: 'relative',
      height: '20px',
      width: '20px',
      border: '2px solid gray',
      display: 'inline-flex',
      ...direction === 'rtl' && { 'margin-left': '10px' },
      ...direction !== 'rtl' && { 'margin-right': '10px' },
      transition: 'all 0.2s',
      'justify-content': 'center',
      'align-items': 'center',
      background: 'white',
    },
    // [`.${fk}-bx::before`]: {
    //   content: '""',
    //   position: 'absolute',
    //   left: '50%',
    //   height: 0,
    //   width: 0,
    // },
    ...type === 'check' && {
      [`.${fk}-ck`]: { 'border-radius': '5px' },
      [`.${fk}-svgwrp`]: {
        height: '12px',
        width: '10px',
        filter: 'drop-shadow(0px 1px 1px #000)',
      },
      [`.${fk}-ck-icn`]: { 'stroke-dashoffset': '16px' },
      [`.${fk}-ck-svgline`]: {
        stroke: 'white',
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2px',
        'stroke-dasharray': '16px',
      },
      [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-ck-icn`]: { 'stroke-dashoffset': 0 },
      // [`.${fk}-ck::before`]: {
      //   top: '40%',
      //   border: 'solid white',
      //   'border-width': 0,
      //   transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.59, 1.82)',
      //   filter: 'drop-shadow(1px 1px 1px gray)',
      //   transform: 'translate(-50%, -50%) rotate(45deg)',
      // },
      // [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-ck::before`]: {
      //   width: '3px',
      //   height: '8px',
      //   'border-width': '0 3px 3px 0',
      // },
    },

    ...type === 'radio' && {
      [`.${fk}-bx::before`]: {
        content: '""',
        position: 'absolute',
        left: '50%',
        height: 0,
        width: 0,
      },
      [`.${fk}-rdo`]: { 'border-radius': '50%' },
      [`.${fk}-rdo::before`]: {
        'border-radius': '50%',
        transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.59, 1.82)',
        top: '50%',
        background: 'white',
        'box-shadow': '0 1px 3px 0px grey',
        transform: 'translate(-50%, -50%)',
      },
      [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-rdo::before`]: {
        width: '50%',
        height: '50%',
      },
    },

  }
}
