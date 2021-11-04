const FieldStyle = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    // p: 10,
    brs: 8,
    fw: 600,
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

  placeholder: { dy: 'block' },

  input: {
    fs: 14,
    fw: 500,
    w: '96%',
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    mt: 10,
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
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
      tn: 'transform .2s'
    },
    ':hover': {
      '& div[data-tipbtn]': {
        tm: 'scale(1)',
      }
    }
  }
}

export default FieldStyle
