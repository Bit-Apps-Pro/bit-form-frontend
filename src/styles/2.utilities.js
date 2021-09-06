const ut = {
  'g-c': {
    display: 'grid',
    placeContent: 'center',
  },
  icn_hover: {
    pos: 'relative',
    '::before': {
      content: '""',
      z: -1,
      pos: 'absolute',
      size: 0,
      top: '50%',
      left: '50%',
      brs: '50%',
      tf: 'translate(-50%,-50%)',
      t: '400ms border, opacity 300ms',
      o: 0,
      b: '0px solid var(--white-0-81-32)',
    },
    ':hover::before': { b: '30px solid var(--white-0-81-32)', o: 1 },
  },
}
export default ut
