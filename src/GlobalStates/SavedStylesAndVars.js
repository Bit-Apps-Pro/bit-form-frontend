import { atom } from 'jotai'
import { mergeNestedObj } from '../Utils/globalHelpers'
import { $breakpoint, $colorScheme } from './GlobalStates'

export const $savedStylesAndVars = atom({
  allThemeVars: {},
  allThemeColors: {},
  allStyles: {},
})

export const $savedThemeColors = atom(
  (get) => {
    const colorScheme = get($colorScheme)
    const { lightThemeColors, darkThemeColors } = get($savedStylesAndVars).allThemeColors
    if (colorScheme === 'dark') return { ...lightThemeColors, ...darkThemeColors }
    return lightThemeColors
  },
)

export const $savedThemeVars = atom(
  (get) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    const { lgLightThemeVars, lgDarkThemeVars, mdLightThemeVars, mdDarkThemeVars, smLightThemeVars, smDarkThemeVars } = get($savedStylesAndVars).allThemeVars
    if (breakpoint === 'lg') {
      return isDarkColorScheme
        ? { ...lgLightThemeVars, ...lgDarkThemeVars }
        : lgLightThemeVars
    }
    if (breakpoint === 'md') {
      return {
        ...lgLightThemeVars,
        ...isDarkColorScheme && lgDarkThemeVars,
        ...mdLightThemeVars,
        ...isDarkColorScheme && mdDarkThemeVars,
      }
    }
    if (breakpoint === 'sm') {
      return {
        ...lgLightThemeVars,
        ...isDarkColorScheme && lgDarkThemeVars,
        ...mdLightThemeVars,
        ...isDarkColorScheme && mdDarkThemeVars,
        ...smLightThemeVars,
        ...isDarkColorScheme && smDarkThemeVars,
      }
    }
  },
)

export const $savedStyles = atom(
  (get) => {
    const isDarkColorScheme = get($colorScheme) === 'dark'
    const breakpoint = get($breakpoint)
    const { lgLightStyles, lgDarkStyles, mdLightStyles, mdDarkStyles, smLightStyles, smDarkStyles } = get($savedStylesAndVars).allStyles
    if (breakpoint === 'lg') {
      return isDarkColorScheme
        ? mergeNestedObj(
          lgLightStyles,
          lgDarkStyles,
        )
        : lgLightStyles
    }
    if (breakpoint === 'md') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          lgLightStyles,
          lgDarkStyles,
          mdLightStyles,
          mdDarkStyles,
        )
      }

      return mergeNestedObj(
        lgLightStyles,
        mdLightStyles,
      )
    }
    if (breakpoint === 'sm') {
      if (isDarkColorScheme) {
        return mergeNestedObj(
          lgLightStyles,
          lgDarkStyles,
          mdLightStyles,
          mdDarkStyles,
          smLightStyles,
          smDarkStyles,
        )
      }
      return mergeNestedObj(
        lgLightStyles,
        mdLightStyles,
        smLightStyles,
      )
    }
  },
)
