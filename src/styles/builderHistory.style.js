const builderHistoryStyle = {
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
    cur: 'pointer',
    '&:hover': { bc: 'var(--white-0-93)' },
    '&.active': { fw: 500, bc: 'var(--white-0-93)' },
    '&.unactive': { cr: 'var(--white-0-0-64)' },
  },
}

export default builderHistoryStyle
