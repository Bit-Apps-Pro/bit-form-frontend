/* eslint-disable camelcase */
import advanceFileUpStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/advancedFileUp_3_atlassian'
import buttonStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/buttonStyle_3_atlassian'
import checkboxNradioStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/checkboxNradioStyle_3_atlassian'
import countryStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/countryStyle_3_atlassian'
import currencyStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/currencyStyle_3_atlassian'
import decisionBoxStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/decisionBoxStyle_3_atlassian'
import dividerStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/dividerStyle_3_atlassian'
import dropdownStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/dropdownStyle_3_atlassian'
import fileUploadStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/fileUpload_3_atlassian'
import htmlStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/htmlStyle_3_atlassian'
import imageStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/imageStyle_3_atlassian'
import paypalStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/paypalStyle_3_atlassian'
import phoneNumberStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/phoneNumberStyle_3_atlassian'
import razorpayStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/razorpayStyle_3_atlassian'
import recaptchaStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/recaptchaStyle_3_atlassian'
import selectStyle_3_atlassian from '../../componentsStyleByTheme/3_atlassian/selectStyle_3_atlassian'
import textStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/textStyle_3_atlassian'
import titleStyle1_3_atlassian from '../../componentsStyleByTheme/3_atlassian/titleStyle_3_atlassian'

export default function atlassianTheme({ fk, type, direction, fieldsArr }) {
  const fieldsStyles = {}
  switch (type) {
    case 'themeVars': return themeVars
    case 'themeColors': return themeColors
    case 'form': return form
    case 'font': return font
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
      return text(type, fk)
    case 'decision-box':
      return decisionBox(type, fk, direction)
    case 'check':
    case 'radio':
      return checkNradioBox(type, fk, direction)
    case 'title':
      return title(type, fk)
    case 'image':
      return image(type, fk)
    case 'divider':
      return divider(type, fk)
    case 'button':
      return button(type, fk)
    case 'advanced-file-up':
      return advancedFileUP(type, fk)
    case 'html':
      return html(type, fk)
    case 'currency':
      return currency(type, fk)
    case 'country':
      return country(type, fk)
    case 'recaptcha':
      return recaptcha(type, fk)
    case 'file-up':
      return fileUp(type, fk)
    case 'html-select':
      return htmlSelect(type, fk)
    case 'select':
      return select(type, fk)
    case 'phone-number':
      return phoneNumber(type, fk)
    case 'paypal':
      return paypal(type, fk)
    case 'razorpay':
      return razorpay(type, fk)

    default:
      fieldsArr?.map(([fieldKey, fieldData]) => {
        fieldsStyles[fieldKey] = atlassianTheme({ fk: fieldKey, type: fieldData.typ })
      })
      return {
        theme: 'atlassian',
        fieldsSize: 'medium',
        font,
        form,
        fields: fieldsStyles,
      }
  }
}

