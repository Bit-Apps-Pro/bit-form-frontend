import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function repeaterStyle_0_noStyle({ fk, type, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),
      [`.${fk}-inp-fld-wrp`]: {
      },
      [`.${fk}-rpt-flx-wrp`]: {
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
        'align-self': 'center',
      },
      [`.${fk}-rpt-add-btn`]: {
        'font-size': 'var(--btn-fs)!important',
        'font-family': 'inherit',
        'justify-content': 'center',
        'align-items': 'center',
      },
      [`.${fk}-rpt-add-btn-pre-i`]: {
        width: '15px',
      },
      [`.${fk}-rpt-add-btn-suf-i`]: {
        width: '15px',
      },
      [`.${fk}-rpt-rmv-btn`]: {
        'font-family': 'inherit',
        'justify-content': 'center',
        'align-items': 'center',
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
      },
      [`.${fk}-add-to-end-btn`]: {
        'font-family': 'inherit',
        'justify-content': 'center',
        'align-items': 'center',
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
