/* eslint-disable import/no-cycle */
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $themeVarsLgLight = atomWithReset({})
export const $themeVarsMdLight = atomWithReset({})
export const $themeVarsSmLight = atomWithReset({})
export const $themeVarsLgDark = atomWithReset({})
export const $themeVarsMdDark = atomWithReset({})
export const $themeVarsSmDark = atomWithReset({})

export const $themeVars = atom(
  (get) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    if (breakpoint === 'lg') {
      return isDarkColorScheme ? { ...get($themeVarsLgLight), ...get($themeVarsLgDark) } : get($themeVarsLgLight)
    }
    if (breakpoint === 'md') {
      return {
        ...get($themeVarsLgLight),
        ...isDarkColorScheme && get($themeVarsLgDark),
        ...get($themeVarsMdLight),
        ...isDarkColorScheme && get($themeVarsMdDark),
      }
    }
    if (breakpoint === 'sm') {
      return {
        ...get($themeVarsLgLight),
        ...isDarkColorScheme && get($themeVarsLgDark),
        ...get($themeVarsMdLight),
        ...isDarkColorScheme && get($themeVarsMdDark),
        ...get($themeVarsSmLight),
        ...isDarkColorScheme && get($themeVarsSmDark),
      }
    }
  },
  (get, set, newThemeVars) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    if (breakpoint === 'lg') {
      set(isDarkColorScheme ? $themeVarsLgDark : $themeVarsLgLight, newThemeVars)
    }
    if (breakpoint === 'md') {
      // set(isDarkColorScheme ? $themeVarsMdDark : $themeVarsMdLight, getOneLvlObjDiff(get($themeVarsLgLight), newThemeVars))
      set(isDarkColorScheme ? $themeVarsMdDark : $themeVarsMdLight, newThemeVars)
    }
    if (breakpoint === 'sm') {
      // set(isDarkColorScheme ? $themeVarsSmDark : $themeVarsSmLight, getOneLvlObjDiff(get($themeVarsLgLight), newThemeVars))
      set(isDarkColorScheme ? $themeVarsSmDark : $themeVarsSmLight, newThemeVars)
    }
  },
)

export const $fieldsDirection = atom(
  (get) => {
    const themeVars = get($themeVars)
    return themeVars['--dir']
  },
)

export const $allThemeVars = atom(
  (get) => ({
    lgLightThemeVars: get($themeVarsLgLight),
    lgDarkThemeVars: get($themeVarsLgDark),
    mdLightThemeVars: get($themeVarsMdLight),
    mdDarkThemeVars: get($themeVarsMdDark),
    smLightThemeVars: get($themeVarsSmLight),
    smDarkThemeVars: get($themeVarsSmDark),
  }),
  (_, set, newThemeVars) => {
    if (!('lgLightThemeVars' in newThemeVars)) throw new Error('$allThemeVars: lgLightThemeVars is required')
    if (!('lgDarkThemeVars' in newThemeVars)) throw new Error('$allThemeVars: lgDarkThemeVars is required')
    if (!('mdLightThemeVars' in newThemeVars)) throw new Error('$allThemeVars: mdLightThemeVars is required')
    if (!('mdDarkThemeVars' in newThemeVars)) throw new Error('$allThemeVars: mdDarkThemeVars is required')
    if (!('smLightThemeVars' in newThemeVars)) throw new Error('$allThemeVars: smLightThemeVars is required')
    if (!('smDarkThemeVars' in newThemeVars)) throw new Error('$allThemeVars: smDarkThemeVars is required')
    set($themeVarsLgLight, newThemeVars.lgLightThemeVars)
    set($themeVarsLgDark, newThemeVars.lgDarkThemeVars)
    set($themeVarsMdLight, newThemeVars.mdLightThemeVars)
    set($themeVarsMdDark, newThemeVars.mdDarkThemeVars)
    set($themeVarsSmLight, newThemeVars.smLightThemeVars)
    set($themeVarsSmDark, newThemeVars.smDarkThemeVars)
  },
)
