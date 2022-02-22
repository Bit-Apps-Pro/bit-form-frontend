const labelCssProps = {
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
  color: '',
  'font-size': '',
  'font-weight': '',
  'font-style': '',
  'text-align': '',
  'text-decoration': {
    'text-decoration-line': true,
    'text-decoration-style': true,
    'text-decoration-color': true,
    'text-decoration-thickness': true,
  },
  'text-shadow': '',
  'box-shadow': '',
  margin: '5px',
  padding: '5px',
  opacity: '100%',
}
const iconCssProps = {
  border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  height: '',
  size: { width: '100%', height: '100%' },
  'box-shadow': '',
  filter: '',
}

const fieldWrpCssProps = {
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  'background-color': '',
  border: {
    border: true,
    'border-color': true,
    'border-width': true,
    'border-radius': true,
  },
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  'box-shadow': '',
  width: '',
  height: '',
}

const textFldCssProps = {
  'fld-wrp': {
    states: ['hover'],
    properties: { ...fieldWrpCssProps },
  },
  fld: {
    states: ['hover', 'focus'],
    properties: { ...fieldWrpCssProps },
  },
  'lbl-wrp': {
    states: ['hover'],
    properties: { ...fieldWrpCssProps },
  },
  lbl: {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'lbl-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'lbl-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'title-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'title-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'hlp-txt': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'hlp-txt-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'hlp-txt-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'err-msg': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'err-txt-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'err-txt-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
}

const chackProps = {
  margin: '',
  padding: '',
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  border: {
    border: true,
    'border-color': true,
    'border-width': true,
    'border-radius': true,
  },
  width: '',
  height: '',
  transition: '',
  shadow: '',
  color: '',
}
const editorConfig = {
  formWrapper: {
    states: ['hover'],
    properties: {
      background: {
        'background-image': true,
        'background-position': true,
        'background-repeat': true,
        'background-size': true,
        'backdrop-filter': true,
      },
      color: '',
      padding: '5px',
      margin: '5px',
      border: '',
      'box-shadow': '',
      transition: '',
    },
  },
  defaultProps: {
    margin: '0px',
    padding: '0px',
    border: '',
  },
  texfieldStyle: {
    states: ['hover'],
    properties: {
      background: {
        'background-image': true,
        'background-position': true,
        'background-repeat': true,
        'background-size': true,
        'backdrop-filter': true,
      },
      'background-color': '',
      color: '',
      'font-size': '',
      border: { width: true, color: true, radius: true },
      margin: '5px',
      padding: '5px',
      opacity: '100%',
      'text-align': '',
      'text-decoration': {
        'text-decoration-line': true,
        'text-decoration-style': true,
        'text-decoration-color': true,
        'text-decoration-thickness': true,
      },
      'text-shadow': '',
      'box-shadow': '',
      'border-radius': '',
      transition: '',
      filter: '',
      'font-weight': '',
      'font-style': '',
      'line-height': '',
      'word-spacing': '',
      'letter-spacing': '',
      'z-index': '',
      height: '',
      width: '',
    },
  },
  text: { ...textFldCssProps },
  textarea: { ...textFldCssProps },
  check: {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cc: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cl: {
      states: ['hover'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
      },
    },
    ck: {
      states: ['hover', 'focus', 'checked'],
      properties: { ...chackProps },
    },
    ct: {
      states: ['hover', 'focus'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        'line-height': '',
        'word-spacing': '',
        'letter-spacing': '',
      },
    },

  },
  radio: {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cc: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cl: {
      states: ['hover'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
      },
    },
    rdo: {
      states: ['hover', 'focus', 'checked'],
      properties: { ...chackProps },
    },
    ct: {
      states: ['hover', 'focus'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        'line-height': '',
        'word-spacing': '',
        'letter-spacing': '',
      },
    },

  },
  title: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    logo: {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'titl-wrp': {
      states: ['hover'],
      properties: {
        ...fieldWrpCssProps,
        width: '',
      },
    },
    title: {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'sub-titl': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'title-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'title-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'sub-titl-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'sub-titl-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  divider: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    divider: {
      states: ['hover'],
      properties: {
        border: {
          'border-bottom': true,
          'border-color': true,
          'border-width': true,
          'border-radius': true,
        },
        'border-image': {
          'border-image': true,
          'border-image-slice': true,
          'border-image-width': true,
          'border-image-outset': true,
          'border-image-repeat': true,
        },
        margin: '5px',
        opacity: '100%',
        'box-shadow': '',
      },
    },
  },
  image: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    img: {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  button: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    btn: {
      states: ['hover', 'focus'],
      properties: {
        background: {
          'background-image': true,
          'background-position': true,
          'background-repeat': true,
          'background-size': true,
          'backdrop-filter': true,
        },
        border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
        margin: '5px',
        padding: '5px',
        opacity: '100%',
        'box-shadow': '',
        'font-size': '',
        'font-weight': '',
        width: '',
        height: '',
        color: '',
        transition: '',
        'text-decoration': {
          'text-decoration-line': true,
          'text-decoration-style': true,
          'text-decoration-color': true,
          'text-decoration-thickness': true,
        },
      },
    },
    'btn-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'btn-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'hlp-txt': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'hlp-txt-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'hlp-txt-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
}
export default editorConfig
