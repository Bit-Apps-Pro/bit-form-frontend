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
    [`.${fk}-lbl`]: { 'font-size': 'var(--fld-lbl-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--lbl-al, initial)', margin: 'var(--fld-lbl-m, 0)', padding: 'var(--fld-lbl-p, 0)' },
    [`.${fk}-sub-titl`]: { 'font-size': 'var(--sub-titl-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--sub-titl-al, initial)', padding: 'var(--sub-titl-p, 0)', margin: 'var(--sub-titl-m, 0)' },
    [`.${fk}-hlp-txt`]: { 'font-size': 'var(--hlp-txt-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--hlp-txt-al, init)', padding: 'var(--hlp-txt-p, 0)', margin: 'var(--hlp-txt-m, 0)' },
    [`.${fk}-inp-fld-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },
    [`.${fk}-inp-wrp`]: { width: 'var(--inp-wrp-width, auto)' },

    // field style
    [`.${fk}-fld`]: {
      display: ' inline-block !important',
      direction: 'inherit !important',
      'max-width': '100% !important',
      'font-family': 'sans-serif',
      width: '100% !important',
      outline: 'none !important',
      'background-color': 'var(--global-fld-bg-color, transparent)!important',
      'border-color': 'var(--global-fld-bdr-clr)!important',
      'border-radius': 'var(--g-bdr-rad)!important',
      'border-style': 'solid!important',
      'border-width': 'var(--g-bdr-width)!important',
      'font-size': 'var(--fld-fs)!important',
      color: 'var(--global-font-color)!important',
      padding: '10px 8px 10px 8px!important',
      'line-height': '1.4 !important',
      height: type === 'textarea' ? 'calc(100% - 30px)' : '40px',
      ...type === 'textarea' && { resize: 'vertical' },
    },
    [`.${fk}-fld:focus`]: {
      'box-shadow': '0 0 0 3px hsla(var(--gph), var(--gps), var(--gpl), 0.30)!important',
      'border-color': 'var(--global-primary-color)!important',
    },
    [`.${fk}-fld:hover`]: { 'border-color': 'var(--global-primary-color)!important' },
    [`.${fk}-fld::placeholder`]: { color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.4)!important' },

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
    [`.${fk}-lbl-pre-i`]: {
      width: '25px',
      height: '25px',

    },
    [`.${fk}-sub-titl-icn`]: {
      width: '25px',
      height: '25px',

    },
    [`.${fk}-hlp-txt-icn`]: {
      width: '25px',
      height: '25px',

    },
    [`.${fk}-title-i`]: {
      width: '25px',
      height: '25px',

    },

  }
}
