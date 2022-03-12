import inputWrapperClasses from './inputWrapperClasses'

/* eslint-disable camelcase */
export default function textStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    ...inputWrapperClasses(fk),

    [`.${fk}-inp-fld-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },
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
      'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30)!important',
      'border-color': 'var(--global-accent-color)!important',
    },
    [`.${fk}-fld:hover`]: { 'border-color': 'var(--global-accent-color)!important' },
    [`.${fk}-fld::placeholder`]: { color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.4)!important' },

    // title icon
    [`.${fk}-title-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-title-suf-i`]: {
      width: '20px',
      height: '20px',
    },

    // field icon
    [`.${fk}-pre-i`]: {
      position: 'absolute',
      left: '3px',
      top: '50%',
      padding: 'var(--pre-i-p)',
      margin: 'var(--pre-i-m)',
      transform: 'translateY(-50%)',
      width: 'var(--pre-i-w)',
      height: 'var(--pre-i-h)',
      filter: 'var(--pre-i-fltr)',
      'box-shadow': 'var(--pre-i-sh)',
      border: 'var(--pre-i-bdr)',
      'border-width': 'var(--pre-i-bdr-width)',
      'border-radius': 'var(--pre-i-bdr-rad)',
    },
    [`.${fk}-suf-i`]: {
      position: 'absolute',
      padding: 'var(--suf-i-p)',
      margin: 'var(--suf-i-m)',
      right: '3px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 'var(--suf-i-w)',
      height: 'var(--suf-i-h)',
      filter: 'var(--suf-i-fltr)',
      'box-shadow': 'var(--suf-i-sh)',
      border: 'var(--suf-i-bdr)',
      'border-width': 'var(--suf-i-bdr-width)',
      'border-radius': 'var(--suf-i-bdr-rad)',
    },
  }
}
