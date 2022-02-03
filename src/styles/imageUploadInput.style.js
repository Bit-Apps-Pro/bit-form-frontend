const imageUploadInputStyle = {
  title: { fs: 12 },

  inputcontainer: {
    brs: 10,
    flx: 'align-center',
    h: 30,
    w: 150,
    p: 2,
    bc: 'var(--white-0-95)',
    cr: 'var(--white-0-50)',
    b: '1px solid transparent',
    ':focus-within': { focusShadow: 1 },
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
    pn: 'relative',
    curp: 1,
  },

  imagebox: {
    w: 26,
    h: 26,
    dy: 'inline-block',
    pn: 'absolute',
    tp: 1,
    lt: 1,
  },

  image: {
    h: '100%',
    w: '100%',
    brs: 10,
  },

  input: {
    mxw: '100%',
    h: 28,
    b: '0 !important',
    brs: '7px !important',
    cr: '#9E9E9E !important',
    pl: '28px !important',
    pr: '20px !important',
    bc: 'var(--white-0-95) !important',
    oe: 'none',
    fs: 12,
    curp: 1,

    ':focus': { bs: 'none !important' },
  },

  button: {
    p: 0,
    m: 0,
    b: 0,
    bc: 'transparent',
    cur: 'pointer',
    pn: 'absolute',
    rt: 6,
    tp: '50%',
    tm: 'translateY(-50%)',
  },
}

export default imageUploadInputStyle
