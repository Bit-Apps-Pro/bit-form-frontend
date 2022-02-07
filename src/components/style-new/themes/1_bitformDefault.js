/* eslint-disable camelcase */
import checkboxNradioStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/checkboxNradioStyle_1_bitformDefault'
import textStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/textStyle_1_bitformDefault'
import titleStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/titleStyle_1_bitformDefault'
import dividerStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/dividerStyle_1_bitformDefault'
import imageStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/imageStyle_1_bitformDefault'
import buttonStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/buttonStyle_1_bitformDefault'

export default function bitformDefaultTheme(fk, type, direction) {
  switch (type) {
    case 'theme':
      return {
        theme: 'bitformDefault',
        themeVars: {
          '--global-accent-color': 'hsla(0, 10%, 20%, 100)',
          '--gah': 0,
          '--gas': 10,
          '--gal': 20,
          '--gaa': 100,
          '--global-font-color': 'hsla(0, 10%, 20%, 100)',
          '--gfh': 0,
          '--gfs': 10,
          '--gfl': 20,
          '--gfa': 100,
          '--global-bg-color': 'hsla(240, 100%, 97%, 100)',
          '--gbg-h': 0,
          '--gbg-s': 10,
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
        theme: 'bitformDefault',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        classes: textStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'check':
    case 'radio':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        classes: checkboxNradioStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'title':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: titleStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'image':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: imageStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'divider':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: dividerStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'button':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: buttonStyle_1_bitformDefault({ fk, type, direction }),
      }
    default:
      return {}
  }
}
