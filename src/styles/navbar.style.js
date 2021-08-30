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
    p: 8,
    clr: 'var(--white-100)',
    px: 30,
  },
  bit_icn: {
    flx: 'center',
    w: 40,
    h: '70%',
    p: '5px 7px',
    brl: '0.5px solid var(--white-0-61)',
    brr: '0.5px solid var(--white-0-61)',
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
    br: 16,

    '&:hover': { bg: 'var(--b-0-100-1)' },
    '&:focus': {
      bg: 'var(--white)',
      clr: 'var(--b-54-12)',
    },

  },
}

export default navbar
