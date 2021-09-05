const app = {
  af_header: {
    pt: 0,
    pb: 0,
    px: 20,
    flx: 'center-between',
  },
  inte_sm: {
    bg: 'var(--b-97)',
    pos: 'relative',
    w: 110,
    h: 130,
    br: 15,
    fs: '11px',

    '&:before': {
      flx: 'center',
      b: 'var(--b-95-31-18)',
      clr: 'var(--white)',
      pos: 'absolute',
      fs: '100px',
      w: '100%',
      h: '100%',
      z: 9,
    },
    '&:hover:not(.btcd-inte-dis, .btcd-inte-pro, .pro-filter, .inte-edit)': { '&:before': { c: '+' } },
  },
  btcd_inte_dis: {
    pe: 'none',
    us: 'none',
    '&>img': { fl: 'grayscale(1) !important' },
    '&::before': {
      flx: 'center',
      bg: 'var(--b-63-18-67)',
      pos: 'absolute',
      z: 9,
      c: 'Comming Soon',
      fs: 12,
      fw: 500,
      ts: '0px 0px 4px va(--black-0)',
      w: '100%',
      h: '100%',
    },
  },
  btcd_inte_pro: {
    pe: 'none',
    us: 'none',

    '& .pro-filter': {
      flx: 'center',
      bg: 'var(--b-31-44-27)',
      pos: 'absolute',
      ta: 'center',
      fd: 'column',
      h: '100%',
      w: '100%',
      z: 9,
    },
    '& .txt-pro': {
      bg: 'hsla(var(--blue-h), var(--white-s), var(--white-l), 0.1)',
      p: 8,
      pe: 'all',
      fs: 14,
      fw: 600,
      mt: 5,
      br: 5,
      z: 4,
    },
  },
  // for button
  btn: {
    d: 'inline-flex',
    clr: 'inherit',
    b: 'none',
    px: 10,
    py: 7,
    br: 8,
    jC: 'center',
    aI: 'center',
    my: 10,
    cr: 'pointer',
    ol: 'none',
    fs: 14,
    td: 'none',
    ws: 'nowrap',
    fw: 600,

    '&:disabled': {
      b: 'var(--white-0-90)',
      bs: 'none',
      o: 0.7,
      c: 'not-allowed',
    },
  },

  inte_sm_img: {
    mxW: '110px !important',
    mxH: '110px !important',
    m: 'auto',
    p: 12,
  },

}
export default app
