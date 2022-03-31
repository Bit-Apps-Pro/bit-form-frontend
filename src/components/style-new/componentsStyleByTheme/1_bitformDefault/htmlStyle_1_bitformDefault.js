/* eslint-disable camelcase */
export default function htmlStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      'background-color': 'var(--fld-wrp-bg, transparent)',
      width: '100%',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
      'box-shadow': 'var(--fld-wrp-sh, none)',
      border: 'var(--fld-wrp-bdr, medium none)',
      'border-width': 'var(--fld-wrp-bdr-width, 0)',
      'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
      'align-items': 'start',
    },

    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'hsla(0, 0%, 0%, 20%)',
    },
  }
}