const themeVars = {
  // '--global-accent-color': 'hsla(0, 80%, 80%, 25)',
  // '--gah': 0,
  // '--gas': 80,
  // '--gal': 80,
  // '--gaa': 25,
  // '--global-font-color': 'hsla(0, 80%, 80%, 25)',
  // '--gfh': 0,
  // '--gfs': 80,
  // '--gfl': 80,
  // '--gfa': 25,
  // '--global-bg-color': 'hsla(9, 100%, 75%, 100)',
  // '--gbg-h': 9,
  // '--gbg-s': 100,
  // '--gbg-l': 75,
  // '--gbg-a': 100,
  // '--global-fld-bg-color': 'var(--global-bg-color)',
  '--border-radius': '7px',
  '--dir': 'ltr',

  // new
  '--g-bdr-rad': '11px', // border radius
  '--g-bdr-width': '1px', // border width
  '--g-font-family': 'inherit', // default font family inherit from theme
  '--inp-wrp-width': '',
  '--lbl-al': '', // label align
  '--fld-p': '', // field padding
  '--fld-m': '', // field margin
  '--fld-fs': '1rem', // field font size

  '--fld-wrp-dis': 'block', // field wrapper display
  '--fld-wrp-fdir': '', // field wrapper flex direction
  '--fld-wrp-m': '', // field wrapper margin
  '--fld-wrp-p': '10px', // field wrapper paddin
  '--fld-wrp-bdr-width': '', // field wrapper border width
  '--fld-wrp-bdr-rad': '', // field wrapper border radius

  '--lbl-wrp-sa': '',
  '--lbl-wrp-width': '100%', // label wrapper  width
  '--lbl-wrp-m': '0 0 5px 0', // label wrapper for margin
  '--lbl-wrp-p': '', // label wrapper for padding
  '--lbl-wrp-bdr-width': '', // label wrapper border width
  '--lbl-wrp-bdr-rad': '', // label wrapper border radius
  '--lbl-font-w': 500, // field font weight
  '--lbl-font-style': '', // field font style

  '--fld-lbl-m': '', // field label margin
  '--fld-lbl-p': '', // field label padding
  '--fld-lbl-fs': '1rem', // field label font size
  '--fld-lbl-bdr-width': '', // field label border width
  '--fld-lbl-bdr-rad': '', // field label border radius
  '--fld-lbl-pn': '', // field label position
  '--fld-font-w': 500, // field font weight
  '--fld-font-style': '', // field font style

  '--req-smbl-m': '', // Required Symbol Margin
  '--req-smbl-p': '', // Required Symbol Padding
  '--req-smbl-fs': '', // Required Symbol Font Size
  '--req-smbl-fw': '', // Required Symbol Font Weight
  '--req-smbl-lh': '', // Required Symbol line height
  '--req-smbl-pn': '', // Required Symbol position
  '--req-smbl-lt': '', // Required Symbol Left Value
  '--req-smbl-rt': '', // Required Symbol Right Value

  '--sub-titl-m': '', // subtitle margin
  '--sub-titl-p': '3px 0', // subtitle padding
  '--sub-titl-al': '', // subtitle align
  '--sub-titl-fs': '12px', // subtitle font size
  '--sub-titl-bdr-width': '', // subtitle border width
  '--sub-titl-bdr-rad': '', // subtitle border radius
  '--sub-titl-font-w': 500, // sub title font weight
  '--sub-titl-font-style': '', // subtitle font style

  '--hlp-txt-m': '', // helper text margin
  '--hlp-txt-p': '3px 0', // hepler text padding
  '--hlp-txt-fs': '12px', // hepler text font size
  '--hlp-txt-al': '', // helper text align
  '--hlp-txt-bdr-width': '', // helper text border width
  '--hlp-txt-bdr-rad': '', // helper text border radius
  '--hlp-txt-font-w': 400, // helper text font weight
  '--hlp-txt-font-style': '', // helper text font style

  '--err-m': '1px', // error messages margin
  '--err-p': '5px', // error messages padding
  '--err-bdr-width': '1px', // error message border width
  '--err-bdr-rad': '8px', // error message border radius
  '--err-txt-al': '', // error text align
  '--err-txt-fs': '12px', // error text font size
  '--err-txt-font-w': 400, // helper text font weight
  '--err-txt-font-style': '', // helper text font style

  '--pre-i-h': '40px', // fld prefix icon height
  '--pre-i-w': '40px', // fld prefix icon width
  '--pre-i-m': '', // fld prefix icon margin
  '--pre-i-p': '7px', // fld prefix icon padding
  '--pre-i-bdr-width': '', // fld prefix icon border width
  '--pre-i-bdr-rad': '8px', // fld prefix icon message border radius

  '--suf-i-h': '40px', // fld suffix icon height
  '--suf-i-w': '40px', // fld suffix icon width
  '--suf-i-m': '', // fld suffix icon margin
  '--suf-i-p': '7px', // fld suffix icon padding
  '--suf-i-bdr-width': '', // fld suffix icon border width
  '--suf-i-bdr-rad': '8px', // fld suffix icon border radius

  '--lbl-pre-i-h': '20px', // label prefix icon height
  '--lbl-pre-i-w': '20px', // label prefix icon width
  '--lbl-pre-i-m': '0 5px 0 0', // label prefix icon margin
  '--lbl-pre-i-p': '', // label prefix icon padding
  '--lbl-pre-i-bdr-width': '', // label prefix icon border width
  '--lbl-pre-i-bdr-rad': '8px', // label prefix icon message border radius

  '--lbl-suf-i-h': '20px', // Label suffix icon height
  '--lbl-suf-i-w': '20px', // Label suffix icon width
  '--lbl-suf-i-m': '5px', // Label suffix icon margin
  '--lbl-suf-i-p': '', // Label suffix icon padding
  '--lbl-suf-i-bdr-width': '', // Label suffix icon border width
  '--lbl-suf-i-bdr-rad': '8px', // Label suffix icon border radius

  '--sub-titl-pre-i-h': '20px', // sub title prefix icon height
  '--sub-titl-pre-i-w': '20px', // sub title prefix icon width
  '--sub-titl-pre-i-m': '5px', // sub title prefix icon margin
  '--sub-titl-pre-i-p': '', // sub title prefix icon padding
  '--sub-titl-pre-i-bdr-width': '', // sub title prefix icon border width
  '--sub-titl-pre-i-bdr-rad': '8px', // sub title prefix icon message border radius

  '--sub-titl-suf-i-h': '20px', // sub title suffix icon height
  '--sub-titl-suf-i-w': '20px', // sub title suffix icon width
  '--sub-titl-suf-i-m': '5px', // sub title suffix icon margin
  '--sub-titl-suf-i-p': '', // sub title suffix icon padding
  '--sub-titl-suf-i-bdr-width': '', // sub title suffix icon border width
  '--sub-titl-suf-i-bdr-rad': '8px', // sub title suffix icon border radius

  '--hlp-txt-pre-i-h': '20px', // helper txt prefix icon height
  '--hlp-txt-pre-i-w': '20px', // helper txt prefix icon width
  '--hlp-txt-pre-i-m': '5px', // helper txt prefix icon margin
  '--hlp-txt-pre-i-p': '', // helper txt prefix icon padding
  '--hlp-txt-pre-i-bdr-width': '', // helper txt prefix icon border width
  '--hlp-txt-pre-i-bdr-rad': '8px', // helper txt prefix icon message border radius

  '--hlp-txt-suf-i-h': '20px', // helper txt suffix icon height
  '--hlp-txt-suf-i-w': '20px', // helper txt suffix icon width
  '--hlp-txt-suf-i-m': '5px', // helper txt suffix icon margin
  '--hlp-txt-suf-i-p': '', // helper txt suffix icon padding
  '--hlp-txt-suf-i-bdr-width': '', // helper txt suffix icon border width
  '--hlp-txt-suf-i-bdr-rad': '8px', // helper txt suffix icon border radius

  '--err-txt-pre-i-h': '20px', // error txt prefix icon height
  '--err-txt-pre-i-w': '20px', // error txt prefix icon width
  '--err-txt-pre-i-m': '5px', // error txt prefix icon margin
  '--err-txt-pre-i-p': '', // error txt prefix icon padding
  '--err-txt-pre-i-bdr-width': '', // error txt prefix icon border width
  '--err-txt-pre-i-bdr-rad': '8px', // error txt prefix icon message border radius

  '--err-txt-suf-i-h': '20px', // error txt suffix icon height
  '--err-txt-suf-i-w': '20px', // error txt suffix icon width
  '--err-txt-suf-i-m': '5px', // error txt suffix icon margin
  '--err-txt-suf-i-p': '', // error txt suffix icon padding
  '--err-txt-suf-i-bdr-width': '', // error txt suffix icon border width
  '--err-txt-suf-i-bdr-rad': '8px', // error txt suffix icon border radius

  '--btn-fs': '16px', // button txt font size
  '--btn-p': '11px 20px', // button padding
  '--btn-m': '10px 0px', // button marging
  '--btn-fw': 700, // button font weight
  '--btn-f-style': '', // button font style (italic, bold, etc)
  '--btn-brs': '5px', // button border radius
  '--btn-brw': '1px', // button border radius
}

