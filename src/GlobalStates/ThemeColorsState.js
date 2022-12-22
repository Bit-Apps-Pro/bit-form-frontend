/* eslint-disable import/no-cycle */
import { atom, selector } from 'recoil'
import { addToSessionStorage, generateSessionKey } from '../Utils/FormBuilderHelper'
import { debouncer } from '../Utils/Helpers'
import { $colorScheme } from './GlobalStates'

export const $lightThemeColors = atom({
  key: '$lightThemeColors',
  default: {},
  effects: [({ onSet }) => {
    onSet((newLightThemeColors, _, isReset) => {
      if (isReset) return
      debouncer('lightThemeColors', () => {
        addToSessionStorage(generateSessionKey('lightThemeColors'), newLightThemeColors, { strType: 'json' })
      })
    })
  }],
})
export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {},
  effects: [({ onSet }) => {
    onSet((newDarkThemeColors, _, isReset) => {
      if (isReset) return
      debouncer('darkThemeColors', () => {
        addToSessionStorage(generateSessionKey('darkThemeColors'), newDarkThemeColors, { strType: 'json' })
      })
    })
  }],
})

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
