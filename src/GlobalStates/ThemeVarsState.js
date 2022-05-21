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
    '--g-font-family': 'inherit', // default font family inherit from theme
    '--dir': 'ltr', // direaction
    '--inp-wrp-width': '',
    '--lbl-al': '', // label align
    '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '1rem', // field font size

    '--fld-wrp-dis': 'block', // field wrapper display
    '--fld-wrp-fdir': '', // field wrapper flex direction
    '--fld-wrp-m': '', // field wrapper margin
    '--fld-wrp-p': '10px', // field wrapper paddin
    '--fld-wrp-bdr-width': '', // field wrapper border width
    '--fld-wrp-bdr-rad': '', // field wrapper border radius

    '--lbl-wrp-sa': '',
    '--lbl-wrp-width': '100%', // label wrapper  width
    '--lbl-wrp-m': '', // label wrapper for margin
    '--lbl-wrp-p': '', // label wrapper for padding
    '--lbl-wrp-bdr-width': '', // label wrapper border width
    '--lbl-wrp-bdr-rad': '', // label wrapper border radius
    '--lbl-font-w': 700, // field font weight
    '--lbl-font-style': '', // field font style

    '--fld-lbl-m': '', // field label margin
    '--fld-lbl-p': '', // field label padding
    '--fld-lbl-fs': '1rem', // field label font size
    '--fld-lbl-bdr-width': '', // field label border width
    '--fld-lbl-bdr-rad': '', // field label border radius
    '--fld-lbl-pn': '', // field label position
    '--fld-font-w': 700, // field font weight
    '--fld-font-style': '', // field font style

    '--req-smbl-m': '', // Required Symbol Margin
    '--req-smbl-p': '', // Required Symbol Padding
    '--req-smbl-fs': '', // Required Symbol Font Size
    '--req-smbl-fw': '', // Required Symbol Font Weight
    '--req-smbl-lh': '', // Required Symbol line height
    '--req-smbl-pn': '', // Required Symbol position
    '--req-smbl-lt': '', // Required Symbol Left Value
    '--req-smbl-rt': '', // Required Symbol Right Value

    '--sub-titl-m': '', // subtitle margin
    '--sub-titl-p': '3px 0', // subtitle padding
    '--sub-titl-al': '', // subtitle align
    '--sub-titl-fs': '12px', // subtitle font size
    '--sub-titl-bdr-width': '', // subtitle border width
    '--sub-titl-bdr-rad': '', // subtitle border radius
    '--sub-titl-font-w': 500, // sub title font weight
    '--sub-titl-font-style': '', // subtitle font style

    '--hlp-txt-m': '', // helper text margin
    '--hlp-txt-p': '3px 0', // hepler text padding
    '--hlp-txt-fs': '12px', // hepler text font size
    '--hlp-txt-al': '', // helper text align
    '--hlp-txt-bdr-width': '', // helper text border width
    '--hlp-txt-bdr-rad': '', // helper text border radius
    '--hlp-txt-font-w': 400, // helper text font weight
    '--hlp-txt-font-style': '', // helper text font style

    '--err-m': '1px', // error messages margin
    '--err-p': '5px', // error messages padding
    '--err-bdr-width': '1px', // error message border width
    '--err-bdr-rad': '8px', // error message border radius
    '--err-txt-al': '', // error text align
    '--err-txt-fs': '12px', // error text font size
    '--err-txt-font-w': 400, // helper text font weight
    '--err-txt-font-style': '', // helper text font style

    '--pre-i-h': '40px', // fld prefix icon height
    '--pre-i-w': '40px', // fld prefix icon width
    '--pre-i-m': '', // fld prefix icon margin
    '--pre-i-p': '7px', // fld prefix icon padding
    '--pre-i-bdr-width': '', // fld prefix icon border width
    '--pre-i-bdr-rad': '8px', // fld prefix icon message border radius

    '--suf-i-h': '40px', // fld suffix icon height
    '--suf-i-w': '40px', // fld suffix icon width
    '--suf-i-m': '', // fld suffix icon margin
    '--suf-i-p': '7px', // fld suffix icon padding
    '--suf-i-bdr-width': '', // fld suffix icon border width
    '--suf-i-bdr-rad': '8px', // fld suffix icon border radius

    '--lbl-pre-i-h': '20px', // label prefix icon height
    '--lbl-pre-i-w': '20px', // label prefix icon width
    '--lbl-pre-i-m': '0 5px 0 0', // label prefix icon margin
    '--lbl-pre-i-p': '', // label prefix icon padding
    '--lbl-pre-i-bdr-width': '', // label prefix icon border width
    '--lbl-pre-i-bdr-rad': '8px', // label prefix icon message border radius

    '--lbl-suf-i-h': '20px', // Label suffix icon height
    '--lbl-suf-i-w': '20px', // Label suffix icon width
    '--lbl-suf-i-m': '5px', // Label suffix icon margin
    '--lbl-suf-i-p': '', // Label suffix icon padding
    '--lbl-suf-i-bdr-width': '', // Label suffix icon border width
    '--lbl-suf-i-bdr-rad': '8px', // Label suffix icon border radius

    '--sub-titl-pre-i-h': '20px', // sub title prefix icon height
    '--sub-titl-pre-i-w': '20px', // sub title prefix icon width
    '--sub-titl-pre-i-m': '5px', // sub title prefix icon margin
    '--sub-titl-pre-i-p': '', // sub title prefix icon padding
    '--sub-titl-pre-i-bdr-width': '', // sub title prefix icon border width
    '--sub-titl-pre-i-bdr-rad': '8px', // sub title prefix icon message border radius

    '--sub-titl-suf-i-h': '20px', // sub title suffix icon height
    '--sub-titl-suf-i-w': '20px', // sub title suffix icon width
    '--sub-titl-suf-i-m': '5px', // sub title suffix icon margin
    '--sub-titl-suf-i-p': '', // sub title suffix icon padding
    '--sub-titl-suf-i-bdr-width': '', // sub title suffix icon border width
    '--sub-titl-suf-i-bdr-rad': '8px', // sub title suffix icon border radius

    '--hlp-txt-pre-i-h': '20px', // helper txt prefix icon height
    '--hlp-txt-pre-i-w': '20px', // helper txt prefix icon width
    '--hlp-txt-pre-i-m': '5px', // helper txt prefix icon margin
    '--hlp-txt-pre-i-p': '', // helper txt prefix icon padding
    '--hlp-txt-pre-i-bdr-width': '', // helper txt prefix icon border width
    '--hlp-txt-pre-i-bdr-rad': '8px', // helper txt prefix icon message border radius

    '--hlp-txt-suf-i-h': '20px', // helper txt suffix icon height
    '--hlp-txt-suf-i-w': '20px', // helper txt suffix icon width
    '--hlp-txt-suf-i-m': '5px', // helper txt suffix icon margin
    '--hlp-txt-suf-i-p': '', // helper txt suffix icon padding
    '--hlp-txt-suf-i-bdr-width': '', // helper txt suffix icon border width
    '--hlp-txt-suf-i-bdr-rad': '8px', // helper txt suffix icon border radius

    '--err-txt-pre-i-h': '20px', // error txt prefix icon height
    '--err-txt-pre-i-w': '20px', // error txt prefix icon width
    '--err-txt-pre-i-m': '5px', // error txt prefix icon margin
    '--err-txt-pre-i-p': '', // error txt prefix icon padding
    '--err-txt-pre-i-bdr-width': '', // error txt prefix icon border width
    '--err-txt-pre-i-bdr-rad': '8px', // error txt prefix icon message border radius

    '--err-txt-suf-i-h': '20px', // error txt suffix icon height
    '--err-txt-suf-i-w': '20px', // error txt suffix icon width
    '--err-txt-suf-i-m': '5px', // error txt suffix icon margin
    '--err-txt-suf-i-p': '', // error txt suffix icon padding
    '--err-txt-suf-i-bdr-width': '', // error txt suffix icon border width
    '--err-txt-suf-i-bdr-rad': '8px', // error txt suffix icon border radius

    '--btn-fs': '16px', // button txt font size
    '--btn-p': '11px 20px', // button padding
    '--btn-m': '10px 0px', // button marging
    '--btn-fw': 700, // button font weight
    '--btn-f-style': '', // button font style (italic, bold, etc)
    '--btn-brs': '5px', // button border radius
    '--btn-brw': '1px', // button border radius

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
