const tableStyle = {
  tableActionBtn: {
    flx: 'center',
    b: 'none',
    p: 5,
    se: 30,
    curp: 1,
    oe: 'none',
    brs: 8,
    cr: 'var(--dp-blue)',
    ':hover': { bd: 'var(--b-79-96)', cr: 'var(--blue)' },
    ':focus-visible': { focusOutline: 1 },
    ff: '"Outfit", sans-serif !important',
  },
  dataRange: {
    '& .rdrMonth': { p: 0 },
    '& .rdrNextPrevButton': { m: 0 },
    '& .rdrMonthAndYearWrapper': { pt: 0 },
  },
}

export default tableStyle
