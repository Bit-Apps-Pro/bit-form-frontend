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
    m: 'auto',
    oe: 'none',
    p: 0,
    h: 6,
    bc: '#dedede',
    bi: '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #4099FF), color-stop(100%, #4099FF))',
    'background-size': '50% 100%',
    'background-repeat': 'no-repeat',
    brs: 10,
    cur: 'pointer',
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
      h: 15,
      w: 15,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      bs: '0 0 1px 0px rgba(0,0,0,0.1)',
      '-webkit-appearance': 'none',
    },

    '::-moz-range-thumb': {
      h: 15,
      w: 15,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      bs: '0 0 1px 0px rgba(0,0,0,0.1)',
    },

    '::-ms-thumb': {
      h: 15,
      w: 15,
      bc: '#4099FF',
      b: '3px solid #FFFFFF',
      brs: '100%',
      bs: '0 0 1px 0px rgba(0,0,0,0.1)',
    },

    // ':focus': { oe: 'none' },

    // '::-webkit-slider-thumb': {
    //   '-webkit-appearance': 'none',
    //   w: 15,
    //   h: 15,
    //   brs: '100%',
    //   bc: '#4099FF',
    //   b: '3px solid #FFFFFF',
    //   bs: '0 1px 2px #CDC2C2',
    //   mt: 'calc(6 * 0.5 - max(15px * 0.5, 3px))',

    //   ':hover': { bc: '#0061C3' },
    // },

    // '::-webkit-slider-runnable-track': {
    //   h: 6,
    //   brs: 5,
    //   bc: 'linear-gradient(#4099FF,#4099FF) 0/var(--sx) 100% no-repeat, #C9C9C9',
    //   b: 'none',
    //   bs: 'none',
    // },

    // /* mozilla */
    // '::-moz-range-thumb': {
    //   w: 'max(calc(15px - 3px - 3px),0px)',
    //   h: 'max(calc(15px - 3px - 3px),0px)',
    //   brs: '100%',
    //   bc: '#4099FF',
    //   b: '3px solid #FFFFFF',
    //   bs: '0 1px 2px #CDC2C2',
    // },

    // '::-moz-range-track': {
    //   h: 6,
    //   brs: 5,
    //   bc: 'linear-gradient(#4099FF,#4099FF) 0/var(--sx) 100% no-repeat, #C9C9C9',
    //   b: 'none',
    //   bs: 'none',

    //   ':hover': { bc: '#0061C3' },
    // },

    // '::-ms-fill-upper': {
    //   bc: 'transparent',
    //   bcr: 'transparent',
    // },

    // '::-ms-fill-lower': {
    //   h: 6,
    //   brs: '5px 0 0 5px',
    //   mr: 0,
    //   bc: '#4099FF',
    //   b: 'none',
    // },

    // '::-ms-thumb': {
    //   w: 15,
    //   h: 15,
    //   brs: '100%',
    //   bc: '#4099FF',
    //   b: '3px solid #FFFFFF',
    //   bs: '0 1px 2px #CDC2C2',
    //   mt: 0,
    //   bsz: 'border-box',

    //   ':hover': { bc: '#0061C3' },
    // },

    // '::-ms-track': {
    //   h: 6,
    //   brs: 5,
    //   bc: '#C9C9C9',
    //   b: 'none',
    //   bs: 'none',
    //   bsz: 'border-box',
    // },

    /* progress support */
    //     input[type = range].styled - slider.slider - progress {
    //       --range: calc(var(--max) - var(--min)),
    // --ratio: calc((var(--value) - var(--min)) / var(--range)),
    // --sx: calc(0.5 * 15px + var(--ratio) * (100 % - 15px)),
    //     }

    /* ms */

  },

}

export default customInputControlStyle
