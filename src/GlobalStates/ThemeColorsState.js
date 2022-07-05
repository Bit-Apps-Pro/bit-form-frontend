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
    '--gfl': '14%', // global font color lightness
    '--gfa': 100, // global font color opacity
    '--global-bg-color': '', // background color
    '--gbg-h': 0, // global background color hue
    '--gbg-s': '0%', // global background color saturation
    '--gbg-l': '100%', // global background color lightness
    '--gbg-a': 100, // global background color opacity
    '--global-fld-bdr-clr': 'hsla(0, 0%, 67%, 100)', // field border color
    '--gfbc-h': 0, // global field border color hue
    '--gfbc-s': '0%', // global field border color saturation
    '--gfbc-l': '67%', // global field border color lightness
    '--gfbc-a': 100, // global field border color opacity
    '--global-fld-bg-color': 'hsla(0, 0%, 100%, 100)', // field background color
    '--gfbg-h': 0, // global field background color hue
    '--gfbg-s': '0%', // global field background color saturation
    '--gfbg-l': '100%', // global field background color lightness
    '--gfbg-a': 100, // global field background color opacity

    '--fld-wrp-bg': 'hsla(0, 0%, 100%, 100)', // fieldwrapper background
    '--fld-wrp-bdr-clr': '', // field wrapper border color
    '--fld-wrp-sh': '', // field wrapper box shadow

    '--lbl-wrp-bg': '', // label wrapper for background
    '--lbl-wrp-sh': '', // label wrapper box shadow
    '--lbl-wrp-bdr-clr': '', // label wrapper border color

    '--fld-lbl-bg': '', // field label background color
    '--fld-lbl-c': '', // field babel color
    '--fld-lbl-sh': '', // field label box shadow
    '--fld-lbl-bdr-clr': '', // field label border color

    '--req-smbl-c': 'hsla(0, 100%, 50%, 100%)', // Required Symbol Color

    '--sub-titl-bg': '', // sub title background color
    '--sub-titl-c': '', // sub title color
    '--sub-titl-sh': '', // subtitle box shadow
    '--sub-titl-bdr-clr': '', // subtitle border color

    '--hlp-txt-bg': '', // helper text background color
    '--hlp-txt-c': '', // helpertext color
    '--hlp-txt-sh': '', // helper text box shadow
    '--hlp-txt-bdr-clr': '', // helper text border color

    '--err-bg': 'hsla(0, 82%, 87%, 100)', // error messages background color
    '--err-c': 'hsla(0 , 68%, 35%, 100)', // error messages text color
    '--err-sh': '0px 2px 8px 0px hsla(0, 0%, 39%, 20) ', // error messages box shadow
    '--err-bdr-clr': 'hsla(0, 23%, 72%, 100)', // error message border color

    '--pre-i-clr': '', // prefix icon color
    '--pre-i-fltr': '', // prefix icon filter
    '--pre-i-sh': '', // prefix icon shadow
    '--pre-i-bdr-clr': '', // prefix icon border color

    '--suf-i-clr': '', // suffix icon color
    '--suf-i-fltr': '', // suffix icon filter
    '--suf-i-sh': '', // suffix icon shadow
    '--suf-i-bdr-clr': '', // suffix icon border color

    '--lbl-pre-i-clr': '', // label prefix icon color
    '--lbl-pre-i-fltr': '', // label prefix icon filter
    '--lbl-pre-i-sh': '', // label prefix icon shadow
    '--lbl-pre-i-bdr-clr': '', // label prefix icon border color

    '--lbl-suf-i-clr': '', // label suffix icon color
    '--lbl-suf-i-fltr': '', // label suffix icon filter
    '--lbl-suf-i-sh': '', // label suffix icon shadow
    '--lbl-suf-i-bdr-clr': '', // label suffix icon border color

    '--sub-titl-pre-i-clr': '', // sub title prefix icon color
    '--sub-titl-pre-i-fltr': '', // sub title prefix icon filter
    '--sub-titl-pre-i-sh': '', // sub title prefix icon shadow
    '--sub-titl-pre-i-bdr-clr': '', // sub title prefix icon border color

    '--sub-titl-suf-i-clr': '', // sub title suffix icon color
    '--sub-titl-suf-i-fltr': '', // sub title suffix icon filter
    '--sub-titl-suf-i-sh': '', // sub title suffix icon shadow
    '--sub-titl-suf-i-bdr-clr': '', // sub title suffix icon border color

    '--hlp-txt-pre-i-clr': '', // helper txt prefix icon color
    '--hlp-txt-pre-i-fltr': '', // helper txt prefix icon filter
    '--hlp-txt-pre-i-sh': '', // helper txt prefix icon shadow
    '--hlp-txt-pre-i-bdr-clr': '', // helper txt prefix icon border color

    '--hlp-txt-suf-i-clr': '', // helper txt suffix icon color
    '--hlp-txt-suf-i-fltr': '', // helper txt suffix icon filter
    '--hlp-txt-suf-i-sh': '', // helper txt suffix icon shadow
    '--hlp-txt-suf-i-bdr-clr': '', // helper txt suffix icon border color

    '--err-txt-pre-i-clr': '', // helper txt prefix icon color
    '--err-txt-pre-i-fltr': '', // helper txt prefix icon filter
    '--err-txt-pre-i-sh': '', // helper txt prefix icon shadow
    '--err-txt-pre-i-bdr-clr': '', // helper txt prefix icon border color

    '--err-txt-suf-i-clr': '', // helper txt suffix icon color
    '--err-txt-suf-i-fltr': '', // helper txt suffix icon filter
    '--err-txt-suf-i-sh': '', // helper txt suffix icon shadow
    '--err-txt-suf-i-bdr-clr': '', // helper txt suffix icon border color

    '--btn-bg': 'var(--global-accent-color)', // button backgrond
    '--btn-bgc': 'var(--global-accent-color)', // button backgrond color
    '--btn-c': 'hsla(0, 0%, 100%, 100%)', // button font color color
    '--btn-bdr-clr': 'none', // button border color
    '--btn-sh': '2px 2px 4px -2px hsla(0, 0%, 0%, 40%)', // button shadow

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
