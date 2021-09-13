const vars = {
  bgPrimary: '#d0d6df',
  bgPrimaryOffset: '#f1f3f7',
  bgSecondary: '#fff',
  textPrimary: '#3a3c42',
  textPrimaryOffset: '#898c94',
  orange: '#dc9960',
  green: '#1eb8b1',
  purple: '#657cc4',
  black: '#000',
  red: '#d92027',
}

const context = {
  menu: {
    dy: 'flex',
    fd: 'column',
    bc: vars.bdSecondary,
    brs: 10,
    bs: '0 10px 20px rgba(#404040, 0.15)',
  },

  list: {
    m: 0,
    dy: 'block',
    w: '100%',
    p: 8,
  },

  item: {
    pn: 'relative',
    mb: 0,
  },

  btn: {
    b: 0,
    p: '8px 8px',
    pr: 36,
    w: '100%',
    brs: 8,
    flx: 'align-center',
    pn: 'relative',
    bc: vars.bgSecondary,
    cur: 'pointer',
    '&:hover': {
      bc: vars.bgPrimaryOffset,
    },
    '& svg': {
      'flex-shrink': 0,
      w: 20,
      h: 20,
      mr: 10,
      stroke: vars.black,
      '&:nth-of-type(2)': {
        mr: 0,
        pn: 'absolute',
        rt: 8,
      },
    },
  },

  delete: {
    '&:hover': {
      cr: vars.red,
    },
  },
}

export default context
