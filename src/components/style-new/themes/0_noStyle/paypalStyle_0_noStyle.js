/* eslint-disable camelcase */
export default function paypalStyle_0_noStyle({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'var(--fld-wrp-dis)',
        'flex-direction': 'var(--fld-wrp-fdir)',
        'background-color': 'var(--fld-wrp-bg)',
        padding: 'var(--fld-wrp-p)',
        margin: 'var(--fld-wrp-m)',
        position: 'relative',
        'box-shadow': 'var(--fld-wrp-sh)',
        'border-style': 'var(--fld-wrp-bdr)',
        'border-color': 'var(--fld-wrp-bdr-clr)',
        'border-radius': 'var(--fld-wrp-bdr-rad)',
        'border-width': 'var(--fld-wrp-bdr-width)',
      },

      [`.${fk}-inp-wrp`]: { position: 'relative', margin: 'var(--fld-m)' },

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
