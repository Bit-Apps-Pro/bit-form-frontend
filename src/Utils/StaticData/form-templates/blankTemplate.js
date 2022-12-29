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
    lg: [{ h: 58, i: 'fld_key-1', w: 60, x: 0, y: 0 }],
    md: [],
    sm: [],
  },
  additionalSettings: {
    enabled: {
      empty_submission: true,
    },
    settings: {
      empty_submission: {
        message: 'Empty form cannot be submitted.',
      },
    },
  },
}
