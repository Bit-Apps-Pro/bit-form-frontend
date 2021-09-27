const colorPickerInputStyle = {
  title: { fs: 12 },

  inputcontainer: { pn: 'relative' },

  colorbox: {
    w: 25,
    h: 25,
    brs: 7,
    dy: 'inline-block',
    bc: 'red',
    pn: 'absolute',
    tp: 3,
    lt: 3,
  },

  input: {
    w: 120,
    h: 31,
    b: '0 !important',
    brs: '7px !important',
    cr: '#9E9E9E !important',
    pl: '38px !important',
    pr: '20px !important',
    bc: 'var(--white-0-95) !important',
    oe: 'none',
    fs: 12,

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

export default colorPickerInputStyle
