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
    '--global-bg-color': '', // background color
    '--gbg-h': 0,
    '--gbg-s': 0,
    '--gbg-l': 100,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 0%, 67%, 100)',
    '--global-fld-bg-color': 'hsla(0, 0%, 100%, 100)', // field background color

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
    '--err-sh': '0px 2px 8px 0px hsla(0, 0%, 39%, 20) ', // error messages box shadow
    '--err-bdr': 'solid hsla(0, 23%, 72%, 100)', // error message border

    '--pre-i-fltr': '', // prefix icon filter
    '--pre-i-sh': '', // prefix icon shadow
    '--pre-i-bdr': '', // prefix icon border

    '--suf-i-fltr': '', // suffix icon filter
    '--suf-i-sh': '', // suffix icon shadow
    '--suf-i-bdr': '', // suffix icon border

    '--lbl-pre-i-fltr': '', // label prefix icon filter
    '--lbl-pre-i-sh': '', // label prefix icon shadow
    '--lbl-pre-i-bdr': '', // label prefix icon border

    '--lbl-suf-i-fltr': '', // label suffix icon filter
    '--lbl-suf-i-sh': '', // label suffix icon shadow
    '--lbl-suf-i-bdr': '', // label suffix icon border

    '--sub-titl-pre-i-fltr': '', // sub title prefix icon filter
    '--sub-titl-pre-i-sh': '', // sub title prefix icon shadow
    '--sub-titl-pre-i-bdr': '', // sub title prefix icon border

    '--sub-titl-suf-i-fltr': '', // sub title suffix icon filter
    '--sub-titl-suf-i-sh': '', // sub title suffix icon shadow
    '--sub-titl-suf-i-bdr': '', // sub title suffix icon border

    '--hlp-txt-pre-i-fltr': '', // helper txt prefix icon filter
    '--hlp-txt-pre-i-sh': '', // helper txt prefix icon shadow
    '--hlp-txt-pre-i-bdr': '', // helper txt prefix icon border

    '--hlp-txt-suf-i-fltr': '', // helper txt suffix icon filter
    '--hlp-txt-suf-i-sh': '', // helper txt suffix icon shadow
    '--hlp-txt-suf-i-bdr': '', // helper txt suffix icon border

    '--err-txt-pre-i-fltr': '', // helper txt prefix icon filter
    '--err-txt-pre-i-sh': '', // helper txt prefix icon shadow
    '--err-txt-pre-i-bdr': '', // helper txt prefix icon border

    '--err-txt-suf-i-fltr': '', // helper txt suffix icon filter
    '--err-txt-suf-i-sh': '', // helper txt suffix icon shadow
    '--err-txt-suf-i-bdr': '', // helper txt suffix icon border

    '--ck-bdr-c': 'hsla(210, 78%, 96%, 100)',
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
