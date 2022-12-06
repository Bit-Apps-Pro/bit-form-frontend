/* eslint-disable import/no-cycle */
import { atom, selector } from 'recoil'
import { getRecoil } from 'recoil-nexus'
import { $colorScheme, $formId } from './GlobalStates'

export const $lightThemeColors = atom({
  key: '$lightThemeColors',
  default: {},
  effects: [({ onSet }) => {
    onSet((newLightThemeColors) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`lightThemeColors-bf-${formId}`, JSON.stringify(newLightThemeColors))
    })
  }],
})
export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {},
  effects: [({ onSet }) => {
    onSet((darkThemeColors) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`darkThemeColors-bf-${formId}`, JSON.stringify(darkThemeColors))
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
