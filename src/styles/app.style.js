const app = {
  af_header: {
    pt: 0,
    pb: 0,
    px: 20,
    flx: 'center-between',
  },
  inte_sm: {
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
    px: 15,
    py: 7,
    brs: 8,
    jc: 'center',
    ai: 'center',
    my: 10,
    cur: 'pointer',
    oe: 'none',
    fs: 14,
    td: 'none',
    ws: 'nowrap',
    fw: 600,
    tn: 'box-shadow .2s',
    ':focus-visible': { bs: '0 0 0 2px white, 0 0 0 4px blue' },
    '&:disabled': {
      b: 'var(--white-0-90)',
      bs: 'none',
      oy: 0.7,
      ct: 'not-allowed',
    },
  },

  btn_blue_otln: {
    bd: 'transparent',
    cr: 'var(--b-50) !important',
    b: '1px solid var(--b-50)',
    tn: 'background 0.2s !important',
    ':hover': {
      bd: 'var(--b-50)',
      cr: 'var(--white) !important',
    },
  },



  blueGrd: {
    bd: 'linear-gradient(145deg, var(--b-50), hsl(var(--blue-h), var(--blue-s), calc(var(--blue-l) + 10%))) !important',
    cr: 'var(--white) !important',
    tn: 'background .3s',
    ':hover': {
      bd: `linear-gradient(145deg, 
      hsl(var(--blue-h), var(--blue-s), calc(var(--blue-l) - 5%)), 
      hsl(var(--blue-h), var(--blue-s), calc(var(--blue-l) - 10%))) !important`,
    },
    ':active': {
      bd: `linear-gradient(145deg, 
      hsl(var(--blue-h), var(--blue-s), calc(var(--blue-l) - 8%)), 
      hsl(var(--blue-h), var(--blue-s), calc(var(--blue-l) - 13%))) !important`,
    },
  },
}
export default app
