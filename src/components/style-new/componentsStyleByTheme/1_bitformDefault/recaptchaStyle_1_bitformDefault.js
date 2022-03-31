/* eslint-disable camelcase */
export default function recaptchaStyle_1_bitformDefault({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'var(--fld-wrp-dis, block)',
      'flex-direction': 'var(--fld-wrp-fdir, row)',
      'justify-content': 'left',
      'background-color': 'var(--fld-wrp-bg, transparent)',
      width: '100%',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
      'box-shadow': 'var(--fld-wrp-sh, none)',
      border: 'var(--fld-wrp-bdr, medium none)',
      'border-width': 'var(--fld-wrp-bdr-width, 0)',
      'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
    },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'rgba(0, 0, 0, 0.2)',
    },
  }
}
