const customInputControlStyle = {
  container: {
    flx: 'center',
    w: '100%',
    m: 'auto',
    brs: 8,
    ow: 'hidden',
    h: 30,
    fw: 500,
    b: '1px solid transparent',

    ':hover': {
      b: '1px solid var(--white-0-50)',

      '& input': { bc: 'var(--white-0-89) !important' },
      '& button': { dy: 'initial' },
    },

  },
  visible: { bs: '0 0 0 2px var(--b-50) outset' },
  label: {
    p: '8px 12px',
    w: '50%',
  },
  resizer: {
    cur: 'e-resize',
    us: 'none',
  },

  inputcontainer: {
    dy: 'inline-block',
    h: '100%',
    w: '50%',
    pn: 'relative',
  },

  input: {
    '-moz-appearance': 'textfield',
    b: 'none !important',
    oe: 'none',
    brs: '0px !important',
    m: 0,
    h: '100%',
    w: '100%',
    mnh: 'auto !important',
    bc: 'transparent !important',

    ':focus': {
      bs: 'none !important',
      bc: 'var(--white-0-89) !important',
      dy: 'initial',
    },

    '&::-webkit-inner-spin-button': { '-webkit-appearance': 'none' },
    '&::-webkit-outer-spin-button': { '-webkit-appearance': 'none' },
  },

  button: {
    m: 0,
    p: 2,
    oe: 'none',
    b: 0,
    pn: 'absolute',
    rt: 4,
    fs: 15,
    cur: 'pointer',
    cr: 'var(--white-2-47)',
    lh: 0,
    dy: 'none',
    bc: 'transparent !important',
    tn: 'all .2s',

    ':hover': { cr: 'var(--black-0)', bs: 'none' },
    '&:focus-visible': { bs: '0 0 0 2px var(--b-50) inset' },
  },

  inc: {
    tp: 2,
    tm: 'rotate(180deg)',

    ':hover': { tp: 1 },
  },

  dec: {
    bm: 2,

    ':hover': { bm: 1 },
  },

  range: {
    '-webkit-appearance': 'none',
    oe: 0,
    zx: 1,

    '&::-webkit-slider-runnable-track': {
      w: '100%',
      h: 5,
      zx: 1,
      bc: 'rgba(12,12,12,.3)',
      brs: 5,
    },

    '&::-webkit-slider-thumb': {
      '-webkit-appearance': 'none',
      h: 15,
      w: 15,
      brs: '100%',
      bc: '#4099FF',
      cur: 'pointer',
      b: '3px solid #fff',
      mt: '-5px',
      zx: 99,
      tn: 'transform 300ms cubic-bezier(0.680, -0.550, 0.265, 1.550), opacity 300ms linear',
    },

    '&::-webkit-progress-value': { bc: 'orange' },

    // '&::-webkit-slider-thumb:hover': { oy: 0.8 },

    // '&::-webkit-slider-thumb:active': {
    //   tm: 'scale(1.5)',
    //   bc: '#fff',
    //   oy: 1,
    // },
  },
}

export default customInputControlStyle
