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
  childPmargin0: { '& p': { m: 0 } },
}

export default sc
