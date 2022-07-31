import { atom, selector } from 'recoil'
import { mergeNestedObj } from '../Utils/globalHelpers'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $tempStyles = atom({
  key: '$tempStyles',
  default: {
    themeVars: {},
    lightThemeColors: {},
    darkThemeColors: {},
    styles: {},
  },
})

export const $stylesLgLight = atom({
  key: '$stylesLgLight',
  default: {
    theme: 'bitformDefault',
    fieldsSize: 'medium',
    font: {
      fontType: '',
      fontURL: '',
      fontWeightVariants: [],
      fontStyle: [],
    },
    form: {
      '_frm-bg': {
        padding: '10px',
        border: 'solid hsla(215, 20%, 93%, 100%)',
        'border-width': '1px',
      },
    },
    fields: {},
  },
})

// ==== tmp ====
// form: {
//   light: {
//     // _frm: { 'background-color': 'var(--global-bg-color)' },
//     '_frm-bg': {
//       padding: '10px',
//       border: 'solid hsla(215, 20%, 93%, 100%)',
//       'border-width': '1px',
//     },
//   },
//   dark: {
//     // _frm: { 'background-color': 'var(--global-bg-color)' },
//     // '_frm-bg': { padding: '10px' },
//   },
// },
export const $stylesMdLight = atom({ key: '$stylesMdLight', default: {} })
export const $stylesSmLight = atom({ key: '$stylesSmLight', default: {} })
export const $stylesLgDark = atom({ key: '$stylesLgDark', default: {} })
export const $stylesMdDark = atom({ key: '$stylesMdDark', default: {} })
export const $stylesSmDark = atom({ key: '$stylesSmDark', default: {} })

export const $styles = selector({
  key: '$styles',
  get: ({ get }) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    if (breakpoint === 'lg') {
      return isDarkColorScheme
        ? mergeNestedObj(
          get($stylesLgLight),
          get($stylesLgDark),
        )
        : get($stylesLgLight)
    }
    if (breakpoint === 'md') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          get($stylesLgLight),
          get($stylesLgDark),
          get($stylesMdLight),
          get($stylesMdDark),
        )
      }

      return mergeNestedObj(
        get($stylesLgLight),
        get($stylesMdLight),
      )
    }
    if (breakpoint === 'sm') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          get($stylesLgLight),
          get($stylesLgDark),
          get($stylesMdLight),
          get($stylesMdDark),
          get($stylesSmLight),
          get($stylesSmDark),
        )
      }
      return mergeNestedObj(
        get($stylesLgLight),
        get($stylesMdLight),
        get($stylesSmLight),
      )
    }
  },
  set: ({ set, get }, incomingStyles) => {
    const newStyles = incomingStyles || {}
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    if (breakpoint === 'lg') {
      if (isDarkColorScheme) {
        set($stylesLgDark, newStyles)
      } else {
        set($stylesLgLight, newStyles)
      }
    }
    if (breakpoint === 'md') {
      set(isDarkColorScheme ? $stylesMdDark : $stylesMdLight, newStyles)
    }
    if (breakpoint === 'sm') {
      set(isDarkColorScheme ? $stylesSmDark : $stylesSmLight, newStyles)
    }
  },
})
