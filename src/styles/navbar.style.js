const navbar = {
  btct_bld_nav: {
    flx: 'between',
    bg: 'var(--dp-blue-bg)',
    pos: 'fixed',
    h: 40,
    w: '100%',
    z: 999,

    '&+div': { mt: 40 },
  },

  btcd_bld_title: { flx: 'align-center' },

  nav_back_icn: {
    w: 38,
    of: 'hidden',
    py: 4,
    clr: 'var(--white-100)',
    pr: 15,
    pl: 25,
    mx: 5,
    br: 100,
    ':hover': { clr: 'var(--white-100)', bg: 'var(--b-50-22)' },
  },
  bit_icn: {
    flx: 'center',
    w: 40,
    h: '70%',
    p: '5px 7px',
    brl: '0.5px solid var(--b-38-62-40)',
    brr: '0.5px solid var(--b-38-62-40)',
    my: 5,
  },

  btcd_bld_title_inp: {
    bg: 'var(--dp-blue-bg)',
    clr: 'var(--white)',
    // p: 6,
    py: 6,
    px: 16,
    fs: 16,
    b: 'none',
    t: 'background 0.3s !important',
    ol: 'none',
    ml: 12,
    br: 12,

    '&:hover': { bg: 'var(--b-16-35)' },
    '&:focus': {
      bg: 'var(--b-44-87)',
      clr: 'var(--b-54-12)',
    },
  },
  btcd_bld_lnk: {
    mt: 2,
    ml: '-15%',
  },

  btcd_bld_btn: { flx: 'center' },
  cls_btn: {
    clr: 'var(--white)',
    size: 30,
    mr: 15,
    flx: 'center',
    p: 0,
    ta: 'center',
    t: 'color 0.5s !important',
    '&:hover': { clr: 'var(--red-100-61) !important' },
  },

  btn: {
    fw: 500,
    bg: 'var(--g-45)',
    ol: 'none',
    clr: 'var(--b-53-13)',
    br: '10px !important',
    b: '1px solid var(--g-89-7)',
    h: 28,
    td: 'none',
    my: 5,
    mx: 10,
    py: 7,
    px: 15,
    pos: 'relative',
    fs: 14,
    cr: 'pointer',
    flx: 'align-center',
    w: 'auto',
    '&:disabled': { bg: 'var(--b-100-50-5) !important' },
  },
  visDisable: { bg: 'var(--b-50-22) !important', clr: 'var(--b-37-69) !important', b: 'none !important', fw: 600 },
}

export default navbar
