/* eslint-disable camelcase */
export default function paypalStyle_3_atlassian({ fk }) {
  return {
    [`.${fk}-paypal-wrp`]: {
      width: '750px',
      'min-width': 150,
      'max-width': 750,
      margin: 'auto',
    },
  }
}