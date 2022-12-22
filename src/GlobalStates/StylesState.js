/* eslint-disable import/no-cycle */
import { atom, selector } from 'recoil'
import { addToSessionStorage, generateSessionKey } from '../Utils/FormBuilderHelper'
import { mergeNestedObj } from '../Utils/globalHelpers'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $stylesLgLight = atom({
  key: '$stylesLgLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesLgLight'), newStyles, { strType: 'json' })
    })
  }],
})
export const $stylesLgDark = atom({
  key: '$stylesLgDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesLgDark'), newStyles, { strType: 'json' })
    })
  }],
})
export const $stylesMdLight = atom({
  key: '$stylesMdLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesMdLight'), newStyles, { strType: 'json' })
    })
  }],
})
export const $stylesMdDark = atom({
  key: '$stylesMdDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesMdDark'), newStyles, { strType: 'json' })
    })
  }],
})
export const $stylesSmLight = atom({
  key: '$stylesSmLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesSmLight'), newStyles, { strType: 'json' })
    })
  }],
})
export const $stylesSmDark = atom({
  key: '$stylesSmDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newStyles) => {
      addToSessionStorage(generateSessionKey('stylesSmDark'), newStyles, { strType: 'json' })
    })
  }],
})

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

export const $allStyles = selector({
  key: '$allStyles',
  get: ({ get }) => ({
    lgLightStyles: get($stylesLgLight),
    lgDarkStyles: get($stylesLgDark),
    mdLightStyles: get($stylesMdLight),
    mdDarkStyles: get($stylesMdDark),
    smLightStyles: get($stylesSmLight),
    smDarkStyles: get($stylesSmDark),
  }
  ),
  set: ({ set }, newStyles) => {
    if (!('lgLightStyles' in newStyles)) throw new Error('$allStyles: lgLightStyles is missing')
    if (!('lgDarkStyles' in newStyles)) throw new Error('$allStyles: lgDarkStyles is missing')
    if (!('mdLightStyles' in newStyles)) throw new Error('$allStyles: mdLightStyles is missing')
    if (!('mdDarkStyles' in newStyles)) throw new Error('$allStyles: mdDarkStyles is missing')
    if (!('smLightStyles' in newStyles)) throw new Error('$allStyles: smLightStyles is missing')
    if (!('smDarkStyles' in newStyles)) throw new Error('$allStyles: smDarkStyles is missing')
    set($stylesLgLight, newStyles.lgLightStyles)
    set($stylesLgDark, newStyles.lgDarkStyles)
    set($stylesMdLight, newStyles.mdLightStyles)
    set($stylesMdDark, newStyles.mdDarkStyles)
    set($stylesSmLight, newStyles.smLightStyles)
    set($stylesSmDark, newStyles.smDarkStyles)
  },
})