const themeColors = {
  '--global-accent-color': 'hsla(0, 80%, 80%, 25)', // Accent Color
  '--gah': 217, // global primary hue
  '--gas': '100%', // global primary saturation
  '--gal': '50%', // global primary lightness
  '--gaa': 100, // global primary opacity
  '--global-font-color': 'hsla(0, 0%, 14%, 100)',
  '--gfh': 0, // global font color hue
  '--gfs': '0%', // global fonst color saaturation
  '--gfl': '14%', // global font color lightness
  '--gfa': 100, // global font color opacity
  '--global-bg-color': '', // background color
  '--gbg-h': 0, // global background color hue
  '--gbg-s': '0%', // global background color saturation
  '--gbg-l': '100%', // global background color lightness
  '--gbg-a': 100, // global background color opacity
  '--global-fld-bdr': 'solid hsla(0, 80%, 80%, 25)', // field Border
  '--gfbc-h': 0, // global field border color hue
  '--gfbc-s': '0%', // global field border color saturation
  '--gfbc-l': '67%', // global field border color lightness
  '--gfbc-a': 100, // global field border color opacity
  '--global-fld-bg-color': 'hsla(0, 0%, 100%, 100)', // field background color
  '--gfbg-h': 0, // global field background color hue
  '--gfbg-s': '0%', // global field background color saturation
  '--gfbg-l': '100%', // global field background color lightness
  '--gfbg-a': 100, // global field background color opacity

  '--fld-wrp-bg': 'hsla(0, 0%, 100%, 100)', // fieldwrapper background
  '--fld-wrp-bdr': '', // field wrapper border
  '--fld-wrp-sh': '', // field wrapper box shadow

  '--lbl-wrp-bg': '', // label wrapper for background
  '--lbl-wrp-sh': '', // label wrapper box shadow
  '--lbl-wrp-bdr': '', // label wrapper border

  '--fld-lbl-bg': '', // field label background color
  '--fld-lbl-c': '', // field babel color
  '--fld-lbl-sh': '', // field label box shadow
  '--fld-lbl-bdr': '', // field label border

  '--req-smbl-c': 'hsla(0, 100%, 50%, 100%)', // Required Symbol Color

  '--sub-titl-bg': '', // sub title background color
  '--sub-titl-c': '', // sub title color
  '--sub-titl-sh': '', // subtitle box shadow
  '--sub-titl-bdr': '', // subtitle border

  '--hlp-txt-bg': '', // helper text background color
  '--hlp-txt-c': '', // helpertext color
  '--hlp-txt-sh': '', // helper text box shadow
  '--hlp-txt-bdr': '', // helper text border

  '--err-bg': 'hsla(0, 82%, 87%, 100)', // error messages background color
  '--err-c': 'hsla(0 , 68%, 35%, 100)', // error messages text color
  '--err-sh': '0px 2px 8px 0px hsla(0, 0%, 39%, 20) ', // error messages box shadow
  '--err-bdr': 'solid hsla(0, 23%, 72%, 100)', // error message border

  '--pre-i-clr': '', // prefix icon color
  '--pre-i-fltr': '', // prefix icon filter
  '--pre-i-sh': '', // prefix icon shadow
  '--pre-i-bdr': '', // prefix icon border

  '--suf-i-clr': '', // suffix icon color
  '--suf-i-fltr': '', // suffix icon filter
  '--suf-i-sh': '', // suffix icon shadow
  '--suf-i-bdr': '', // suffix icon border

  '--lbl-pre-i-clr': '', // label prefix icon color
  '--lbl-pre-i-fltr': '', // label prefix icon filter
  '--lbl-pre-i-sh': '', // label prefix icon shadow
  '--lbl-pre-i-bdr': '', // label prefix icon border

  '--lbl-suf-i-clr': '', // label suffix icon color
  '--lbl-suf-i-fltr': '', // label suffix icon filter
  '--lbl-suf-i-sh': '', // label suffix icon shadow
  '--lbl-suf-i-bdr': '', // label suffix icon border

  '--sub-titl-pre-i-clr': '', // sub title prefix icon color
  '--sub-titl-pre-i-fltr': '', // sub title prefix icon filter
  '--sub-titl-pre-i-sh': '', // sub title prefix icon shadow
  '--sub-titl-pre-i-bdr': '', // sub title prefix icon border

  '--sub-titl-suf-i-clr': '', // sub title suffix icon color
  '--sub-titl-suf-i-fltr': '', // sub title suffix icon filter
  '--sub-titl-suf-i-sh': '', // sub title suffix icon shadow
  '--sub-titl-suf-i-bdr': '', // sub title suffix icon border

  '--hlp-txt-pre-i-clr': '', // helper txt prefix icon color
  '--hlp-txt-pre-i-fltr': '', // helper txt prefix icon filter
  '--hlp-txt-pre-i-sh': '', // helper txt prefix icon shadow
  '--hlp-txt-pre-i-bdr': '', // helper txt prefix icon border

  '--hlp-txt-suf-i-clr': '', // helper txt suffix icon color
  '--hlp-txt-suf-i-fltr': '', // helper txt suffix icon filter
  '--hlp-txt-suf-i-sh': '', // helper txt suffix icon shadow
  '--hlp-txt-suf-i-bdr': '', // helper txt suffix icon border

  '--err-txt-pre-i-clr': '', // helper txt prefix icon color
  '--err-txt-pre-i-fltr': '', // helper txt prefix icon filter
  '--err-txt-pre-i-sh': '', // helper txt prefix icon shadow
  '--err-txt-pre-i-bdr': '', // helper txt prefix icon border

  '--err-txt-suf-i-clr': '', // helper txt suffix icon color
  '--err-txt-suf-i-fltr': '', // helper txt suffix icon filter
  '--err-txt-suf-i-sh': '', // helper txt suffix icon shadow
  '--err-txt-suf-i-bdr': '', // helper txt suffix icon border

  '--btn-bg': 'var(--global-accent-color)', // button backgrond
  '--btn-bgc': 'var(--global-accent-color)', // button backgrond color
  '--btn-c': 'hsla(0, 0%, 100%, 100%)', // button font color color
  '--btn-br': 'none', // button border
  '--btn-sh': '2px 2px 4px -2px hsla(0, 0%, 0%, 40%)', // button shadow

  '--ck-bdr-c': 'hsla(210, 78%, 96%, 100)',
}

