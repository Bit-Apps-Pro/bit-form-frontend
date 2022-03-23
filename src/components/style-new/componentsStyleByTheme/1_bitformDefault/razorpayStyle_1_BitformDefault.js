/* eslint-disable camelcase */
export default function razorpayStyle_1_BitformDefault({ fk }) {
  return {
    [`.${fk}-razorpay-wrp`]: {
      display: 'flex',
      'align-items': 'center',
      'flex-direction': 'column',
    },

    [`.${fk}-razorpay-btn`]: {
      'font-size': '13px',
      border: 'none',
      padding: '7px 10px',
      'border-radius': '5px',
      margin: '10px 5px',
      cursor: 'pointer',
      outline: 'none',
      'box-shadow': 'hsla(240, 5%, 41%, 20%) 0px 7px 29px 0px',
      color: 'white',
      'font-weight': '700',
      background: '#0083f3',
    },

    [`.${fk}-razorpay-btn:hover`]: { background: '#0072d6' },

    [`.${fk}-razorpay-btn:active`]: {
      background: '#0066be',
      transform: 'scale(0.98)',
    },
  }
}
