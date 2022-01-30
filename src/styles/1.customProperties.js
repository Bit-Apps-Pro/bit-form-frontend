// import { isInteger } from "core-js/core/number"
const customProperties = {
  // border
  b: $ => ({ border: $ }),
  bt: $ => ({ borderTop: $ }),
  bl: $ => ({ borderLeft: $ }),
  br: $ => ({ borderRight: $ }),
  bb: $ => ({ borderBottom: $ }),
  bblr: $ => ({ borderBottomLeftRadius: $ }),
  bbrr: $ => ({ borderBottomRightRadius: $ }),
  brs: $ => ({ borderRadius: Number.isInteger($) ? `${$}px` : $ }),
  bcr: $ => ({ borderColor: $ }),
  bse: $ => ({ borderStyle: $ }),

  bd: $ => ({ background: $ }),
  cr: $ => ({ color: $ }),
  bc: $ => ({ backgroundColor: $ }),
  bi: $ => ({ backgroundImage: $ }),

  g: ($ = 'center') => ({ placeContent: $ }),
  dy: $ => ({ display: $ }),
  flxp: () => ({ flexWrap: 'wrap' }),
  bsz: $ => ({ boxSizing: $ }),
  vy: $ => ({ visibility: $ }),

  pe: $ => ({ pointerEvents: $ }),
  us: () => ({
    userSelect: 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
  }),
  ae: $ => ({
    appearance: $ || 'none',
    '-webkit-appearance': $ || 'none',
    '-moz-appearance': $ || 'none',
  }),
  fr: $ => ({ filter: $ }),
  bs: $ => ({ boxShadow: $ }),
  ls: $ => ({ listStyle: $ }),

  // animations
  tn: $ => ({ transition: $ }),
  tdy: $ => ({ transitionDelay: $ }),
  tdn: $ => ({ transitionDuration: $ }),
  ttf: $ => ({ transitionTimingFunction: $ }),
  tm: $ => ({ transform: $ }),

  re: $ => ({ resize: $ }),
  ow: $ => ({ overflow: $ }),
  owy: $ => ({ overflowY: $ }),
  owx: $ => ({ overflowX: $ }),

  fs: $ => ({ fontSize: Number.isInteger($) ? `${$}px` : $ }),
  ff: $ => ({ fontFamily: Number.isInteger($) ? `${$}px` : $ }),
  lh: $ => ({ lineHeight: $ }),
  fw: $ => ({ fontWeight: $ }),
  ts: $ => ({ textShadow: $ }),
  ta: $ => ({ textAlign: $ }),
  to: $ => ({ textOverflow: $ }),

  // position
  pn: $ => ({ position: $ }),
  tp: $ => ({ top: Number.isInteger($) ? `${$}px` : $ }),
  bm: $ => ({ bottom: Number.isInteger($) ? `${$}px` : $ }),
  lt: $ => ({ left: Number.isInteger($) ? `${$}px` : $ }),
  rt: $ => ({ right: Number.isInteger($) ? `${$}px` : $ }),

  // display flex
  flx: $ => ({
    display: 'flex',
    ...$ === 'center' && { alignItems: 'center', justifyContent: 'center' },
    ...$ === 'between' && { justifyContent: 'space-between' },
    ...$ === 'jc' && { justifyContent: 'center' },
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
  cg: $ => ({ columnGap: Number.isInteger($) ? `${$}px` : $ }),
  rg: $ => ({ rowGap: Number.isInteger($) ? `${$}px` : $ }),

  fd: $ => ({ flexDirection: $ }),
  jc: $ => ({ justifyContent: $ }),
  ai: $ => ({ alignItems: $ }),
  cur: $ => ({ cursor: $ }),
  curp: () => ({ cursor: 'pointer' }),
  oe: $ => ({ outline: $ }),
  td: $ => ({ textDecoration: $ }),
  ws: $ => ({ whiteSpace: $ }),
  wb: $ => ({ wordBreak: $ }),
  oy: $ => ({ opacity: $ }),

  // width and height same
  se: ($) => ({
    width: Number.isInteger($) ? `${$}px` : $,
    height: Number.isInteger($) ? `${$}px` : $,
  }),

  // widht and height
  w: $ => ({ width: Number.isInteger($) ? `${$}px` : $ }),
  h: $ => ({ height: Number.isInteger($) ? `${$}px` : $ }),
  mxw: $ => ({ maxWidth: Number.isInteger($) ? `${$}px` : $ }),
  mxh: $ => ({ maxHeight: Number.isInteger($) ? `${$}px` : $ }),
  mnw: $ => ({ minWidth: Number.isInteger($) ? `${$}px` : $ }),
  mnh: $ => ({ minHeight: Number.isInteger($) ? `${$}px` : $ }),

  // padding
  p: $ => ({ padding: Number.isInteger($) ? `${$}px` : $ }),
  pt: $ => ({ paddingTop: Number.isInteger($) ? `${$}px` : $ }),
  pr: $ => ({ paddingRight: Number.isInteger($) ? `${$}px` : $ }),
  pb: $ => ({ paddingBottom: Number.isInteger($) ? `${$}px` : $ }),
  pl: $ => ({ paddingLeft: Number.isInteger($) ? `${$}px` : $ }),

  px: $ => ($ === 'auto'
    ? { paddingLeft: 'auto', paddingRight: 'auto' }
    : { paddingLeft: `${$}px`, paddingRight: `${$}px` }),

  py: $ => ($ === 'auto'
    ? { paddingTop: 'auto', paddingBottom: 'auto' }
    : { paddingTop: `${$}px`, paddingBottom: `${$}px` }),

  // margin
  m: $ => ({ margin: Number.isInteger($) ? `${$}px` : $ }),
  mt: $ => ({ marginTop: Number.isInteger($) ? `${$}px` : $ }),
  mr: $ => ({ marginRight: Number.isInteger($) ? `${$}px` : $ }),
  mb: $ => ({ marginBottom: Number.isInteger($) ? `${$}px` : $ }),
  ml: $ => ({ marginLeft: Number.isInteger($) ? `${$}px` : $ }),

  mx: $ => ($ === 'auto'
    ? { marginLeft: 'auto', marginRight: 'auto' }
    : { marginLeft: `${$}px`, marginRight: `${$}px` }),

  my: $ => ($ === 'auto'
    ? { marginTop: 'auto', marginBottom: 'auto' }
    : { marginTop: `${$}px`, marginBottom: `${$}px` }),

  zx: $ => ({ zIndex: $ }),
  ct: $ => ({ content: $ }),

  focusShadow: () => ({ boxShadow: '0 0 0 2px var(--b-50) !important' }),
}
export default customProperties
