// import { isInteger } from "core-js/core/number"

const customProperties = {
  g: ($ = 'center') => ({ placeContent: $ }),
  d: $ => ({ display: $ }),
  b: $ => ({ border: $ }),
  pe: $ => ({ pointerEvents: $ }),
  us: $ => ({ userSelect: $ }),
  fltr: $ => ({ filter: $ }),
  bS: $ => ({ boxShadow: $ }),

  fs: $ => ({ fontSize: $ }),
  fw: $ => ({ fontWeight: $ }),
  ts: $ => ({ textShadow: $ }),
  txA: $ => ({ textAlign: $ }),
  pos: $ => ({ position: $ }),
  yt: $ => ({ top: Number.isInteger($) ? `${$}px` : $ }),
  yb: $ => ({ bottom: Number.isInteger($) ? `${$}px` : $ }),
  xl: $ => ({ left: Number.isInteger($) ? `${$}px` : $ }),
  xr: $ => ({ rigth: Number.isInteger($) ? `${$}px` : $ }),

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
  fDri: $ => ({ flexDriection: $ }),
  jC: $ => ({ justifyContent: $ }),
  aI: $ => ({ alignItems: $ }),
  cr: $ => ({ cursor: $ }),
  otln: $ => ({ outline: $ }),
  tD: $ => ({ textDecoration: $ }),
  wS: $ => ({ whiteSpace: $ }),
  o: $ => ({ opacity: $ }),

  size: $ => ({ width: `${$}px`, height: `${$}px` }),

  w: $ => ({ width: Number.isInteger($) ? `${$}px` : $ }),
  h: $ => ({ height: Number.isInteger($) ? `${$}px` : $ }),
  mxW: $ => ({ maxWidth: Number.isInteger($) ? `${$}px` : $ }),
  mxH: $ => ({ maxHeight: Number.isInteger($) ? `${$}px` : $ }),
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
  z: $ => ({ zIndex: $ }),
  c: $ => ({ content: $ }),
}
export default customProperties
