// import { isInteger } from "core-js/core/number"

const customProperties = {
  g: ($ = 'center') => ({ placeContent: $ }),
  d: $ => ({ display: $ }),

  fs: $ => ({ fontSize: $ }),
  po: $ => ({ position: $ }),
  pot: $ => ({ top: Number.isInteger($) ? `${$}px` : $ }),
  pob: $ => ({ bottom: Number.isInteger($) ? `${$}px` : $ }),
  pol: $ => ({ left: Number.isInteger($) ? `${$}px` : $ }),
  por: $ => ({ rigth: Number.isInteger($) ? `${$}px` : $ }),

  bg: $ => ({ background: $ }),
  clr: $ => ({ color: $ }),
  bgc: $ => ({ backgroundColor: $ }),
  flx: $ => ({
    display: 'flex',
    ...$ === 'center' && { alignItems: 'center', justifyContent: 'center' },
    ...$ === 'between' && { justifyContent: 'between' },
    ...$ === 'align-center' && { alignItems: 'center' },
    ...$ === 'center-between' && { alignItems: 'center', justifyContent: 'space-between' },
  }),

  size: $ => ({ width: `${$}px`, height: `${$}px` }),

  w: $ => ({ width: Number.isInteger($) ? `${$}px` : $ }),
  mx_w: $ => ({ maxWidth: Number.isInteger($) ? `${$}px` : $ }),
  mx_h: $ => ({ maxHeight: Number.isInteger($) ? `${$}px` : $ }),
  br: $ => ({ borderRadius: `${$}px` }),
  p: $ => ({ padding: Number.isInteger($) ? `${$}px` : $ }),
  pt: $ => ({ paddingTop: `${$}${$ !== 'auto' && 'px'}` }),
  pr: $ => ({ paddingRight: `${$}${$ !== 'auto' && 'px'}` }),
  pb: $ => ({ paddingBottom: `${$}${$ !== 'auto' && 'px'}` }),
  pl: $ => ({ paddingLeft: `${$}${$ !== 'auto' && 'px'}` }),
  m: $ => ({ margin: Number.isInteger($) ? `${$}px` : $ }),
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
