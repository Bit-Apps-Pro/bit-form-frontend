const draggableModalStyle = {
  container: {
    bc: 'var(--white-100)',
    pn: 'absolute',
    tp: 10,
    zx: 9999,
    pt: 0,
    pb: 10,
    brs: 10,
    b: '1px solid var(--white-0-83)',
    bs: '0 6px 6px 0 #00000012, 0 3px 23px 0 #e8e8e8',
  },
  titleContainer: { w: '85%', cur: 'move', },
  title: {
    fw: 500,
    fs: 14,
    px: 3,
    dy: 'block',
  },

  button: {
    p: 0,
    m: 0,
    b: 0,
    mnw: 30,
    mnh: 30,
    dy: 'block',
    bc: 'transparent',
    cr: 'var(--white-0-0-32)',
    curp: 1,
    flx: 'center',
    ':hover': { cr: 'var(--white-0-0-64)' },
  },

  hr: { mx: 10, mb: 10, mt: 5 },

  content: { px: 10 },

  titleBar: {
    h: 30,
    pl: 10,
    pt: 5,
    flx: 'center',
  },

}

export default draggableModalStyle
