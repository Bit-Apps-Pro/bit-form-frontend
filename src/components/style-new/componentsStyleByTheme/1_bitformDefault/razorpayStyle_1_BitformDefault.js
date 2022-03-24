/* eslint-disable camelcase */
export default function razorpayStyle_1_BitformDefault({ fk }) {
  return {
    [`.${fk}-razorpay-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
    },

    [`.${fk}-razorpay-btn`]: {
      position: 'relative',
      display: 'inline-block',
      ' min-width': '160px',
      height: '45px',
      'border-radius': ' 3px',
      'text-align': 'center',
      'font-style': 'italic',
      overflow: 'hidden',
      'background-color': 'hsla(216, 85%, 18%, 100%)',
      border: 'solid hsla(216, 85%, 18%, 100%)',
      'border-width': '1px',
      // color: 'hsla(0, 0%, 100%, 100%)',
      'box-shadow': 'hsla(0, 0%, 0%, 0.1) 0px 4px 12px',
    },

    [`.${fk}-razorpay-btn::before`]: {
      content: '""',
      position: 'absolute',
      left: '-6px',
      top: 0,
      width: '46px',
      height: '100%',
      'background-color': 'hsla(224, 68%, 37%, 100%)',
      'border-radius': '2px 0 0 2px',
      transform: 'skew(-15deg, 0)',
    },

    [`.${fk}-razorpay-btn svg`]: {
      position: 'absolute',
      left: 0,
      top: 0,
      margin: '9px 11px',
    },

    [`.${fk}-razorpay-btn-text`]: {
      padding: '4px 28px 4px 60px',
      margin: '1px 0px',
      color: 'hsla(0, 0%, 100%, 100%)',
    },

    [`.${fk}-razorpay-btn-title`]: {
      display: 'block',
      'min-height': '18px',
      'line-height': '18px',
      'font-size': '16px',
      'font-weight': 800,
      opacity: '.95',
    },

    [`.${fk}-razorpay-btn-sub-title`]: {
      opacity: '.6',
      'font-size': '8px',
    },

  }
}
