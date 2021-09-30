const ut = {
  'g-c': {
    display: 'grid',
    placeContent: 'center',
  },

  proBadge: {
    bd: ' var(--red-100-50)',
    cr: 'var(--white)',
    p: 6,
    brs: '50%',
    fs: 12,
    fw: 700,
  },
  tipBody: {
    lh: '1.1',
    fs: '12.5px',
    fw: 100,
    ff: '"Roboto", sans-serif',
  },
  icn_hover: {
    pn: 'relative',
    '::before': {
      ct: '""',
      zx: -1,
      pn: 'absolute',
      size: 0,
      tp: '50%',
      lt: '50%',
      brs: '50%',
      tm: 'translate(-50%,-50%)',
      tn: '400ms border, opacity 300ms',
      oy: 0,
      b: '0px solid var(--white-0-81-32)',
    },
    ':hover::before': { b: '30px solid var(--white-0-81-32)', oy: 1 },
    ':disabled::before': { dy: 'none' },
  },
  fontBody: { fontFamily: '"Roboto", sans-serif' },
  fw500: { fw: 500 },
  flxb: { flx: 'between' },
  flxcb: { flx: 'center-between' },
  flxc: { flx: 'align-center' },
  ma: { m: 'auto' },
  m0: { m: '0 !important' },
  mb0: { mb: 0 },
  mb1: { mb: 5 },
  mb2: { mb: 10 },
  mb4: { mb: 20 },
  mb50: { mb: 250 },
  mt0: { mt: '0!important' },
  mt1: { mt: 5 },
  mt2: { mt: '10px!important' },
  mt3: { mt: 15 },
  mt4: { mt: 20 },
  mt5: { mt: 25 },
  mt6: { mt: 30 },
  mr1: { mr: 5 },
  mr2: { mr: 10 },
  mr4: { mr: 20 },
  mr30: { mr: 30 },
  mr8: { mr: 40 },
  pr8: { pr: 40 },
  ml0: { ml: '0!important' },
  ml1: { ml: 5 },
  ml2: { ml: 10 },
  ml4: { ml: '20px!important' },
  ml5: { ml: '25px!important' },
  ml6: { ml: '30px!important' },
  p1: { p: 5 },
  p2: { p: 10 },
  p3: { p: 15 },
  p4: { p: 20 },
  pr4: { pr: '20px !important' },
  pl6: { pl: 30 },
  py1: { py: 5 },
}
export default ut
