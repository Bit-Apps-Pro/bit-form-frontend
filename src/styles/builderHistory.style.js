const builderHistoryStyle = {
  menu: {
    mnw: 150,
    mxw: 200,
  },
  title: {
    flx: 'align-center',
    mt: 0,
    mb: 5,
    pb: 2,
    bb: '1px solid var(--lightgray)',
    fs: 14,
    fw: 600,
  },
  secondary: {
    dy: 'block',
    pt: 2,
    pb: 2,
  },
  list: {
    w: 200,
    mxh: 300,
    m: 0,
    mb: 5,
    dy: 'block',
    owy: 'auto',
    ff: 'Roboto',
    '&> div': { owx: 'hidden !important' },
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
    // flx: 'align-center',
    ta: 'start',
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
  subtitle: {
    dy: 'block',
    ws: 'nowrap',
    ow: 'hidden',
    to: 'ellipsis',
  },
  fldkey: {
    fs: 10,
    cr: 'var(--white-0-50)',
  },
}

export default builderHistoryStyle
