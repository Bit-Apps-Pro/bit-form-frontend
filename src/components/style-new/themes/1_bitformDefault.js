/* eslint-disable camelcase */
import advanceFileUpStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/advancedFileUp_1_bitformDefault'
import buttonStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/buttonStyle_1_bitformDefault'
import checkboxNradioStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/checkboxNradioStyle_1_bitformDefault'
import countryStyle_1_BitformDefault from '../componentsStyleByTheme/1_bitformDefault/countryStyle_1_bitformDefault'
import currencyStyle_1_BitformDefault from '../componentsStyleByTheme/1_bitformDefault/currencyStyle_1_bitformDefault'
import decisionBoxStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/decisionBoxStyle_1_bitformDefault'
import dividerStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/dividerStyle_1_bitformDefault'
import dropdownStyle_1_BitformDefault from '../componentsStyleByTheme/1_bitformDefault/dropdownStyle_1_bitformDefault'
import fileUploadStyle_1_BitformDefault from '../componentsStyleByTheme/1_bitformDefault/fileUpload_1_bitformDefault'
import htmlStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/htmlStyle_1_bitformDefault'
import imageStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/imageStyle_1_bitformDefault'
import phoneNumberStyle_1_bitformDefault from '../componentsStyleByTheme/1_bitformDefault/phoneNumberStyle_1_bitformDefault'
import selectStyle_1_BitformDefault from '../componentsStyleByTheme/1_bitformDefault/selectStyle_1_bitformDefault'
import textStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/textStyle_1_bitformDefault'
import titleStyle1BitformDefault from '../componentsStyleByTheme/1_bitformDefault/titleStyle_1_bitformDefault'

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
        classes: textStyle1BitformDefault({ fk, type, direction }),
      }
    case 'decision-box':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        classes: decisionBoxStyle_1_bitformDefault({ fk, type, direction }),
      }
    case 'check':
    case 'radio':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        classes: checkboxNradioStyle1BitformDefault({ fk, type, direction }),
      }
    case 'title':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: titleStyle1BitformDefault({ fk, type, direction }),
      }
    case 'image':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: imageStyle1BitformDefault({ fk, type, direction }),
      }
    case 'divider':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: dividerStyle1BitformDefault({ fk, type, direction }),
      }
    case 'button':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: buttonStyle1BitformDefault({ fk, type, direction }),
      }
    case 'advanced-file-up':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: advanceFileUpStyle1BitformDefault({ fk, type, direction }),
      }
    case 'html':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: htmlStyle1BitformDefault({ fk, type, direction }),
      }
    case 'currency':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: currencyStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'country':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: countryStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'recaptcha':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: currencyStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'file-up':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: fileUploadStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'html-select':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: selectStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'select':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: dropdownStyle_1_BitformDefault({ fk, type, direction }),
      }
    case 'phone-number':
      return {
        theme: 'bitformDefault',
        fieldType: type,
        overrideGlobalTheme: [],
        classes: phoneNumberStyle_1_bitformDefault({ fk }),
      }
    default:
      return {}
  }
}
