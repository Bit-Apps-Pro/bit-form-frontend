const backgroundImageControlStyle = {
  container: { w: 250, cr: '#888' },
  innercontainer: { p: 10 },

  title: { fs: 12 },

  urlinput: {
    w: '60%',
    brs: 8,
    b: 0,
    oe: 0,
    bc: 'var(--white-0-95)',
    p: 5,
  },

  select: {
    w: 100,
    bi: 'none',
    ae: '',
    p: 5,
    pb: 8,
    brs: 10,
    bc: 'var(--white-0-95)',
    b: 0,
    oe: 0,

    ':focus': { bs: 'none' },
  },

  icon: { fs: 15, lh: '15px', mr: 5, curp: 1 },

  activeicon: { cr: 'var(--b-50)', fw: 500 },

  positioncontainer: {
    flxp: '',
    bc: 'var(--white-0-95)',
    brs: 8,
    p: '10px 20px',
    w: 150,
  },

  positionitem: {
    'flex-basis': '33.33%',
    mt: 5,

    '& > span': { fs: 4 },

  },

  positiondot: {
    dy: 'inline-block',
    h: 10,
    w: 10,
    lh: 1,
    bc: 'var(--white-0-50)',
    brs: '100%',
    curp: '',
  },

  positionDotActive: { oe: '3px solid #2271b1' },

  filterlist: { mnw: 80 },

  filterbutton: {
    dy: 'block',
    w: '100%',
    ml: 0,
    bc: 'transparent',
    curp: 1,
    brs: 8,
    b: 0,
    py: 5,
    px: 8,
    ta: 'left',

    ':hover': { bc: 'var(--white-0-93)' },
  },

  addbtn: {
    brs: 8,
    b: 0,
    bc: 'var(--white-0-93)',
    px: 10,
    py: 5,
    curp: 1,
  },

  removebtn: {
    p: 5,
    brs: 8,
    bc: 'transparent',
    b: 0,
    curp: 1,

    ':hover': { bc: 'var(--white-0-93)' },
  },
}

export default backgroundImageControlStyle
