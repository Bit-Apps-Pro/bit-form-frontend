const builderHistoryStyle = {
  menu: { mnw: 150 },
  title: {
    flx: 'align-center',
    mt: 0,
    mb: 5,
    pb: 2,
    bb: '1px solid var(--lightgray)',
  },
  secondary: {
    dy: 'block',
    pt: 2,
    pb: 2,
  },
  list: {
    m: 0,
    dy: 'block',
    w: '100%',
  },

  item: {
    mb: 0,
    fs: 12,
  },

  btn: {
    b: 0,
    p: '5px 10px',
    m: 1,
    w: '100%',
    brs: 8,
    flx: 'align-center',
    bc: 'var(--white-100)',
    curp: 1, 
    '&:hover': { bc: 'var(--white-0-93)' },
    '&:focus-visible': {
      oe: 'none',
      bs: '0 0 0 2px var(--b-50) inset',
    },
    '&.active': { fw: 500, bc: 'var(--white-0-93)' },
    '&.unactive': { cr: 'var(--white-0-0-64)' },
  },
}

export default builderHistoryStyle
