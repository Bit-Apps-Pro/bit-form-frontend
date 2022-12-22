/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'flex',
        height: '100%',
        'align-items': 'center',
      },
      [`.${fk}-divider`]: {
        margin: '15px 10px 15px 10px',
        width: '100%',
        'border-bottom': 'solid',
        'border-color': 'hsla(0, 0%, 67%, 100)',
        'border-width': '1px !important',
      },
    }
  }
  return {}
}
