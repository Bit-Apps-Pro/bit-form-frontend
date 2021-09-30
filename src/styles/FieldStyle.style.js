const FieldStyle = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    // p: 10,
    brs: 8,
    fw: 600,
  },

  title: { fs: 14, fw: 600 },

  fieldSection: {
    mx: 10,
    my: 5,
    p: 5,
    fw: 600,
    brs: 8,
    tn: 'background-color 0.2s',
    '& .toggle-icn': { cr: 'var(--white-0-61)' },
    '&:hover': { bc: 'var(--b-23-95)' },
  },

  placeholder: { dy: 'block' },

  input: {
    fs: 14,
    fw: 400,
    w: '96%',
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mx: 'auto',
    dy: 'block',
    my: 10,
    b: 'none !important',
    brs: '8px !important',
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },

  hover_tip: {
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

}

export default FieldStyle
