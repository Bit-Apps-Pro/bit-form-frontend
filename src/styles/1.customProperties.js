// import { isInteger } from "core-js/core/number"
const customProperties = {
  g: ($ = 'center') => ({ placeContent: $ }),
  dy: $ => ({ display: $ }),

  b: $ => ({ border: $ }),
  bl: $ => ({ borderLeft: $ }),
  brs: $ => ({ borderRight: $ }),
  bb: $ => ({ borderBottom: $ }),

  pe: $ => ({ pointerEvents: $ }),
  us: $ => ({ userSelect: $ }),
  fr: $ => ({ filter: $ }),
  bs: $ => ({ boxShadow: $ }),
  ls: $ => ({ listStyle: $ }),

  tn: $ => ({ transition: $ }),
  tdy: $ => ({ transitionDelay: $ }),
  tdn: $ => ({ transitionDuration: $ }),
  ttf: $ => ({ transitionTimingFunction: $ }),
  tm: $ => ({ transform: $ }),

  ow: $ => ({ overflow: $ }),

  fs: $ => ({ fontSize: Number.isInteger($) ? `${$}px` : $ }),
  fw: $ => ({ fontWeight: $ }),
  ts: $ => ({ textShadow: $ }),
  ta: $ => ({ textAlign: $ }),

  pn: $ => ({ position: $ }),
  tp: $ => ({ top: Number.isInteger($) ? `${$}px` : $ }),
  bm: $ => ({ bottom: Number.isInteger($) ? `${$}px` : $ }),
  lt: $ => ({ left: Number.isInteger($) ? `${$}px` : $ }),
  rt: $ => ({ rigth: Number.isInteger($) ? `${$}px` : $ }),

  bd: $ => ({ background: $ }),
  cr: $ => ({ color: $ }),
  bc: $ => ({ backgroundColor: $ }),

  flx: $ => ({
    display: 'flex',
    ...$ === 'center' && { alignItems: 'center', justifyContent: 'center' },
    ...$ === 'between' && { justifyContent: 'space-between' },
    ...$ === 'align-center' && { alignItems: 'center' },
    ...$ === 'center-between' && { alignItems: 'center', justifyContent: 'space-between' },
  }),
  flxi: $ => ({
    display: 'inline-flex',
    ...$ === 'center' && { alignItems: 'center', justifyContent: 'center' },
    ...$ === 'between' && { justifyContent: 'space-between' },
    ...$ === 'align-center' && { alignItems: 'center' },
    ...$ === 'center-between' && { alignItems: 'center', justifyContent: 'space-between' },
  }),

  fd: $ => ({ flexDirection: $ }),
  jc: $ => ({ justifyContent: $ }),
  ai: $ => ({ alignItems: $ }),
  cur: $ => ({ cursor: $ }),
  oe: $ => ({ outline: $ }),
  td: $ => ({ textDecoration: $ }),
  ws: $ => ({ whiteSpace: $ }),
  oy: $ => ({ opacity: $ }),

  se: ($) => ({ width: Number.isInteger($) ? `${$}px` : $, height: Number.isInteger($) ? `${$}px` : $ }),

  w: $ => ({ width: Number.isInteger($) ? `${$}px` : $ }),
  h: $ => ({ height: Number.isInteger($) ? `${$}px` : $ }),
  mxw: $ => ({ maxWidth: Number.isInteger($) ? `${$}px` : $ }),
  mxh: $ => ({ maxHeight: Number.isInteger($) ? `${$}px` : $ }),
  brs: $ => ({ borderRadius: Number.isInteger($) ? `${$}px` : $ }),

  p: $ => ({ padding: Number.isInteger($) ? `${$}px` : $ }),
  pt: $ => ({ paddingTop: Number.isInteger($) ? `${$}px` : $ }),
  pr: $ => ({ paddingRight: Number.isInteger($) ? `${$}px` : $ }),
  pb: $ => ({ paddingBottom: Number.isInteger($) ? `${$}px` : $ }),
  pl: $ => ({ paddingLeft: Number.isInteger($) ? `${$}px` : $ }),

  m: $ => ({ margin: Number.isInteger($) ? `${$}px` : $ }),
  mt: $ => ({ marginTop: Number.isInteger($) ? `${$}px` : $ }),
  mr: $ => ({ marginRight: Number.isInteger($) ? `${$}px` : $ }),
  mb: $ => ({ marginBottom: Number.isInteger($) ? `${$}px` : $ }),
  ml: $ => ({ marginLeft: Number.isInteger($) ? `${$}px` : $ }),

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
  zx: $ => ({ zIndex: $ }),
  ct: $ => ({ content: $ }),
}
export default customProperties
