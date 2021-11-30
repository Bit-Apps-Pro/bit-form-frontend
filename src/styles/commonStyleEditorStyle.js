const sc = {
  select: {
    bc: 'var(--white-0-95) !important',
    b: 'none',
    brs: '10px !important',
    fw: 500,
    w: 110,
    cr: 'var(--b-54-12) !important',
    ':hover': {
      bs: '0 0 0 1px var(--white-0-83) !important',
      cr: 'var(--b-54-12)',
    },
    ':focus': { focusShadow: 1 },
  },
  resetBtn: {
    w: 23,
    h: 24,
    flx: 'center',
    p: 5,
    brs: 20,
    b: 'none',
    bd: 'none',
    curp: 1,
    cr: 'var(--white-0-0-29)',
    mr: 3,
    ':hover': { bd: 'var(--white-0-95)', cr: 'var(--white-0-29)' },
  },
}

export default sc
