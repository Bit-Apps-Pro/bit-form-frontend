const context = {
  menu: {
    dy: 'flex',
    fd: 'column',
    brs: 10,
    pn: 'relative',
    bc: 'var(--white-100)',
    zx: 99,
  },

  list: {
    m: 0,
    dy: 'block',
    w: '100%',
  },

  item: {
    pn: 'relative',
    mb: 0,
    w: '100%',
  },

  btn: {
    b: 0,
    p: '8px 8px',
    pr: 36,
    w: '100%',
    brs: 8,
    fw: 500,
    flx: 'align-center',
    pn: 'relative',
    bc: 'var(--white-100)',
    curp: 1,
    '&:hover': {
      bc: 'var(--white-0-93)',
      '& svg': { fr: 'drop-shadow(1px 1px 0.5px #b3b3b3)' },
    },
    '&:focus-visible': {
      oe: 'none',
      bs: '0 0 0 2px var(--b-50) inset',
    },
    '& svg': {
      'flex-shrink': 0,
      w: 20,
      h: 20,
      mr: 10,
      stroke: 'var(--black-0)',
      '&:nth-of-type(2)': {
        mr: 0,
        pn: 'absolute',
        rt: 8,
      },
    },
  },
  btnColor: { cr: 'var(--b-50)' },

  delete: { '&:hover': { cr: 'var(--red-100-49)' } },
}

export default context
