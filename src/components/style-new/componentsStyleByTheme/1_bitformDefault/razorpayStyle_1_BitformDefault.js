/* eslint-disable camelcase */
export default function razorpayStyle_1_BitformDefault({ fk }) {
  return {
    [`.${fk}-razorpay-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      'flex-direction': 'column',
    },

    // [`.${fk}-razorpay-btn`]: {
    //   'font-size': '13px',
    //   border: 'none',
    //   padding: '7px 10px',
    //   'border-radius': '5px',
    //   margin: '10px 5px',
    //   cursor: 'pointer',
    //   outline: 'none',
    //   'box-shadow': 'hsla(240, 5%, 41%, 20%) 0px 7px 29px 0px',
    //   color: 'white',
    //   'font-weight': '700',
    //   background: '#0083f3',
    // },

    [`.${fk}-razorpay-btn`]: {
      position: 'relative',
      display: 'inline-block',
      ' min-width': '160px',
      height: '45px',
      'border-radius': ' 3px',
      'text-align': 'center',
      'font-style': 'italic',
      overflow: 'hidden',
      background: 'hsla(216, 85%, 18%, 100%)',
      border: 'solid hsla(216, 85%, 18%, 100%)',
      'border-width': '1px',
      color: 'hsla(0, 0%, 100%, 100%)',
      'box-shadow': 'hsla(0, 0%, 0%, 0.1) 0px 4px 12px',
    },

    [`.${fk}-razorpay-btn::before`]: {
      content: '""',
      position: 'absolute',
      left: '-6px',
      top: 0,
      width: '46px',
      height: '100%',
      background: 'hsla(224, 68%, 37%, 100%)',
      'border-radius': '2px 0 0 2px',
      transform: 'skew(-15deg, 0)',
    },

    [`.${fk}-razorpay-btn svg`]: {
      position: 'absolute',
      left: 0,
      top: 0,
      margin: '9px 11px',
    },

    [`.${fk}-btn-text`]: {
      padding: '4px 28px 4px 60px',
      margin: '1px 0',
    },

    [`.${fk}-btn-title`]: {
      display: 'block',
      'min-height': '18px',
      'line-height': '18px',
      'font-size': '16px',
      'font-weight': 800,
      opacity: '.95',
    },

    [`.${fk}-btn-sub-title`]: {
      opacity: '.6',
      'font-size': '8px',
    },

    // [`.${fk}-razorpay-btn:hover`]: { background: '#0072d6' },

    // [`.${fk}-razorpay-btn:active`]: {
    //   background: '#0066be',
    //   transform: 'scale(0.98)',
    // },
  }
}
