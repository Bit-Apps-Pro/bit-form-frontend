const ut = {
  'g-c': {
    display: 'grid',
    placeContent: 'center',
  },
  flxc: { flx: 'align-center' },
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
}
export default ut
