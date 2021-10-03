const style = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    brs: 8,
    fw: 600,
  },
  flxColumn: {
    fd: 'column',
    jc: 'start !important',
    ai: 'self-start',
  },
  title: {
    fs: 14,
    fw: 600,
  },
  mainTitle: {
    fs: 16,
    fw: 700,
  },
  divider: {
    my: 0,
    mx: 10,
    bb: '0.5px soild var(--white-0-83)',
  },
  subtitle: { fs: 12, fw: 500 },
  btn: {
    oe: 'none',
    flx: 'center-between',
    tn: 'background 0.2s',
    // b: '1px solid var(--white-0-89)',
    // bc: 'var(--white-0-97)',
    bc: 'none',
    px: 4,
    brs: 8,
    cur: 'pointer',
    cr: 'var(--white-0-50)',
    bd: 'none !important',
    b: 'none',
    pl: '0 !important',
    ml: '-5px',
    mb: 5,
    fw: 400,
    '&:hover': { bc: 'var(--white-0-97) !important' },
  },
}
export default style