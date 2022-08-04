/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'flex',
        height: '100%',
        // 'justify-content': 'center', // unused css
        // width: '100%', // unused css
        // padding: '10px 0px', // unused css
        'align-items': 'center',
      },
      [`.${fk}-divider`]: {
        margin: '0px 10px 0px 10px',
        width: '100%',
        // border: '',
        'border-bottom': 'var(--global-fld-bdr)',
        'border-color': 'var(--global-fld-bdr-clr)',
        'border-width': '1px !important',
        // 'border-color': 'hsla(0, 0%, 62%, 100%)',
      },
    }
  }
  return {}
}
