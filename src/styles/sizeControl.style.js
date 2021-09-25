const sizeControlStyle = {
  container: {
    b: '1px solid #ddd',
    brs: 10,
    flx: 'align-center',
    h: 32,
    p: 3,
  },

  input: {
    jc: 'space-between !important',

    ':hover': {
      b: '1px solid transparent',

      '& > div > input:first-child': { bc: 'transparent !important' },
      '& button': { dy: 'none' },
    },

    '& > span:first-child': { w: '20%', p: 0 },

    '& > div': { w: '70%' },
    '& > div > input:first-child': { pr: '0px !important' },
  },

  selectt: {
    '-webkit-appearance': 'none !important',
    '-moz-appearance': 'none !important',
    appearance: 'none !important',
    bi: 'none !important',
    all: 'unset',
    brs: '0 !important',
    bl: '1px solid #ddd',
    p: '0px !important',
    pr: '3px !important',
    pl: '3px !important',

    '&::-ms-expand': { display: 'none !important' },
    '&:focus': { bs: 'none !important' },

  },
}

export default sizeControlStyle
