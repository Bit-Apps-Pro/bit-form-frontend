import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function repeaterStyle_2_atlassian({ fk, type, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),
      [`.${fk}-inp-fld-wrp`]: {
        // display: 'grid',
        'border-style': 'dotted',
        'border-color': 'var(--global-fld-bdr-clr)',
        'border-radius': '2px',
        'border-width': '1px',
        padding: '3px',
      },
      [`.${fk}-rpt-fld-wrp`]: {
        display: 'flex',
        'flex-direction': 'column',
      },
      [`.${fk}-rpt-wrp`]: {
        display: 'flex',
        'flex-direction': 'row',
      },
      [`.${fk}-rpt-grid-wrp`]: {
        width: 'calc(100% - 60px)',
      },
      [`.${fk}-pair-btn-wrp`]: {
        display: 'flex',
        'flex-direction': 'row',
        'place-items': 'center',
        padding: '5px',
        'align-self': 'center',
        gap: '5px',
      },
      [`.${fk}-rpt-add-btn`]: {
        'font-size': 'var(--btn-fs)!important',
        padding: '4px',
        // background: 'var(--btn-bg)',
        color: 'var(--global-font-color) !important',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--global-fld-bdr) !important',
        'border-color': 'var(--global-fld-bdr-clr) !important',
        'border-radius': '50%',
        'border-width': 'var(--g-bdr-width) !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        margin: 'var(--btn-m)',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: 'background-color 0.2s, transform 0.2s',
      },
      [`.${fk}-rpt-add-btn:hover`]: {
        'background-color': 'hsl(0, 0%, 86%, 1) !important',
      },
      [`.${fk}-rpt-add-btn:disabled`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        opacity: '0.5',
      },
      [`.${fk}-rpt-add-btn-pre-i`]: {
        width: '15px',
      },
      [`.${fk}-rpt-add-btn-suf-i`]: {
        width: '15px',
      },
      [`.${fk}-rpt-rmv-btn`]: {
        'font-size': 'var(--btn-fs)!important',
        padding: '4px',
        // background: 'var(--btn-bg)',
        color: 'var(--global-font-color) !important',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--global-fld-bdr) !important',
        'border-color': 'var(--global-fld-bdr-clr) !important',
        'border-radius': '50%',
        'border-width': 'var(--g-bdr-width) !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        margin: 'var(--btn-m)',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: 'background-color 0.2s, transform 0.2s',
      },
      [`.${fk}-rpt-rmv-btn:hover`]: {
        'background-color': 'hsl(0, 0%, 86%, 1) !important',
      },
      [`.${fk}-rpt-rmv-btn:disabled`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        opacity: '0.5',
      },
      [`.${fk}-rpt-rmv-btn-pre-i`]: {
        width: '15px',
      },
      [`.${fk}-rpt-rmv-btn-suf-i`]: {
        width: '15px',
      },
      [`.${fk}-add-to-end-btn-wrp`]: {
        display: 'flex',
        'flex-direction': 'row',
        'align-self': 'start',
        padding: '2px 10px',
      },
      [`.${fk}-add-to-end-btn`]: {
        'font-size': 'var(--btn-fs)!important',
        padding: '8px 10px',
        background: 'var(--btn-bg)',
        color: 'var(--btn-c)',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--btn-bdr)',
        'border-color': 'var(--btn-bdr-clr)',
        'border-width': 'var(--btn-bdr-width)',
        'border-radius': 'var(--btn-bdr-rad) !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        margin: 'var(--btn-m)',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: '',
      },
      [`.${fk}-add-to-end-btn:hover`]: {
        'background-color': 'hsl(var(--gah), var(--gas), calc(var(--gal) - 5%)) !important',
      },
      [`.${fk}-add-to-end-btn:active`]: {
        transform: '',
      },
      [`.${fk}-add-to-end-btn:disabled`]: {
        cursor: 'not-allowed',
        'pointer-events': 'none',
        opacity: '0.5',
      },
      [`.${fk}-add-to-end-btn-pre-i`]: {
        width: '15px',
        filter: 'invert(1)',
      },
      [`.${fk}-add-to-end-btn-suf-i`]: {
        width: '15px',
        filter: 'invert(1)',
      },
    }
  }
  return {}
}
