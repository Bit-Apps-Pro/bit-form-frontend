/* eslint-disable camelcase */
import checkboxNradioStyle_2_material from '../../componentsStyleByTheme/2_material/checkboxNradioStyle_2_material'

export default function materialTheme(fk, type, direction) {
  switch (type) {
    case 'theme':
      return {
        theme: 'material',
        themeVars: {
          '--global-accent-color': 'hsla(210, 100%, 50%, 100)',
          '--gah': 210,
          '--gas': 100,
          '--gal': 50,
          '--gaa': 100,
          '--global-font-color': 'hsla(0, 10%, 20%, 100)',
          '--gfh': 0,
          '--gfs': 10,
          '--gfl': 20,
          '--gfa': 100,
          '--global-bg-color': 'hsla(181, 100%, 97%, 100)',
          '--gbg-h': 0,
          '--gbg-s': 181,
          '--gbg-l': 20,
          '--gbg-a': 100,
          '--global-fld-bg-color': 'var(--global-bg-color)',
          '--border-radius': '10px',
          '--dir': 'ltr',
        },
        form: {},
        fields: {},
      }
    case 'form':
      return { _frm: { background: 'var(--global-bg-color)' } }
    case 'text':
    case 'number':
    case 'password':
    case 'username':
    case 'email':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':
    case 'textarea':
      return {
        [`.${fk}-fld-wrp`]: {
          background: 'var(--primary-color)',
          height: '100%',
          'text-align': 'start',
          width: '100%',
          padding: '10px',
        },
        [`.${fk}-lbl`]: {
          display: 'block',
          overflow: 'hidden',
          margin: 0,
          'font-weight': 500,
          'font-size': '16px',
          color: 'rgba(42, 49, 99, 1)!important',
          'line-height': '1.4!important',
        },
        [`.${fk}inp-fld-wrp`]: { position: 'relative' },
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
    case 'check':
    case 'radio':
      return {
        theme: 'material',
        fieldThemeVars: {},
        fieldType: type,
        overrideGlobalTheme: false,
        classes: checkboxNradioStyle_2_material({ fk, type, direction }),
      }
    default:
      return {}
  }
}
