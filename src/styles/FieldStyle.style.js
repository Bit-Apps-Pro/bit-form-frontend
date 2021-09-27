const FieldStyle = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    p: 10,
    brs: 8,
    fw: 600,

    '&:hover': { bc: 'var(--b-97)' },
  },
  // bb: { bb: '1px solid var(--white-0-0-14)' },
  mainTitle: { fs: 16, fw: 700 },
  btn: {
    oe: 'none',
    flx: 'center-between',
    b: '1px solid var(--white-0-89)',
    bc: 'var(--white-0-97)',
    px: 4,
    brs: 8,
    cur: 'pointer',
    cr: 'var(--white-0-50)',
  },
  title: { fs: 14, fw: 600 },

  fieldSection: {
    mx: 10,
    py: 10,
    fw: 600,
  },
  placeholder: { dy: 'block' },
  input: {
    w: '99%',
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mr: 10,
    my: 10,
    b: 'none !important',
    brs: 8,
  },
  hover_tip: {
    '&:hover': {
      '& .hover-tip': {
        tm: 'scale(1.1)',
        tn: '0.2s',
      },
    },
  },
  mNun: {
    m: 0,
    bb: '0.5px soild var(--white-0-83)',
  },

}

export default FieldStyle
