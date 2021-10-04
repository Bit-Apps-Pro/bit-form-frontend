const Toolbars = {
  toolbar_wrp: {
    bd: 'var(--white-100)',
    h: '100%',
    ow: 'hidden',
    mxw: 190,
    mnw: 55,
    px: 3,
    pt: 14,
    pb: 35,
    tn: 'width 500ms',
  },
  fields_search: {
    pn: 'relative',
    ml: 7,
    mr: 5,
    tn: 'width .2s',
  },
  search_field: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    pl: '27px !important',
    pr: '5px !important',
    ':focus': {
      bs: '0px 0px 0px 1.5px var(--b-50) !important',
      bcr: 'var(--b-92-62) !important',
      pr: '0px !important',
      '& ~ .shortcut': { dy: 'none' },
      '& ~ span svg': { cr: 'var(--b-50)' },
    },
    '::placeholder': { fs: 12 },
    '::-webkit-search-cancel-button': {
      appearance: 'none',
      w: 14,
      h: 14,
      mr: 10,
      bd: 'var(--white-0-83)',
      curp: 1,
      backgroundPosition: '54% 50% !important',
      // eslint-disable-next-line quotes
      bi: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='Black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")`,
      brs: 20,
    },

  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 6,
    lt: 0,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-75)',
    curp: 1,
    '& svg': { dy: 'block' },
  },
  sec_acc: {
    mb: 15,
    cr: 'var(--white-0-50)',
    '& .title': { fw: 400 },
    '& .btgl': { cur: 'pointer !important' },
  },

  tool_bar: {
    dy: 'flex',
    flxp: 'wrap',
    // mxh: 200,
    owy: 'scroll',
    px: 2,
    py: 5,
  },
  sort_btn: {
    w: 25,
    h: 25,
    b: 'none',
    brs: 6,
    flxc: 1,
    curp: 1,
    ':hover': {
      bd: 'red'
    }
  },
  tool_icn: {
    dy: 'flex',
    cr: 'var(--dp-blue)',
    fs: 25,
    mr: 5,
  },
  shortcut: {
    pn: 'absolute',
    cr: 'var(--white-0-0-64)',
    b: '1px solid var(--white-0-75)',
    brs: 4,
    px: 6,
    py: 3,
    fs: 12,
    fw: 600,
    tp: '50%',
    tm: 'translateY(-50%)',
    rt: 5,
  },
}
export default Toolbars
