/* eslint-disable import/no-cycle */
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { mergeNestedObj } from '../Utils/globalHelpers'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $stylesLgLight = atomWithReset({})
export const $stylesLgDark = atomWithReset({})
export const $stylesMdLight = atomWithReset({})
export const $stylesMdDark = atomWithReset({})
export const $stylesSmLight = atomWithReset({})
export const $stylesSmDark = atomWithReset({})

export const $styles = atom(
  (get) => {
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
  (get, set, incomingStyles) => {
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
)

export const $allStyles = atom(
  (get) => ({
    lgLightStyles: get($stylesLgLight),
    lgDarkStyles: get($stylesLgDark),
    mdLightStyles: get($stylesMdLight),
    mdDarkStyles: get($stylesMdDark),
    smLightStyles: get($stylesSmLight),
    smDarkStyles: get($stylesSmDark),
  }),
  (_, set, newStyles) => {
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
)
