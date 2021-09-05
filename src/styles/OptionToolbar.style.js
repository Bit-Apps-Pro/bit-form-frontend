const OptionToolBarStyle = {
  optionToolBar: {
    flx: 'center-between',
    w: '100%',
    h: 40,
    bg: 'var(--white-100)',
    brb: '0.5px solid var(--white-0-89)',
    bs: '-1px 1px 4px var(--white-0-90)',
  },
  form_section: {
    flx: 'center-between',
    w: '80%',
  },
  field_btn: {
    flx: 'align-center',
    ml: 20,
    my: 4,
    px: 10,
    py: 4,
    fs: 12,
    fw: '600',
    cr: 'pointer',
    br: 12,
    t: 'background 0.5s ease',
    '&:hover': { bg: 'var(--white-0-81-32)' },
    '&.active': {
      bg: 'var(--b-79-96)',
      clr: 'var(--b-50)',
    },
  },
  txt: { ml: 3 },
  option_section: { flx: 'center-between' },

  icn_btn: {
    b: 'none',
    ol: 'none',
    p: 0,
    bg: 'none',
    br: 8,
    w: 38,
    h: 33,
    flx: 'center',
    mr: 2,
    z: 1,
    pos: 'relative',
    of: 'hidden',
    cr: 'pointer',
    '&.acitve::after': {
      pos: 'absolute',
      c: '""',
      size: 4,
      bg: 'var(--b-63-18-67)',
      yb: 2,
      xl: '45%',
      br: '50%',
    },
    ':focus-visible': { bs: '0 0 0 2px var(--b-50) inset' },
    '&.active': {
      bg: 'var(--b-79-96)',
      clr: 'var(--b-50)',
    },
  },
  border_right: {
    flx: 'center',
    w: '0.5px',
    h: 25,
    mx: 1,
    bg: 'var(--b-20-93)',

  },
  option_right: { flx: 'center' },
}

export default OptionToolBarStyle
