const app = {
  af_header: {
    pt: 0,
    pb: 0,
    px: 20,
    flx: 'center-between',
  },
  inte_sm: {
    bd: 'var(--b-97)',
    pn: 'relative',
    w: 110,
    h: 130,
    brs: 15,
    fs: '11px',

    '&:before': {
      flx: 'center',
      b: 'var(--b-95-31-18)',
      cr: 'var(--white)',
      pn: 'absolute',
      fs: '100px',
      w: '100%',
      h: '100%',
      zx: 9,
    },
    '&:hover:not(.btcd-inte-dis, .btcd-inte-pro, .pro-filter, .inte-edit)': { '&:before': { ct: '+' } },
  },
  btcd_inte_dis: {
    pe: 'none',
    us: 'none',
    '&>img': { fr: 'grayscale(1) !important' },
    '&::before': {
      flx: 'center',
      bd: 'var(--b-63-18-67)',
      pn: 'absolute',
      zx: 9,
      ct: 'Comming Soon',
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
      bd: 'var(--b-31-44-27)',
      pn: 'absolute',
      ta: 'center',
      fd: 'column',
      h: '100%',
      w: '100%',
      zx: 9,
    },
    '& .txt-pro': {
      bd: 'hsla(var(--blue-h), var(--white-s), var(--white-l), 0.1)',
      p: 8,
      pe: 'all',
      fs: 14,
      fw: 600,
      mt: 5,
      brs: 5,
      zx: 4,
    },
  },
  // for button
  btn: {
    dy: 'inline-flex',
    cr: 'inherit',
    b: 'none',
    px: 10,
    py: 7,
    brs: 8,
    jc: 'center',
    ai: 'center',
    my: 10,
    cr: 'pointer',
    oe: 'none',
    fs: 14,
    td: 'none',
    ws: 'nowrap',
    fw: 600,

    '&:disabled': {
      b: 'var(--white-0-90)',
      bs: 'none',
      oy: 0.7,
      ct: 'not-allowed',
    },
  },

  inte_sm_img: {
    mxw: '110px !important',
    mxh: '110px !important',
    m: 'auto',
    p: 12,
  },

}
export default app
