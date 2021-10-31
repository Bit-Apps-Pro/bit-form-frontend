/* eslint-disable camelcase */
export default function textStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fw`]: {
      display: 'var(--fw-dis, block)',
      'flex-direction': 'var(--fw-fdir, row)',
      // background: 'var(--primary-color)',
      // height: '100%',
      width: '100%',
      padding: '10px',
    },
    [`.${fk}-lw`]: { width: 'var(--lw-width)', 'align-self': 'var(--lw-sa, auto)' },
    [`.${fk}-lbl`]: { display: 'block', 'text-align': 'var(--lbl-al, left)' },
    [`.${fk}-st`]: { 'font-size': '12px', 'text-align': 'var(--st-al, left)' },
    [`.${fk}-ht`]: { 'font-size': '12px', 'text-align': 'var(--ht-al, left)' },
    [`.${fk}-iw`]: { width: 'var(--iw-width)' },
    [`.${fk}-ifw`]: { position: 'relative' },

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
      'border-radius': '6px 6px 6px 6px!important',
      'border-style': 'solid!important',
      'border-width': '1px 1px 1px 1px!important',
      'font-size': '15px!important',
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
  }
}
