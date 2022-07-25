import { selector, atom } from 'recoil'
import { mergeNestedObj } from '../Utils/globalHelpers'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $savedStylesAndVars = atom({
  key: '$savedStylesAndVars',
  default: {
    themeVars: {},
    themeColors: {},
    styles: {},
  },
})

export const $savedThemeColors = selector({
  key: '$savedThemeColors',
  get: ({ get }) => {
    const colorScheme = get($colorScheme)
    const { lightThemeColors, darkThemeColors } = get($savedStylesAndVars).themeColors
    if (colorScheme === 'dark') return { ...lightThemeColors, ...darkThemeColors }
    return lightThemeColors
  },
})

export const $savedThemeVars = selector({
  key: '$savedThemeVars',
  get: ({ get }) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    const { themeVars } = get($savedStylesAndVars)
    if (breakpoint === 'lg') {
      return isDarkColorScheme
        ? { ...themeVars.lgLightThemeVars, ...themeVars.lgDarkThemeVars }
        : themeVars.lgLightThemeVars
    }
    if (breakpoint === 'md') {
      return {
        ...themeVars.lgLightThemeVars,
        ...isDarkColorScheme && themeVars.lgDarkThemeVars,
        ...themeVars.mdLightThemeVars,
        ...isDarkColorScheme && themeVars.mdDarkThemeVars,
      }
    }
    if (breakpoint === 'sm') {
      return {
        ...themeVars.lgLightThemeVars,
        ...isDarkColorScheme && themeVars.lgDarkThemeVars,
        ...themeVars.mdLightThemeVars,
        ...isDarkColorScheme && themeVars.mdDarkThemeVars,
        ...themeVars.smLightThemeVars,
        ...isDarkColorScheme && themeVars.smDarkThemeVars,
      }
    }
  },
})

export const $savedStyles = selector({
  key: '$savedStylesAndVars',
  get: ({ get }) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    const { styles } = get($savedStylesAndVars)
    if (breakpoint === 'lg') {
      return isDarkColorScheme
        ? mergeNestedObj(
          styles.lgLightStyles,
          styles.lgDarkStyles,
        )
        : styles.lgLightStyles
    }
    if (breakpoint === 'md') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          styles.lgLightStyles,
          styles.lgDarkStyles,
          styles.mdLightStyles,
          styles.mdDarkStyles,
        )
      }

      return mergeNestedObj(
        styles.lgLightStyles,
        styles.mdLightStyles,
      )
    }
    if (breakpoint === 'sm') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          styles.lgLightStyles,
          styles.lgDarkStyles,
          styles.mdLightStyles,
          styles.mdDarkStyles,
          styles.smLightStyles,
          styles.smDarkStyles,
        )
      }
      return mergeNestedObj(
        styles.lgLightStyles,
        styles.mdLightStyles,
        styles.smLightStyles,
      )
    }
  },
})
