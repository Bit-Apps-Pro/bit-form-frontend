const FieldStyle = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    // p: 10,
    brs: 8,
    fw: 600,
  },

  logoLabel: {
    flx: 'center-between',
    ml: '0px !important',
    my: 5,
    brs: 8,
    fw: '600 !important',
  },

  sec: {
    my: 5,
    mx: 15,
  },

  title: { fs: 14, fw: 500, mx: 10 },

  fieldSection: {
    mx: 10,
    my: 5,
    p: 5,
    fw: 600,
    brs: 8,
    tn: 'background-color 0.2s',
    '& .toggle-icn': { cr: 'var(--white-0-61)' },
    ':focus-visible': { bs: '0 0 0 2px blue' },
    ':hover': { bc: 'hsl(210deg 100% 98%)' },
  },

  placeholder: { dy: 'block', m: '0 5px' },

  input: {
    fs: 14,
    fw: 500,
    w: '100%',
    h: 35,
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    mt: 10,
    mb: 3,
    bs: 'none !important',
    brs: '8px !important',
    tn: 'box-shadow .3s',
    b: '1px solid #e6e6e6 !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 1px var(--b-50) !important', bcr: 'var(--b-50)!important' },
  },
  multiselectInput: {
    fs: 14,
    fw: 500,
    mt: 10,
    '& .msl': {
      h: '35px!important',
      '& .msl-input': { p: 1 },
    },
    '&.msl-vars': { w: '99% !important' },
    '&.msl-wrp > .msl-options': {
      pn: 'relative !important',
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
    },
    '&.msl-wrp > .msl-active-up': {
      brs: 8,
      bblr: '0 !important',
      bbrr: '0 !important',
    },
    b: '1px solid #e6e6e6 !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 1px var(--b-50) !important', bcr: 'var(--b-50)!important' },
  },

  hover_tip: {
    '& .hover-tip': {
      brs: 10,
      ':focus-visible': {
        oy: '1 !important',
        focusShadow: 1,
      },
    },
    '&:hover': {
      '& .hover-tip': {
        oy: 1,
        tn: '0.2s',
      },
    },
  },

  divider: {
    my: 0,
    mx: 10,
    bb: '0.5px soild var(--white-0-83)',
  },

  fieldNumber: {
    flx: 'center-between',
    py: 10,
  },

  inputNumber: {
    w: 80,
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    b: 'none !important',
  },
  sizeUnit: {
    brs: 8,
    mt: 5,
  },
  flxCenter: {
    flx: 'align-center',
    '& .hovertip': {
      oy: 0,
      brs: 10,
      ':focus-visible': {
        oy: '1 !important',
        focusShadow: 1,
      },
    },
    '&:hover': {
      '& .hovertip': {
        oy: 1,
        tn: '0.2s',
      },
    },
  },
  singleOption: { pr: '36px !important' },
  selectBox: {
    fs: 14,
    fw: 500,
    w: '96%',
    bd: 'var(--b-79-96) !important',

    oe: 'none !important',
    ae: 'auto !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    p: '0 !important',
    mt: 10,
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },
  labelTip: {
    '& div[data-tipbtn]': {
      tm: 'scale(0)',
      tn: 'transform .2s',
    },
    ':hover': { '& div[data-tipbtn]': { tm: 'scale(1)' } },
  },
}

export default FieldStyle
