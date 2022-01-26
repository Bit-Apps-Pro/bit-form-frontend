const imageUploadInputStyle = {
  title: { fs: 12 },

  inputcontainer: { pn: 'relative', h: 30, w: 120, curp: 1 },

  imagebox: {
    w: 25,
    h: 25,
    brs: 7,
    dy: 'inline-block',
    pn: 'absolute',
    tp: 3,
    lt: 3,
  },

  image: {
    h: '100%',
    w: '100%',
  },

  input: {
    mxw: '100%',
    h: 31,
    b: '0 !important',
    brs: '7px !important',
    cr: '#9E9E9E !important',
    pl: '38px !important',
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
    rt: 9,
    tp: '50%',
    tm: 'translateY(-50%)',
  },
}

export default imageUploadInputStyle
