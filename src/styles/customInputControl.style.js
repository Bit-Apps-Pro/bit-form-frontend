const customInputControlStyle = {
  container: {
    flx: 'center',
    w: '100%',
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
    curp: 1,
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
    m: 'auto',
    oe: 'none',
    p: 0,
    h: 6,
    my: 12,
    bc: '#dedede',
    bi: 'linear-gradient(90deg, #4099FF 0%, #4099FF 100%)',
    'background-size': '50% 100%',
    'background-repeat': 'no-repeat',
    brs: 10,
    curp: 1,
    '-webkit-appearance': 'none',

    '::-webkit-slider-runnable-track': {
      bs: 'none',
      b: 'none',
      bd: 'transparent',
      '-webkit-appearance': 'none',
    },

    '::-moz-range-track': {
      bs: 'none',
      b: 'none',
      bd: 'transparent',
    },

    '::-webkit-slider-thumb': {
      se: 14,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      '-webkit-appearance': 'none',
      bs: '0 1px 3px 0px rgba(0,0,0,0.3)',
      tn: 'transform 0.2s cubic-bezier(0.42, 0, 0.68, 3.27) 0s',
    },
    '::-webkit-slider-thumb:active': { tm: 'scale(0.85)', tn: 'transform .2s ease' },

    '::-moz-range-thumb:active': { tm: 'scale(0.85)', tn: 'transform .2s ease' },
    '::-moz-range-thumb': {
      se: 14,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      bs: '0 1px 3px 0px rgba(0,0,0,0.3)',
      tn: 'transform 0.2s cubic-bezier(0.42, 0, 0.68, 3.27) 0s',
    },

    '::-ms-thumb:active': { tm: 'scale(0.85)',tn: 'transform .2s ease'  },
    '::-ms-thumb': {
      se: 14,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      bs: '0 1px 3px 0px rgba(0,0,0,0.3)',
      tn: 'transform 0.2s cubic-bezier(0.42, 0, 0.68, 3.27) 0s',
    },
  },
}

export default customInputControlStyle
