/* eslint-disable camelcase */
import checkboxNradioStyle_3_material from './checkboxNradioStyle_3_material'
import textStyle_3_material from './textStyle_3_material'

export default function materialTheme({ fieldKey: fk, type, direction, breakpoint = 'lg', colorScheme = 'light' }) {
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
      return text({ type, fk, breakpoint, colorScheme })
    case 'check':
    case 'radio':
      return radioCheckBox({ type, fk, direction, breakpoint, colorScheme })
    default:
      return {}
  }
}

const text = ({ type, fk, breakpoint, colorScheme }) => {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      theme: 'material',
      // fieldThemeVars: {},
      fieldType: type,
      overrideGlobalTheme: [],
      classes: textStyle_3_material({ fk, type, breakpoint, colorScheme }),
    }
  }
  return {}
}

const radioCheckBox = ({ type, fk, direction, breakpoint, colorScheme }) => {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      theme: 'material',
      // fieldThemeVars: {},
      fieldType: type,
      overrideGlobalTheme: [],
      classes: checkboxNradioStyle_3_material({ fk, type, direction, breakpoint, colorScheme }),
    }
  }
}
