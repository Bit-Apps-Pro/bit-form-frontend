/* eslint-disable camelcase */
export default function textStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'var(--fld-wrp-dis, block)',
      'flex-direction': 'var(--fld-wrp-fdir, row)',
      background: 'var(--fld-wrp-bg, transparent)',
      width: '100%',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
    },
    [`.${fk}-lbl-wrp`]: { width: 'var(--lbl-wrp-width, auto)', 'align-self': 'var(--lbl-wrp-sa, auto)', margin: 'var(--lbl-wrp-m, 0)', padding: 'var(--lbl-wrp-p, 0)' },
    [`.${fk}-lbl`]: { 'font-size': 'var(--fl-fs)', display: 'block', 'text-align': 'var(--lbl-al, left)', margin: 'var(--fl-m, 0)', padding: 'var(--fl-p, 0)' },
    [`.${fk}-sub-titl`]: { 'font-size': 'var(--sub-titl-fs)', 'text-align': 'var(--sub-titl-al, left)', padding: 'var(--sub-titl-p, 0)', margin: 'var(--sub-titl-m, 0)' },
    [`.${fk}-hlp-txt`]: { 'font-size': 'var(--hlp-txt-fs)', 'text-align': 'var(--hlp-txt-al, left)', padding: 'var(--hlp-txt-p, 0)', margin: 'var(--hlp-txt-m, 0)' },
    [`.${fk}-inp-fld-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },
    [`.${fk}-inp-wrp`]: { width: 'var(-inp-wrp-width, auto)' },

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
      'border-width': 'var(--g-bdr-width)!important',
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
