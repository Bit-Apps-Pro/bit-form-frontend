import merge from 'deepmerge-alt'
import { atom, selector } from 'recoil'
import { $colorScheme } from './GlobalStates'

export const $lightThemeColors = atom({
  key: '$lightThemeColors',
  default: {
    '--global-accent-color': 'hsla(217, 100%, 50%, 100)', // Accent Color
    '--gah': 217, // global primary hue
    '--gas': '100%', // global primary saturation
    '--gal': '50%', // global primary lightness
    '--gaa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 0%, 14%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': '0%', // global fonst color saaturation
    '--gfl': '14%',
    '--gfa': 100,
    '--global-bg-color': 'hsla(0, 0%, 95%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 0,
    '--gbg-l': 100,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 0%, 67%, 100)',
    '--global-fld-bg-color': 'hsla(0, 40%, 67%, 100)', // field background color

    '--fld-wrp-bg': 'hsla(0, 0%, 100%, 100)', // fieldwrapper background
    '--fld-wrp-bdr': '', // field wrapper border
    '--fld-wrp-sh': '', // field wrapper box shadow

    '--lbl-wrp-bg': '', // label wrapper for background
    '--lbl-wrp-sh': '', // label wrapper box shadow
    '--lbl-wrp-bdr': '', // label wrapper border

    '--fld-lbl-bg': '', // field label background color
    '--fld-lbl-c': '', // field babel color
    '--fld-lbl-sh': '', // field label box shadow
    '--fld-lbl-bdr': '', // field label border

    '--sub-titl-bg': 'hsla(215, 71%, 39%, 100)', // sub title background color
    '--sub-titl-c': 'hsla(210, 71%, 39%, 100)', // sub title color
    '--sub-titl-sh': '', // subtitle box shadow
    '--sub-titl-bdr': '', // subtitle border

    '--hlp-txt-bg': 'hsla(123, 71%, 39%, 100)', // helper text background color
    '--hlp-txt-c': '', // helpertext color
    '--hlp-txt-sh': '', // helper text box shadow
    '--hlp-txt-bdr': '', // helper text border

    '--err-bg': 'hsla(0, 82%, 87%, 100)', // error messages background color
    '--err-c': 'hsla(0 , 68%, 35%, 100)', // error messages text color
    '--err-sh': '1em 3px 5px 0rem blue inset', // error messages box shadow
    '--err-bdr': 'solid hsla(0, 23%, 72%, 100)', // error message border
  },
})

export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {},
})

export const $themeColors = selector({
  key: '$themeColors',
  get: ({ get }) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') return get($lightThemeColors)
    if (colorScheme === 'dark') return merge(get($lightThemeColors), get($darkThemeColors))
  },
  set: ({ set, get }, newColors) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') set($lightThemeColors, newColors)
    if (colorScheme === 'dark') set($darkThemeColors, newColors)
  },
})
