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
  propsElemContainer: { '&:hover .delete-btn': { tm: 'scale(1)' } },
  propsDelBtn: {
    se: 20,
    flx: 'center',
    b: 'none',
    p: 0,
    mr: 1,
    tn: '.2s all',
    curp: 1,
    brs: '50%',
    tm: 'scale(0)',
    bd: 'none',
    cr: 'var(--red-100-61)',
    pn: 'absolute',
    lt: -15,
    ':hover': { bd: '#ffd0d0', cr: '#460000' },
  },
}

export default sc
