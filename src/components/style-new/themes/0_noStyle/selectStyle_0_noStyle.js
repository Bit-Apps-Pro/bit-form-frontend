/* eslint-disable camelcase */

import inputWrapperClasses_0_noStyle from '../common/inputWrapperClasses_0_noStyle'

export default function selectStyle_0_noStyle({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses_0_noStyle(fk),

      [`.${fk}-fld`]: {
        display: ' inline-block !important',
        direction: 'inherit',
        // 'max-width': '100% !important',
        // 'font-family': 'var(--g-font-family)',
        width: '100% !important',
        // outline: 'none !important',
        // 'background-color': 'var(--global-fld-bg-color, transparent)!important',
        // 'border-style': 'var(--global-fld-bdr) !important',
        // 'border-color': 'var(--global-fld-bdr-clr) !important',
        // 'border-radius': 'var(--g-bdr-rad)!important',
        // 'border-width': 'var(--g-bdr-width)!important',
        // 'font-size': 'var(--fld-fs)!important',
        // color: 'var(--global-font-color)!important',
        // padding: '6px!important',
        // 'line-height': '1.4 !important',
        // height: '40px',
      },
      [`.${fk}-fld:focus`]: {
        // 'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.30)!important',
        // 'border-color': 'var(--global-accent-color)!important',
      },
      [`.${fk}-fld:hover`]: {
        // 'border-color': 'var(--global-accent-color)!important'
      },
      [`.${fk}-fld.readonly`]: {
        // cursor: 'not-allowed',
        // 'pointer-events': 'none',
        // color: 'hsla(0, 0%, 33%, 100%)',
        // 'background-color': 'hsla(0, 0%, 94%, 30%) !important',
      },
      [`.${fk}-fld:disabled`]: {
        // cursor: 'not-allowed',
        // 'pointer-events': 'none',
        // 'background-color': 'hsla(0, 0%, 94%, 30%) !important',
        // color: 'hsla(0, 0%, 33%, 100%) !important',
        // 'border-color': 'hsla(0, 0%, 46%, 30%) !important',
      },
      [`.${fk}-fld::placeholder`]: {
        //  color: 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.4)!important'
      },

      [`.${fk}-pre-i`]: {
        width: '15px',
        height: '15px',
        'margin-right': '5px',
      },
      [`.${fk}-suf-i`]: {
        width: '15px',
        height: '15px',
        'margin-left': '5px',
      },
    }
  }
  return {}
}
