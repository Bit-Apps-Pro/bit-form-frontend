/* eslint-disable import/no-cycle */
import { atom, selector } from 'recoil'
import { getRecoil } from 'recoil-nexus'
import { $breakpoint, $colorScheme, $formId } from './GlobalStates'

export const $themeVarsLgLight = atom({
  key: '$themeVarsLgLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsLgLight) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsLgLight-bf-${formId}`, JSON.stringify(newThemeVarsLgLight))
    })
  }],
})
export const $themeVarsMdLight = atom({
  key: '$themeVarsMdLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsMdLight) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsMdLight-bf-${formId}`, JSON.stringify(newThemeVarsMdLight))
    })
  }],
})
export const $themeVarsSmLight = atom({
  key: '$themeVarsSmLight',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsSmLight) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsSmLight-bf-${formId}`, JSON.stringify(newThemeVarsSmLight))
    })
  }],
})

export const $themeVarsLgDark = atom({
  key: '$themeVarsLgDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsLgDark) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsLgDark-bf-${formId}`, JSON.stringify(newThemeVarsLgDark))
    })
  }],
})
export const $themeVarsMdDark = atom({
  key: '$themeVarsMdDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsMdDark) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsMdDark-bf-${formId}`, JSON.stringify(newThemeVarsMdDark))
    })
  }],
})
export const $themeVarsSmDark = atom({
  key: '$themeVarsSmDark',
  default: {},
  effects: [({ onSet }) => {
    onSet((newThemeVarsSmDark) => {
      const formId = getRecoil($formId)
      sessionStorage.setItem(`themeVarsSmDark-bf-${formId}`, JSON.stringify(newThemeVarsSmDark))
    })
  }],
})

export const $themeVars = selector({
  key: '$themeVars',
  get: ({ get }) => {
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

  set: ({ set, get }, newThemeVars) => {
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
})

export const $fieldsDirection = selector({
  key: '$fieldsDirection',
  get: ({ get }) => {
    const themeVars = get($themeVars)
    return themeVars['--dir']
  },
})

export const $allThemeVars = selector({
  key: '$allThemeVars',
  get: ({ get }) => ({
    lgLightThemeVars: get($themeVarsLgLight),
    lgDarkThemeVars: get($themeVarsLgDark),
    mdLightThemeVars: get($themeVarsMdLight),
    mdDarkThemeVars: get($themeVarsMdDark),
    smLightThemeVars: get($themeVarsSmLight),
    smDarkThemeVars: get($themeVarsSmDark),
  }),
  set: ({ set }, newThemeVars) => {
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
})
