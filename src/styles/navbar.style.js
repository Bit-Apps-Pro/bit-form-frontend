const navbar = {
  btct_bld_nav: {
    flx: 'between',
    bd: 'var(--dp-blue-bg)',
    pn: 'fixed',
    h: 40,
    w: '100%',
    zx: 999,

    '&+div': { mt: 40 },
  },

  btcd_bld_title: { flx: 'align-center' },

  nav_back_icn: {
    w: 38,
    ow: 'hidden',
    py: 4,
    cr: 'var(--white-100)',
    pr: 15,
    pl: 25,
    mx: 5,
    br: 100,
    ':hover': { cr: 'var(--white-100)', bd: 'var(--b-50-22)' },
  },
  bit_icn: {
    flx: 'center',
    w: 40,
    h: '70%',
    p: '5px 7px',
    bl: '0.5px solid var(--b-38-62-40)',
    br: '0.5px solid var(--b-38-62-40)',
    my: 5,
  },

  btcd_bld_title_inp: {
    bd: 'var(--dp-blue-bg)',
    cr: 'var(--white)',
    // p: 6,
    py: 6,
    px: 16,
    fs: 16,
    b: 'none',
    tn: 'background 0.3s !important',
    oe: 'none',
    ml: 12,
    br: 12,

    '&:hover': { bd: 'var(--b-16-35)' },
    '&:focus': {
      bd: 'var(--b-44-87)',
      cr: 'var(--b-54-12)',
    },
  },
  btcd_bld_lnk: {
    mt: 2,
    ml: '-15%',
  },

  btcd_bld_btn: { flx: 'center' },
  cls_btn: {
    cr: 'var(--white)',
    se: 30,
    mr: 15,
    flx: 'center',
    p: 0,
    ta: 'center',
    tn: 'color 0.5s !important',
    '&:hover': { cr: 'var(--red-100-61) !important' },
  },

  btn: {
    fw: 500,
    bd: 'var(--g-45)',
    oe: 'none',
    cr: 'var(--b-63-18-67)',
    br: '10px !important',
    b: '1px solid var(--g-89-7)',
    h: 28,
    td: 'none',
    my: 5,
    mx: 10,
    py: 7,
    px: 15,
    pn: 'relative',
    fs: 14,
    cur: 'pointer',
    flx: 'align-center',
    w: 'auto',
    '&:disabled': { bd: 'var(--b-100-50-5) !important' },
  },
  visDisable: { bd: 'var(--b-50-22) !important', cr: 'var(--b-37-69) !important', b: 'none !important', fw: 600 },
}

export default navbar
