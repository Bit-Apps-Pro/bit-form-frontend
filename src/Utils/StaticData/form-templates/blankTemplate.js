export default {
  name: 'Untitled Form',
  theme: 'bitformDefault',
  fields: {
    'fld_key-1': {
      typ: 'button',
      btnSiz: 'md',
      btnTyp: 'submit',
      txt: 'Submit',
      icn: { pos: '', url: '' },
      valid: {},
      customClasses: {},
      customAttributes: {},
    },
  },
  layouts: {
    lg: [{ h: 40, i: 'fld_key-1', w: 60, x: 0, y: 0 }],
    md: [{ h: 40, i: 'fld_key-1', w: 40, x: 0, y: 0 }],
    sm: [{ h: 40, i: 'fld_key-1', w: 20, x: 0, y: 0 }],
  },
}
