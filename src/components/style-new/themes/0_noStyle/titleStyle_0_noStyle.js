/* eslint-disable camelcase */
export default function titleStyle_0_noStyle({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'flex',
        'justify-content': 'center',
        'flex-direction': 'row',
        'align-items': 'center',
      },
      [`.${fk}-titl-wrp`]: { padding: '0px 5px' },
      [`.${fk}-title`]: {
        margin: '5px',
        'text-align': 'center',
        color: 'var(--global-font-color) !important',
        'word-break': 'break-all',
        display: 'flex',
        'align-items': 'center',
      },
      [`.${fk}-sub-titl`]: {
        margin: '5px',
        'text-align': 'center',
        color: 'var(--global-font-color) !important',
        'word-break': 'break-all',
        display: 'flex',
        'align-items': 'center',
      },
      [`.${fk}-logo`]: {
        margin: '5px',
        width: '50px',
        height: '50px',
      },
      [`.${fk}-title-pre-i`]: {
        width: '25px',
        height: '25px',
        margin: '5px',
      },
      [`.${fk}-title-suf-i`]: {
        width: '25px',
        height: '25px',
        margin: '5px',
      },
      [`.${fk}-sub-titl-pre-i`]: {
        width: '20px',
        height: '20px',
      },
      [`.${fk}-sub-titl-suf-i`]: {
        width: '20px',
        height: '20px',
      },
    }
  }
  return {}
}
