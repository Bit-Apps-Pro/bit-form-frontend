import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function buttonStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        ...inputWrapperClasses(fk)[`.${fk}-fld-wrp`],
        display: 'flex',
        'justify-content': 'start',
      },
      // [`.${fk}-fld-wrp`]: {
      //   display: 'flex',
      //   'flex-direction': 'column',
      //   'background-color': 'var(--fld-wrp-bg, transparent)',
      //   padding: 'var(--fld-wrp-p, 0)',
      //   margin: 'var(--fld-wrp-m, 0)',
      //   position: 'relative',
      //   'box-shadow': 'var(--fld-wrp-sh, none)',
      //   'border-style': 'var(--fld-wrp-bdr, medium)',
      //   'border-color': 'var(--fld-wrp-bdr-clr, none)',
      //   'border-width': 'var(--fld-wrp-bdr-width, 0)',
      //   'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
      //   'align-items': 'start',
      // },

      [`.${fk}-btn`]: {
        'font-size': 'var(--btn-fs)',
        padding: 'var(--btn-p)',
        // 'background-color': 'var(--btn-bgc)',
        background: 'var(--btn-bg)',
        color: 'var(--btn-c)',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--btn-bdr)',
        'border-color': 'var(--btn-bdr-clr)',
        'border-radius': 'var(--btn-bdr-rad)',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'var(--g-font-family)',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        margin: 'var(--btn-m)',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      },

      [`.${fk}-btn:disabled`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        opacity: '0.5',
      },
      [`.${fk}-btn-pre-i`]: {
        width: '20px',
        height: '20px',
        margin: '0px 5px 0px 0px',
      },
      [`.${fk}-btn-suf-i`]: {
        width: '20px',
        height: '20px',
        margin: '0px 0px 0px 5px',
      },
      [`.${fk}-hlp-txt`]: {
        background: 'var(--hlp-txt-bg, none)',
        color: 'var(--hlp-txt-c, inherit)',
        'font-size': 'var(--hlp-txt-fs)',
        display: 'flex',
        'align-items': 'center',
        // 'text-align': 'var(--hlp-txt-al, init)',
        padding: 'var(--hlp-txt-p, 0)',
        margin: 'var(--hlp-txt-m, 0)',
        'box-shadow': 'var(--hlp-txt-sh, none)',
        'border-style': 'var(--hlp-txt-bdr, medium)',
        'border-color': 'var(--hlp-txt-bdr-clr, none)',
        'border-radius': 'var(--hlp-txt-bdr-rad, 0)',
        'border-width': 'var(--hlp-txt-bdr-width, 0)',
        width: '100%',
        'font-weight': 'var(--hlp-txt-font-w)',
        'font-style': 'var(--hlp-txt-font-style)',
      },
      [`.${fk}-hlp-txt-pre-i`]: {
        width: 'var(--hlp-txt-pre-i-w)',
        height: 'var(--hlp-txt-pre-i-h)',
        margin: 'var(--hlp-txt-pre-i-m)',
        padding: 'var(--hlp-txt-pre-i-p)',
        'box-shadow': 'var(--hlp-txt-pre-i-sh, none)',
        'border-style': 'var(--hlp-txt-pre-i-bdr, medium)',
        'border-color': 'var(--hlp-txt-pre-i-bdr-clr, none)',
        'border-width': 'var(--hlp-txt-pre-i-bdr-width, 0)',
        'border-radius': 'var(--hlp-txt-pre-i-bdr-rad, 0)',
        filter: 'var(--hlp-txt-pre-i-fltr)',
      },
      [`.${fk}-hlp-txt-suf-i`]: {
        width: 'var(--hlp-txt-suf-i-w)',
        height: 'var(--hlp-txt-suf-i-h)',
        margin: 'var(--hlp-txt-suf-i-m)',
        padding: 'var(--hlp-txt-suf-i-p)',
        'box-shadow': 'var(--hlp-txt-suf-i-sh, none)',
        'border-style': 'var(--hlp-txt-suf-i-bdr, medium)',
        'border-color': 'var(--hlp-txt-suf-i-bdr-clr, none)',
        'border-width': 'var(--hlp-txt-suf-i-bdr-width, 0)',
        'border-radius': 'var(--hlp-txt-suf-i-bdr-rad, 0)',
        filter: 'var(--hlp-txt-suf-i-fltr)',
      },
    }
  }
  return {}
}
