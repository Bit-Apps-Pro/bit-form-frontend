import merge from 'deepmerge-alt'
import { atom, selector } from 'recoil'
import { $breakpoint } from './GlobalStates'

// export const $themeVars = atom({
//   key: '$themeVars',
//   default: {
//     '--g-bdr-rad': '11px', // border radius
//     '--g-bdr-width': '1px', // border width
//     '--dir': 'ltr', // direaction
//     '--inp-wrp-width': '',
//     '--lbl-al': '', // label align
//     '--fld-p': '', // field padding
//     '--fld-m': '', // field margin
//     '--fld-fs': '1rem', // field font size

//     '--fld-wrp-dis': '', // field wrapper display
//     '--fld-wrp-fdir': '', // field wrapper flex direction
//     '--fld-wrp-m': '', // field wrapper margin
//     '--fld-wrp-p': '10px', // field wrapper paddin
//     '--fld-wrp-bdr-width': '', // field wrapper border width
//     '--fld-wrp-bdr-rad': '', // field wrapper border radius

//     '--lbl-wrp-sa': '',
//     '--lbl-wrp-width': '', // label wrapper  width
//     '--lbl-wrp-m': '', // label wrapper for margin
//     '--lbl-wrp-p': '', // label wrapper for padding
//     '--lbl-wrp-bdr-width': '', // label wrapper border width
//     '--lbl-wrp-bdr-rad': '', // label wrapper border radius

//     '--fld-lbl-m': '', // field label margin
//     '--fld-lbl-p': '', // field label padding
//     '--fld-lbl-fs': '1rem', // field label font size
//     '--fld-lbl-bdr-width': '', // field label border width
//     '--fld-lbl-bdr-rad': '', // field label border radius

//     '--sub-titl-m': '', // subtitle margin
//     '--sub-titl-p': '', // subtitle padding
//     '--sub-titl-al': '', // subtitle align
//     '--sub-titl-fs': '12px', // subtitle font size
//     '--sub-titl-bdr-width': '', // subtitle border width
//     '--sub-titl-bdr-rad': '', // subtitle border radius

//     '--hlp-txt-m': '', // helper text margin
//     '--hlp-txt-p': '', // hepler text padding
//     '--hlp-txt-fs': '12px', // hepler text font size
//     '--hlp-txt-al': '', // helper text align
//     '--hlp-txt-bdr-width': '', // helper text border width
//     '--hlp-txt-bdr-rad': '', // helper text border radius

//     '--err-m': '', // error messages margin
//     '--err-p': '', // error messages padding
//     '--err-bdr-width': '1px', // error message border width
//     '--err-bdr-rad': '8px', // error message border radius
//   },
// })

const $themeVarsLg = atom({
  key: '$themeVarsLg',
  default: {
    '--g-bdr-rad': '11px', // border radius
    '--g-bdr-width': '1px', // border width
    '--dir': 'ltr', // direaction
    '--inp-wrp-width': '',
    '--lbl-al': '', // label align
    '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '1rem', // field font size

    '--fld-wrp-dis': '', // field wrapper display
    '--fld-wrp-fdir': '', // field wrapper flex direction
    '--fld-wrp-m': '', // field wrapper margin
    '--fld-wrp-p': '10px', // field wrapper paddin
    '--fld-wrp-bdr-width': '', // field wrapper border width
    '--fld-wrp-bdr-rad': '', // field wrapper border radius

    '--lbl-wrp-sa': '',
    '--lbl-wrp-width': '', // label wrapper  width
    '--lbl-wrp-m': '', // label wrapper for margin
    '--lbl-wrp-p': '', // label wrapper for padding
    '--lbl-wrp-bdr-width': '', // label wrapper border width
    '--lbl-wrp-bdr-rad': '', // label wrapper border radius

    '--fld-lbl-m': '', // field label margin
    '--fld-lbl-p': '', // field label padding
    '--fld-lbl-fs': '1rem', // field label font size
    '--fld-lbl-bdr-width': '', // field label border width
    '--fld-lbl-bdr-rad': '', // field label border radius

    '--sub-titl-m': '', // subtitle margin
    '--sub-titl-p': '', // subtitle padding
    '--sub-titl-al': '', // subtitle align
    '--sub-titl-fs': '12px', // subtitle font size
    '--sub-titl-bdr-width': '', // subtitle border width
    '--sub-titl-bdr-rad': '', // subtitle border radius

    '--hlp-txt-m': '', // helper text margin
    '--hlp-txt-p': '', // hepler text padding
    '--hlp-txt-fs': '12px', // hepler text font size
    '--hlp-txt-al': '', // helper text align
    '--hlp-txt-bdr-width': '', // helper text border width
    '--hlp-txt-bdr-rad': '', // helper text border radius

    '--err-m': '', // error messages margin
    '--err-p': '', // error messages padding
    '--err-bdr-width': '1px', // error message border width
    '--err-bdr-rad': '8px', // error message border radius
  },
})
export const $themeVarsMd = atom({ key: '$themeVarsMd', default: {} })
export const $themeVarsSm = atom({ key: '$themeVarsSm', default: {} })

export const $themeVars = selector({
  key: '$themeVars',
  get: ({ get }) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') return merge(get($themeVarsLg), get($themeVarsMd))
    if (breakpoint === 'sm') return merge(get($themeVarsLg), get($themeVarsSm))
    return get($themeVarsLg)
  },
  set: ({ set, get }, newThemeVars) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') set($themeVarsMd, newThemeVars)
    else if (breakpoint === 'sm') set($themeVarsSm, newThemeVars)
    else set($themeVarsLg, newThemeVars)
  },
})

export const $fieldsDirection = selector({
  key: '$fieldsDirection',
  get: ({ get }) => {
    const themeVars = get($themeVars)
    return themeVars['--dir']
  },
})
