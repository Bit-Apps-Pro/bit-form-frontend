const OptionToolBarStyle = {
  optionToolBar: {
    flx: 'between',
    w: '100%',
    h: 40,
    bg: 'var(--white-100)',
    brb: '0.5px solid var(--white-0-89)',
    bs: '-1px 1px 4px var(--white-0-90)',
  },
  form_section: {
    flx: 'center-between',
    w: '75%',
  },
  field_btn: {
    flx: 'align-center',
    ml: 20,
    my: 4,
    px: 10,
    py: 4,
    fs: 12,
    fw: '600',
    t: 'background 0.5s ease',
    '&:hover': {
      bg: 'var(--b-79-96)',
      br: 8,
      clr: 'var(--b-50)',
    },
    // '&.active': {
    //   bg: 'var(--b-79-96)',
    //   br: 8,
    //   clr: 'var(--b-50)',
    // },
  },
  txt: { ml: 3 },
  option_section: { flx: 'between' },
  devices: {
    flx: 'center',
    p: 0,
    // brr: '0.5px solid var(--white-0-83)',
  },
  device_btn: {
    b: 'none',
    ol: 'none',
    p: 0,
    bg: 'none',
    br: 8,
    w: 38,
    h: 33,
    mr: 2,
    pos: 'relative',
    '&:hover': {
      // bg: 'var(--b-79-96)',
      clr: 'var(--white-2-47)',
    },
    '&.acitve::after': {
      pos: 'absolute',
      c: '""',
      w: 4,
      h: 4,
      bg: 'var(--b-63-18-67)',
      yb: 2,
      xl: '45%',
      br: '50%',
    },
  },
  border_right: {
    flx: 'center',
    w: '0.5px',
    h: 30,
    bg: 'var(--white-0-61)',

  },
  option_right: { flx: 'center' },
  right_btn: {
    b: 'none',
    ol: 'none',
    bg: 'none',
    w: 38,
    h: 33,
    mr: 2,
    '&:hover': {
      clr: 'var(--white-2-47)',
    },
  },
}

export default OptionToolBarStyle
