const context = {
  menu: {
    dy: 'flex',
    fd: 'column',
    brs: 10,
  },

  list: {
    m: 0,
    dy: 'block',
    w: '100%',
  },

  item: {
    pn: 'relative',
    mb: 0,
    fw: 500,
  },

  btn: {
    b: 0,
    p: '8px 8px',
    pr: 36,
    w: '100%',
    brs: 8,
    flx: 'align-center',
    pn: 'relative',
    bc: 'var(--white-100)',
    cur: 'pointer',
    '&:hover': { bc: 'var(--white-0-93)' },
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

  delete: { '&:hover': { cr: 'var(--red-100-49)' } },
}

export default context
