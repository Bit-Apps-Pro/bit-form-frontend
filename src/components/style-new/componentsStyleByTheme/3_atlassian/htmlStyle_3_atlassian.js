/* eslint-disable camelcase */
export default function htmlStyle_3_atlassian({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'var(--fld-wrp-dis, block)',
      'flex-direction': 'var(--fld-wrp-fdir, row)',
      'background-color': 'var(--fld-wrp-bg, transparent)',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
      // 'box-shadow': 'var(--fld-wrp-sh, none)', // unused css
      // 'border-radius': 'var(--fld-wrp-bdr-rad, 0)', // unused css
      // border: 'var(--fld-wrp-bdr, medium none)', // unused css
      // 'border-width': 'var(--fld-wrp-bdr-width, 0)', // unused css
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
