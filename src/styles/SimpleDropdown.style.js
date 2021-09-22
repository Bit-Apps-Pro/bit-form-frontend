const simppleDpdStyle = {
  dpd_wrp: {
    dy: 'inline-block',
    pn: 'relative',
  },
  dpd: {
    ow: 'hidden',
    p: 3,
    brs: 10,
    pn: 'absolute',
    w: '100%',
    b: '1px solid var(--white-0-0-32)',
    tn: 'box-shadow 0.2s',
    tdy: '150ms',
    ':focus-visible': {
      bs: '0 0 0 1.5px var(--b-50) inset',
      oe: 'none',
    },
  },
  dpd_open: {
    tdy: '0s',
    bs: '#eaeaea 0px 3px 5px 0px, #d2d2d2 0px 5px 20px -9px;',
    bd: 'white',
  },
  selected_icn: { mr: 7 },
  selected: {
    flx: 'between',
    cur: 'pointer',
    w: '96%',
    p: '0 5px',
    fs: 13,
  },
  option_wrp: { ow: 'hidden', tn: 'height 0.2s' },
  options: {
    p: 0,
    m: 0,
  },
  divider: {
    bt: '0.5px solid var(--white-0-86)',
    mb: 2,
  },
  option: {
    fs: 13,
    m: 0,
    flx: 'align-center',
    transition: 'background 0.3s',
    brs: 7,
    ':hover': { background: 'var(--white-0-89)' },
  },
  opt_btn: {
    brs: 7,
    fs: 13,
    cur: 'pointer',
    ta: 'left',
    b: 'none',
    p: 3,
    w: '100%',
    h: '100%',
    bd: 'none',
    ':focus-visible': {
      bs: '0 0 0 1.5px var(--b-50) inset',
      oe: 'none',
    },
  },
  opt_icn: {
    mr: 7,
    h: 20,
    w: 20,
  },
  down_btn: {
    w: 25,
    h: 25,
    brs: '50%',
    cur: 'pointer',
    tn: 'transform 0.2s',
    bd: 'none',
    b: 'none',
    ':hover': { bd: 'var(--white-0-89)' },
    ':focus-visible': {
      bs: '0 0 0 1.5px var(--b-50) inset',
      oe: 'none',
    },
  },

}
export default simppleDpdStyle
