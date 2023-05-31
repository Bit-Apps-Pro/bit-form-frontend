/* eslint-disable import/no-cycle */
import { atomWithReset } from 'jotai/utils'
import { $colorScheme } from './GlobalStates'

export const $lightThemeColors = atomWithReset({})
export const $darkThemeColors = atomWithReset({})

export const $themeColors = atomWithReset(
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

export const $allThemeColors = atomWithReset(
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
