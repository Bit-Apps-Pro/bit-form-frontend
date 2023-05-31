/* eslint-disable import/no-cycle */
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { $colorScheme } from './GlobalStates'

export const $lightThemeColors = atomWithReset({})
export const $darkThemeColors = atomWithReset({})

export const $themeColors = atom(
  (get) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') return get($lightThemeColors)
    if (colorScheme === 'dark') return { ...get($lightThemeColors), ...get($darkThemeColors) }
  },
  (get, set, newColors) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') set($lightThemeColors, newColors)
    if (colorScheme === 'dark') set($darkThemeColors, newColors)
  },
)

export const $allThemeColors = atom(
  (get) => ({
    lightThemeColors: get($lightThemeColors),
    darkThemeColors: get($darkThemeColors),
  }),
  (_, set, newThemeColors) => {
    if (!('lightThemeColors' in newThemeColors)) throw new Error('$allThemeColors: lightThemeColors is required')
    if (!('darkThemeColors' in newThemeColors)) throw new Error('$allThemeColors: darkThemeColors is required')
    set($lightThemeColors, newThemeColors.lightThemeColors)
    set($darkThemeColors, newThemeColors.darkThemeColors)
  },
)