const font = {}

const form = {
  light: {
    _frm: { 'background-color': 'var(--global-bg-color)' },
    '_frm-bg': {
      padding: '10px',
      border: 'solid hsla(0, 100%, 50%, 100%)',
      'border-width': '1px',
    },
  },
  dark: {
    _frm: { 'background-color': 'var(--global-bg-color)' },
    '_frm-bg': { padding: '10px' },
  },
}

const text = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  // fieldThemeVars: {},
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: textStyle1_3_atlassian({ fk, type }),

})

const decisionBox = (type, fk, direction) => ({
  theme: 'atlassian',
  fieldType: type,
  // fieldThemeVars: {},
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: decisionBoxStyle_3_atlassian({ fk, direction }),
})

const checkNradioBox = (type, fk, direction) => ({
  theme: 'atlassian',
  fieldType: type,
  // fieldThemeVars: {},
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: checkboxNradioStyle1_3_atlassian({ fk, type, direction }),
})

const title = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: titleStyle1_3_atlassian({ fk }),
})

const image = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: imageStyle1_3_atlassian({ fk }),
})

const divider = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: dividerStyle1_3_atlassian({ fk }),
})

const button = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: buttonStyle1_3_atlassian({ fk }),
})

const advancedFileUP = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: advanceFileUpStyle1_3_atlassian({ fk }),
})

const html = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: htmlStyle1_3_atlassian({ fk, type }),
})

const currency = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: currencyStyle_3_atlassian({ fk }),
})

const country = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: countryStyle_3_atlassian({ fk }),
})

const recaptcha = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: recaptchaStyle_3_atlassian({ fk }),
})

const fileUp = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: fileUploadStyle_3_atlassian({ fk }),
})

const htmlSelect = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: selectStyle_3_atlassian({ fk, type }),
})

const select = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: dropdownStyle_3_atlassian({ fk, type }),
})

const phoneNumber = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: phoneNumberStyle_3_atlassian({ fk }),
})

const paypal = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: paypalStyle_3_atlassian({ fk }),
})

const razorpay = (type, fk) => ({
  theme: 'atlassian',
  fieldType: type,
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: razorpayStyle_3_atlassian({ fk }),
})
