/* eslint-disable camelcase */
export default function paypalStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'var(--fld-wrp-dis, block)',
        'flex-direction': 'var(--fld-wrp-fdir, row)',
        'background-color': 'var(--fld-wrp-bg, transparent)',
        padding: 'var(--fld-wrp-p, 0)',
        margin: 'var(--fld-wrp-m, 0)',
        position: 'relative',
        'box-shadow': 'var(--fld-wrp-sh, none)',
        'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
        border: 'var(--fld-wrp-bdr, medium none)',
        'border-width': 'var(--fld-wrp-bdr-width, 0)',
      },

      [`.${fk}-inp-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },

      [`.${fk}-paypal-wrp`]: {
        width: '750px',
        'min-width': 150,
        'max-width': 750,
        margin: 'auto',
      },
    }
  }
  return {}
}
