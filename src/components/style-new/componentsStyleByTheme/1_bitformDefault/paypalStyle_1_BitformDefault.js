/* eslint-disable camelcase */
export default function paypalStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-paypal-wrp`]: {
        width: 'auto',
        'min-width': 150,
        'max-width': 750,
        margin: 'auto',
      },
    }
  }
  return {}
}
