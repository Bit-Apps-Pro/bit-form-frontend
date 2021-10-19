const ErrorMessages = {
  wrapper: {
    // bc: 'var(--b-50-95)',
    p: '5px 0px 10px 7px',
    brs: 8,
    mt: 10,
  },
  flx: { flx: 'align-center' },
  flxBetween: {
    flx: 'center-between',
    my: 1,
    mr: 2,
  },
  tipBody: {
    lh: '1.1',
    fs: '12.5px',
    fw: 100,
    ff: '"Roboto", sans-serif',
  },
  btn: {
    cur: 'pointer',
    b: 'none',
    oe: 'none',
    bd: 'none',
  },
  errMsgBox: {
    w: '96%',
    brs: 8,
    mx: 'auto',
    bd: 'var(--b-79-96)',
    py: 15,
    px: 10,
    fs: 13,
    '& p': { m: '0!important' },
  },
  checked: {
    '& .hovertip': { oy: 0 },
    '&:hover': { '& .hovertip': { oy: 1, tn: '0.2s' } },
  },
}

export default ErrorMessages
