const sizeControlStyle = {

  container: {
    // bc: 'red',
    b: '1px solid #ddd',
    brs: 10,
    flx: 'align-center',
    h: 30,
    p: 5,
  },

  input: {

    // bc: 'red',
    flx: 'center',

    ':hover': {
      b: 0,

      '& > div > input:first-child': { bc: 'transparent !important' },
      '& button': { dy: 'none' },
    },

    '& > span:first-child': { w: '20%', p: 0 },

    '& > div > input:first-child': { pr: '0px !important', w: '80%' },

  },

  selectt: {
    '-webkit-appearance': 'none !important',
    '-moz-appearance': 'none !important',
    appearance: 'none !important',
    bi: 'none !important',
    all: 'unset',
    brs: '0 !important',
    bl: '1px solid #ddd',

    '&::-ms-expand': { display: 'none !important' },
  },
}

export default sizeControlStyle
