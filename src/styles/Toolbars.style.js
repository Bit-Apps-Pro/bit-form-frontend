const Toolbars = {
  toolbar_wrp: {
    bd: 'var(--white-100)',
    h: '100%',
    ow: 'hidden',
    mxw: 190,
    mnw: 55,
    px: 14,
    pt: 14,
    pb: 35,
    tn: 'width 500ms',
  },
  fields_search: {
    pn: 'relative',
    mb: 15,
  },
  search_field: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    pl: '27px !important',
    pr: '27px !important',
    '&:focus': {
      bs: '0px 0px 0px 3px var(--b-100-64-40) !important',
      bcr: 'var(--b-92-62) !important',
      '& ~ .shortcut': { dy: 'none' },
      pr: '0px !important',
    },
    '::placeholder': { fs: 12 },
    '::-webkit-search-cancel-button': {
      bd: 'var(--b-92-62) !important',
      bi: 'url("data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>") !important',
      brs: 4,
    },

  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 6,
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

  tool_icn: {
    dy: 'flex',
    cr: 'var(--dp-blue)',
    fs: 25,
    mr: 5,
  },
  shortcut: {
    pn: 'absolute',
    cr: 'var(--white-0-75)',
    b: '1px solid var(--white-0-81-32)',
    brs: 4,
    px: 6,
    py: 2,
    tp: 5,
    rt: 5,
  },
}
export default Toolbars
