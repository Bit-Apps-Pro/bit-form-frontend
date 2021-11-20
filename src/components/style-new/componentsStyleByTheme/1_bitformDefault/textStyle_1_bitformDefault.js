/* eslint-disable camelcase */
export default function textStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fw`]: {
      display: 'var(--fw-dis, block)',
      'flex-direction': 'var(--fw-fdir, row)',
      background: 'var(--fw-bg, transparent)',
      width: '100%',
      padding: 'var(--fw-p, 0)',
      margin: 'var(--fw-m, 0)',
      position: 'relative',
    },
    [`.${fk}-lw`]: { width: 'var(--lw-width, auto)', 'align-self': 'var(--lw-sa, auto)', margin: 'var(--lw-m, 0)', padding: 'var(--lw-p, 0)' },
    [`.${fk}-lbl`]: { 'font-size': 'var(--fl-fs)', display: 'block', 'text-align': 'var(--lbl-al, left)', margin: 'var(--fl-m, 0)', padding: 'var(--fl-p, 0)' },
    [`.${fk}-st`]: { 'font-size': 'var(--st-fs)', 'text-align': 'var(--st-al, left)', padding: 'var(--st-p, 0)', margin: 'var(--st-m, 0)' },
    [`.${fk}-ht`]: { 'font-size': 'var(--ht-fs)', 'text-align': 'var(--ht-al, left)', padding: 'var(--ht-p, 0)', margin: 'var(--ht-m, 0)' },
    [`.${fk}-ifw`]: { position: 'relative', margin: 'var(--fld-m, 0)' },
    [`.${fk}-iw`]: { width: 'var(--iw-width, auto)' },

    // field style
    [`.${fk}-fld`]: {
      display: ' inline-block !important',
      direction: 'inherit !important',
      'max-width': '100% !important',
      'font-family': 'sans-serif',
      width: '100% !important',
      outline: 'none !important',
      'background-color': 'rgba(0, 0, 0, 0)!important',
      'border-color': 'rgba(199, 212, 221, 1)!important',
      'border-radius': 'var(--g-bdr-rad)!important',
      'border-style': 'solid!important',
      'border-width': '1px 1px 1px 1px!important',
      'font-size': 'var(--fld-fs)!important',
      color: 'rgba(0, 0, 0, 1)!important',
      padding: '10px 8px 10px 8px!important',
      'line-height': '1.4 !important',
      height: type === 'textarea' ? 'calc(100% - 30px)' : '40px',
      ...type === 'textarea' && { resize: 'vertical' },
    },
    [`.${fk}-fld:focus`]: {
      'box-shadow': '0px 0px 0px 3px rgba(151, 203, 252, 0.38) !important',
      'border-color': 'rgba(29, 158, 249, 1)!important',
    },
    [`.${fk}-fld:hover`]: { 'border-color': 'rgba(29, 158, 249, 1)!important' },
    [`.${fk}-fld::placeholder`]: { color: 'rgba(213, 212, 221, 1)!important' },

    // fld icon
    [`.${fk}-pre-i`]: {
      position: 'absolute',
      left: '3px',
      top: '50%',
      padding: '7px',
      transform: 'translateY(-50%)',
    },
    [`.${fk}-suf-i`]: {
      position: 'absolute',
      padding: '7px',
      right: '3px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  }
}
