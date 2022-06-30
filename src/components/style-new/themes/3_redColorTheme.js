/* eslint-disable camelcase */
import advanceFileUpStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/advancedFileUp_3_redTheme'
import buttonStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/buttonStyle_3_redTheme'
import checkboxNradioStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/checkboxNradioStyle_3_redTheme'
import countryStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/countryStyle_3_redTheme'
import currencyStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/currencyStyle_3_redTheme'
import decisionBoxStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/decisionBoxStyle_3_redTheme'
import dividerStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/dividerStyle_3_redTheme'
import dropdownStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/dropdownStyle_3_redTheme'
import fileUploadStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/fileUpload_3_redTheme'
import htmlStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/htmlStyle_3_redTheme'
import imageStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/imageStyle_3_redTheme'
import paypalStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/paypalStyle_3_redTheme'
import phoneNumberStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/phoneNumberStyle_3_redTheme'
import razorpayStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/razorpayStyle_3_redTheme'
import recaptchaStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/recaptchaStyle_3_redTheme'
import selectStyle_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/selectStyle_3_redTheme'
import textStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/textStyle_3_redTheme'
import titleStyle1_3_redTheme from '../componentsStyleByTheme/3_redColorTheme/titleStyle_3_redTheme'

export default function redColorTheme(fk, type, direction) {
  switch (type) {
    case 'theme':
      return {
        theme: 'redColorTheme',
        themeVars: {
          '--global-accent-color': 'hsla(0, 80%, 80%, 25)',
          '--gah': 0,
          '--gas': 80,
          '--gal': 80,
          '--gaa': 25,
          '--global-font-color': 'hsla(0, 80%, 80%, 25)',
          '--gfh': 0,
          '--gfs': 80,
          '--gfl': 80,
          '--gfa': 25,
          '--global-bg-color': 'hsla(9, 100%, 75%, 100)',
          '--gbg-h': 9,
          '--gbg-s': 100,
          '--gbg-l': 75,
          '--gbg-a': 100,
          '--global-fld-bg-color': 'var(--global-bg-color)',
          '--border-radius': '7px',
          '--dir': 'ltr',
        },
        form: {},
        fields: {},
        font: {},
      }
    case 'form':
      return {
        light: {
          _frm: { 'background-color': 'var(--global-bg-color)' },
          '_frm-bg': {
            padding: '10px',
            border: 'solid hsla(0, 94%, 60%, 100%)',
            'border-width': '1px',
          },
        },
        dark: {
          _frm: { 'background-color': 'var(--global-bg-color)' },
          '_frm-bg': { padding: '10px' },
        },
      }
    case 'font':
      return {
        fontType: '',
        fontURL: '',
        fontWeightVariants: [],
        fontStyle: [],
      }
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
        theme: 'redColorTheme',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: textStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'decision-box':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: decisionBoxStyle_3_redTheme({ fk, type, direction }),
      }
    case 'check':
    case 'radio':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        // fieldThemeVars: {},
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: checkboxNradioStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'title':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: titleStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'image':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: imageStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'divider':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: dividerStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'button':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: buttonStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'advanced-file-up':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: advanceFileUpStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'html':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: htmlStyle1_3_redTheme({ fk, type, direction }),
      }
    case 'currency':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: currencyStyle_3_redTheme({ fk }),
      }
    case 'country':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: countryStyle_3_redTheme({ fk }),
      }
    case 'recaptcha':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: recaptchaStyle_3_redTheme({ fk }),
      }
    case 'file-up':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: fileUploadStyle_3_redTheme({ fk, type, direction }),
      }
    case 'html-select':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: selectStyle_3_redTheme({ fk, type, direction }),
      }
    case 'select':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: dropdownStyle_3_redTheme({ fk, type, direction }),
      }
    case 'phone-number':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: phoneNumberStyle_3_redTheme({ fk }),
      }
    case 'paypal':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: paypalStyle_3_redTheme({ fk }),
      }
    case 'razorpay':
      return {
        theme: 'redColorTheme',
        fieldType: type,
        overrideGlobalTheme: [],
        fieldSize: 'medium',
        classes: razorpayStyle_3_redTheme({ fk }),
      }

    default:
      return {}
  }
}
