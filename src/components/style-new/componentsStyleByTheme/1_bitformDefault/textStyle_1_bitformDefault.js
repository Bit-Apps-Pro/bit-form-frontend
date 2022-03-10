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
      padding: '7px',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
    },
    [`.${fk}-suf-i`]: {
      position: 'absolute',
      padding: '7px',
      right: '3px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
    },
  }
}
