const labelCssProps = {
  background: {},
  border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
  color: {},
  'font-size': {},
  'font-weight': {},
  'font-style': {},
  'text-align': {},
  'text-decoration': {},
  'text-shadow': {},
  'box-shadow': {},
  margin: {},
  padding: {},
  opacity: {},
}
const iconCssProps = {
  border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
  margin: {},
  padding: {},
  opacity: {},
  weight: {},
  height: {},
  size: {},
  'box-shadow': {},
  filter: {},
}

const fieldWrpCssProps = {
  background: {},
  border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
  margin: {},
  padding: {},
  opacity: {},
  'box-shadow': {},
  size: {},
}

const textFldCssProps = {
  'fld-wrp': {
    states: ['hover'],
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
const editorConfig = {
  formWrapper: {
    states: ['hover'],
    properties: {
      background: {},
      color: {},
      padding: {},
      margin: {},
      border: {},
      'box-shadow': {},
      transition: {},
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
      background: {},
      'background-color': {},
      color: {},
      'font-size': {},
      border: { width: true, color: true, radius: true },
      margin: {},
      padding: {},
      opacity: {},
      size: {},
      'text-align': {},
      'text-decoration': {},
      'text-shadow': {},
      'box-shadow': {},
      'border-radius': {},
      transition: {},
      filter: {},
      'font-family': {},
      'font-weight': {},
      'font-style': {},
      weight: {},
      height: {},
      'line-height': {},
      'word-spacing': {},
      'letter-spacing': {},
      'z-index': {},
      width: {},
    },
  },
  text: { ...textFldCssProps },
  textarea: { ...textFldCssProps },
  check: {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: {
        margin: {},
        padding: {},
        background: {},
        'border-color': {},
        border: {},
        'border-width': {},
        'border-radius': {},
        width: {},
        height: {},
        transition: {},
        shadow: {},
      },
    },
    cc: {
      states: ['hover'],
      properties: {
        margin: {},
        padding: {},
        background: {},
        'border-color': {},
        border: {},
        'border-width': {},
        'border-radius': {},
        width: {},
        height: {},
        transition: {},
        shadow: {},
      },
    },
    cl: {
      states: ['hover'],
      properties: {
        margin: {},
        padding: {},
        background: {},
        'border-color': {},
        border: {},
        'border-width': {},
        'border-radius': {},
        width: {},
        height: {},
        transition: {},
        shadow: {},
        'font-size': {},
        'font-weight': {},
        'font-style': {},
      },
    },
    ck: {
      states: ['hover'],
      properties: {
        margin: {},
        padding: {},
        background: {},
        'border-color': {},
        border: {},
        'border-width': {},
        'border-radius': {},
        width: {},
        height: {},
        transition: {},
        shadow: {},
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
        margin: {},
        opacity: {},
        'box-shadow': {},
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
      states: ['hover'],
      properties: {
        background: {},
        border: { border: true, 'border-color': true, 'border-width': true, 'border-radius': true },
        margin: {},
        padding: {},
        opacity: {},
        'box-shadow': {},
        size: {},
        'font-size': {},
        'font-weight': {},
        height: {},
        weight: {},
        color: {},
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
