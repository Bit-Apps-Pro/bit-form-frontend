const customProperties = {
  g: ($ = 'center') => ({ placeContent: $ }),
  d: $ => ({ display: $ }),

  bg: $ => ({ background: $ }),
  clr: $ => ({ color: $ }),
  bgc: $ => ({ backgroundColor: $ }),
  flx: $ => ({
    display: 'flex',
    ...$ === 'center' && { alignItems: 'center', justifyContent: 'center' },
    ...$ === 'between' && { justifyContent: 'between' },
    ...$ === 'align-center' && { alignItems: 'center' },
    ...$ === 'center-between' && { alignItems: 'center', justifyContent: 'between' },
  }),

  size: $ => ({ width: `${$}px`, height: `${$}px` }),

  p: $ => ({ padding: `${$}px` }),

  m: $ => ({ margin: `${$}px` }),

  br: $ => ({ borderRadius: `${$}px` }),

  pt: $ => ({ paddingTop: `${$}${$ !== 'auto' && 'px'}` }),
  pr: $ => ({ paddingRight: `${$}${$ !== 'auto' && 'px'}` }),
  pb: $ => ({ paddingBottom: `${$}${$ !== 'auto' && 'px'}` }),
  pl: $ => ({ paddingLeft: `${$}${$ !== 'auto' && 'px'}` }),

  mt: $ => ({ marginTop: `${$}${$ !== 'auto' && 'px'}` }),
  mr: $ => ({ marginRight: `${$}${$ !== 'auto' && 'px'}` }),
  mb: $ => ({ marginBottom: `${$}${$ !== 'auto' && 'px'}` }),
  ml: $ => ({ marginLeft: `${$}${$ !== 'auto' && 'px'}` }),

  px: $ => ($ === 'auto'
    ? { paddingLeft: 'auto', paddingRight: 'auto' }
    : { paddingLeft: `${$}px`, paddingRight: `${$}px` }),

  py: $ => ($ === 'auto'
    ? { paddingTop: 'auto', paddingBottom: 'auto' }
    : { paddingTop: `${$}px`, paddingBottom: `${$}px` }),

  mx: $ => ($ === 'auto'
    ? { marginLeft: 'auto', marginRight: 'auto' }
    : { marginLeft: `${$}px`, marginRight: `${$}px` }),

  my: $ => ($ === 'auto'
    ? { marginTop: 'auto', marginBottom: 'auto' }
    : { marginTop: `${$}px`, marginBottom: `${$}px` }),

}
export default customProperties
