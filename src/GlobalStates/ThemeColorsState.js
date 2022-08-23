import { atom, selector } from 'recoil'
import { $colorScheme } from './GlobalStates'

export const $lightThemeColors = atom({ key: '$lightThemeColors', default: {} })
export const $darkThemeColors = atom({ key: '$darkThemeColors', default: {} })

export const $themeColors = selector({
  key: '$themeColors',
  get: ({ get }) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') return get($lightThemeColors)
    if (colorScheme === 'dark') return { ...get($lightThemeColors), ...get($darkThemeColors) }
  },
  set: ({ set, get }, newColors) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') set($lightThemeColors, newColors)
    if (colorScheme === 'dark') set($darkThemeColors, newColors)
  },
})

export const $allThemeColors = selector({
  key: '$allThemeColors',
  get: ({ get }) => ({
    lightThemeColors: get($lightThemeColors),
    darkThemeColors: get($darkThemeColors),
  }),
  set: ({ set }, newThemeColors) => {
    if (!('lightThemeColors' in newThemeColors)) throw new Error('$allThemeColors: lightThemeColors is required')
    if (!('darkThemeColors' in newThemeColors)) throw new Error('$allThemeColors: darkThemeColors is required')
    set($lightThemeColors, newThemeColors.lightThemeColors)
    set($darkThemeColors, newThemeColors.darkThemeColors)
  },
})
