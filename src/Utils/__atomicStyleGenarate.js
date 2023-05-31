/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import { atomizeCss, combineSelectors, expressAndCleanCssVars, objectToCssText, optimizeAndDefineCssClassProps } from 'atomize-css'
import { bitStore.get } from 'recoil-nexus'
import { removeUnusedStyles } from '../components/style-new/styleHelpers'
import { $breakpointSize, $builderSettings, $formId, $workflows } from '../GlobalStates/GlobalStates'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import { $darkThemeColors, $lightThemeColors } from '../GlobalStates/ThemeColorsState'
import { $themeVarsLgDark, $themeVarsLgLight, $themeVarsMdDark, $themeVarsMdLight, $themeVarsSmDark, $themeVarsSmLight } from '../GlobalStates/ThemeVarsState'
import { getLayoutDiff } from './FormBuilderHelper'
import { getObjectDiff, getOneLvlObjDiff, mergeNestedObj } from './globalHelpers'

export default function atomicStyleGenarate(sortedLayout) {
  const { atomicClassPrefix, darkModeConfig } = bitStore.get($builderSettings)
  const { styleMergeWithAtomicClasses } = bitStore.get($staticStylesState)
  const { darkModeSelector, preferSystemColorScheme } = darkModeConfig
  const darkModeOnSystemPreference = preferSystemColorScheme
  const ignoreWithFallbackValues = {
    position: 'unset',
    right: 'unset',
    left: 'unset',
    'justify-content': 'initial',
    'border-style': 'medium',
    'border-width': '0',
    'background-color': 'transparent',
    'border-radius': '0',
    border: 'medium none',
    'box-shadow': 'none',
    margin: '0',
    padding: '0',
    'text-align': 'init',
    color: 'inherit',
    display: 'block',
    'flex-direction': 'row',
    'align-self': 'auto',
    width: 'auto',
  }

  const invalidPropValue = {
    'border-color': 'none',
    'background-color': 'none',
  }

  const atomizeCssConfig = { classPrefix: atomicClassPrefix }
  const cssFilterConfig = {
    ignoreWithFallbackValues,
    invalidPropValue,
  }

  const LgDarkAtomicClassPostfix = '-D'
  const MdLightAtomicClassPostfix = '-M'
  const MdDarkAtomicClassPostfix = '-N'
  const SmLightAtomicClassPostfix = '-S'
  const SmDarkAtomicClassPostfix = '-P'

  const formId = bitStore.get($formId)

  // const layoutRowHeight = 2

  const themeColorsLight = bitStore.get($lightThemeColors)
  const themeColorsDark = bitStore.get($darkThemeColors)

  let { lgLightStyles: stylesLgLight,
    lgDarkStyles: stylesLgDark, // eslint-disable-line prefer-const
    mdLightStyles: stylesMdLight,
    mdDarkStyles: stylesMdDark, // eslint-disable-line prefer-const
    smLightStyles: stylesSmLight,
    smDarkStyles: stylesSmDark, // eslint-disable-line prefer-const
  } = removeUnusedStyles()

  stylesLgLight = mergeNestedObj(stylesLgLight, styleMergeWithAtomicClasses.lgLightStyles)
  stylesMdLight = mergeNestedObj(stylesMdLight, styleMergeWithAtomicClasses.mdLightStyles)
  stylesSmLight = mergeNestedObj(stylesSmLight, styleMergeWithAtomicClasses.smLightStyles)

  // const stylesLgLight = bitStore.get($stylesLgLight)
  // const stylesMdLight = bitStore.get($stylesMdLight)
  // const stylesSmLight = bitStore.get($stylesSmLight)

  // const stylesLgDark = bitStore.get($stylesLgDark)
  // const stylesMdDark = bitStore.get($stylesMdDark)
  // const stylesSmDark = bitStore.get($stylesSmDark)

  const themeVarsLgLight = bitStore.get($themeVarsLgLight)
  const themeVarsMdLight = bitStore.get($themeVarsMdLight)
  const themeVarsSmLight = bitStore.get($themeVarsSmLight)

  const themeVarsLgDark = bitStore.get($themeVarsLgDark)
  const themeVarsMdDark = bitStore.get($themeVarsMdDark)
  const themeVarsSmDark = bitStore.get($themeVarsSmDark)

  const { md: mdBreakpointSize, sm: smBreakpointSize } = bitStore.get($breakpointSize)

  // difference between main themecolor, themevar, style object and dark mode and mobo device breakpoint changes
  const lightThemeColors = themeColorsLight
  const darkThemeColors = getOneLvlObjDiff(lightThemeColors, themeColorsDark)

  const lgLightThemeVars = themeVarsLgLight
  const lgDarkThemeVars = getOneLvlObjDiff(lgLightThemeVars, themeVarsLgDark)
  const mdLightThemeVars = getOneLvlObjDiff(lgLightThemeVars, themeVarsMdLight)
  const mdDarkThemeVars = getOneLvlObjDiff({ ...lgLightThemeVars, ...lgDarkThemeVars }, themeVarsMdDark)
  const smLightThemeVars = getOneLvlObjDiff({ ...lgLightThemeVars, ...mdLightThemeVars }, themeVarsSmLight)
  const smDarkThemeVars = getOneLvlObjDiff({ ...lgLightThemeVars, ...lgDarkThemeVars, ...mdDarkThemeVars }, themeVarsSmDark)

  const lgLightStyles = stylesLgLight
  const lgDarkStyles = getObjectDiff(lgLightStyles, stylesLgDark)
  const mdLightStyles = getObjectDiff(lgLightStyles, stylesMdLight)
  const mdDarkStyles = getObjectDiff(mergeNestedObj(lgLightStyles, lgDarkStyles), stylesMdDark)
  const smLightStyles = getObjectDiff(mergeNestedObj(lgLightStyles, mdLightStyles), stylesSmLight)
  const smDarkStyles = getObjectDiff(mergeNestedObj(lgLightStyles, lgDarkStyles, mdDarkStyles), stylesSmDark)

  // generate lg light styles merged
  const allLgLightVars = { ...lgLightThemeVars, ...lightThemeColors }
  const allLgLightStyles = flatenStyleObj(lgLightStyles)
  const normalizedAllLgLightVars = expressAndCleanCssVars(allLgLightVars)
  const normalizedAllLgLightStyles = optimizeAndDefineCssClassProps(allLgLightStyles, normalizedAllLgLightVars, cssFilterConfig)
  const { atomicClasses: lgLightAtomicStyles, classMaps: lgLightAtomicClassMap } = atomizeCss(normalizedAllLgLightStyles, atomizeCssConfig)

  // generate lg dark styles merged
  const allLgDarkVars = { ...lgLightThemeVars, ...lgDarkThemeVars, ...lightThemeColors, ...darkThemeColors }
  const allLgDarkStyles = flatenStyleObj(mergeNestedObj(lgLightStyles, lgDarkStyles))
  const normalizedAllLgDarkVars = expressAndCleanCssVars(allLgDarkVars)
  const normalizedAllLgDarkStyles = optimizeAndDefineCssClassProps(allLgDarkStyles, normalizedAllLgDarkVars, cssFilterConfig)
  const { atomicClasses: lgDarkAtomicStyles, classMaps: lgDarkAtomicClassMap } = atomizeCss(normalizedAllLgDarkStyles, atomizeCssConfig)

  // generate md light styles merged
  const allMdLightVars = { ...lgLightThemeVars, ...mdLightThemeVars, ...lightThemeColors }
  const allMdLightStyles = flatenStyleObj(mergeNestedObj(lgLightStyles, mdLightStyles))
  const normalizedAllMdLightVars = expressAndCleanCssVars(allMdLightVars)
  const normalizedAllMdLightStyles = optimizeAndDefineCssClassProps(allMdLightStyles, normalizedAllMdLightVars, cssFilterConfig)
  const { atomicClasses: mdLightAtomicStyles, classMaps: mdLightAtomicClassMap } = atomizeCss(normalizedAllMdLightStyles, atomizeCssConfig)

  // generate md dark styles merged
  const allMdDarkVars = { ...lgLightThemeVars, ...lgDarkThemeVars, ...mdDarkThemeVars, ...lightThemeColors, ...darkThemeColors }
  const allMdDarkStyles = flatenStyleObj(mergeNestedObj(lgLightStyles, lgDarkStyles, mdDarkStyles))
  const normalizedAllMdDarkVars = expressAndCleanCssVars(allMdDarkVars)
  const normalizedAllMdDarkStyles = optimizeAndDefineCssClassProps(allMdDarkStyles, normalizedAllMdDarkVars, cssFilterConfig)
  const { atomicClasses: mdDarkAtomicStyles, classMaps: mdDarkAtomicClassMap } = atomizeCss(normalizedAllMdDarkStyles, atomizeCssConfig)

  // generate sm light styles merged
  const allSmLightVars = { ...lgLightThemeVars, ...mdLightThemeVars, ...smLightThemeVars, ...lightThemeColors }
  const allSmLightStyles = flatenStyleObj(mergeNestedObj(lgLightStyles, mdLightStyles, smLightStyles))
  const normalizedAllSmLightVars = expressAndCleanCssVars(allSmLightVars)
  const normalizedAllSmLightStyles = optimizeAndDefineCssClassProps(allSmLightStyles, normalizedAllSmLightVars, cssFilterConfig)
  const { atomicClasses: smLightAtomicStyles, classMaps: smLightAtomicClassMap } = atomizeCss(normalizedAllSmLightStyles, atomizeCssConfig)

  // generate sm dark styles merged
  const allSmDarkVars = { ...lgLightThemeVars, ...lgDarkThemeVars, ...mdDarkThemeVars, ...smDarkThemeVars, ...lightThemeColors, ...darkThemeColors }
  const allSmDarkStyles = flatenStyleObj(mergeNestedObj(lgLightStyles, lgDarkStyles, mdDarkStyles, smDarkStyles))
  const normalizedAllSmDarkVars = expressAndCleanCssVars(allSmDarkVars)
  const normalizedAllSmDarkStyles = optimizeAndDefineCssClassProps(allSmDarkStyles, normalizedAllSmDarkVars, cssFilterConfig)
  const { atomicClasses: smDarkAtomicStyles, classMaps: smDarkAtomicClassMap } = atomizeCss(normalizedAllSmDarkStyles, atomizeCssConfig)

  // get only changes between main style object and (dark, mobo devices)
  const lgDarkAtomicStylesFiltered = getObjectDiff(lgLightAtomicStyles, lgDarkAtomicStyles)
  const mdLightAtomicStylesFiltered = getObjectDiff(lgLightAtomicStyles, mdLightAtomicStyles)
  const mdDarkAtomicStylesFiltered = getObjectDiff(mergeNestedObj(lgLightAtomicStyles, lgDarkAtomicStyles), mdDarkAtomicStyles)
  const smLightAtomicStylesFiltered = getObjectDiff(mergeNestedObj(lgLightAtomicStyles, mdLightAtomicStyles), smLightAtomicStyles)
  const smDarkAtomicStylesFiltered = getObjectDiff(mergeNestedObj(lgLightAtomicStyles, lgDarkAtomicStyles, mdDarkAtomicStyles), smDarkAtomicStyles)

  // filter classmap according to atomic classes
  const lgDarkAtomicClassMapFiltered = getElmClassNamesByAtomicClass(lgDarkAtomicStylesFiltered, lgDarkAtomicClassMap)
  const mdLightAtomicClassMapFiltered = getElmClassNamesByAtomicClass(mdLightAtomicStylesFiltered, mdLightAtomicClassMap)
  const mdDarkAtomicClassMapFiltered = getElmClassNamesByAtomicClass(mdDarkAtomicStylesFiltered, mdDarkAtomicClassMap)
  const smLightAtomicClassMapFiltered = getElmClassNamesByAtomicClass(smLightAtomicStylesFiltered, smLightAtomicClassMap)
  const smDarkAtomicClassMapFiltered = getElmClassNamesByAtomicClass(smDarkAtomicStylesFiltered, smDarkAtomicClassMap)

  console.log('====', {
    lgDarkAtomicClassMapFiltered,
    lgDarkAtomicStylesFiltered,
    lgDarkAtomicStyles,
    mdLightAtomicClassMapFiltered,
    mdDarkAtomicClassMapFiltered,
    smLightAtomicClassMapFiltered,
    smDarkAtomicClassMapFiltered,
    diff: getObjectDiff(normalizedAllLgLightStyles, normalizedAllLgDarkStyles),
  })
  // add suffix to atomic class and classmap of dark mode css and breakpoint css
  const [lgDarkAtomicClassesPostfixed, lgDarkClassMapPostfixed] = addPostfixToAtomicClassAndClassMaps(lgDarkAtomicStylesFiltered, lgDarkAtomicClassMapFiltered, LgDarkAtomicClassPostfix)
  const [mdLightAtomicStylesPostfixed, mdLightClassMapPostfixed] = addPostfixToAtomicClassAndClassMaps(mdLightAtomicStylesFiltered, mdLightAtomicClassMapFiltered, MdLightAtomicClassPostfix)
  const [mdDarkAtomicStylesPostfixed, mdDarkClassMapPostfixed] = addPostfixToAtomicClassAndClassMaps(mdDarkAtomicStylesFiltered, mdDarkAtomicClassMapFiltered, MdDarkAtomicClassPostfix)
  const [smLightAtomicStylesPostfixed, smLightClassMapPostfixed] = addPostfixToAtomicClassAndClassMaps(smLightAtomicStylesFiltered, smLightAtomicClassMapFiltered, SmLightAtomicClassPostfix)
  const [smDarkAtomicStylesPostfixed, smDarkClassMapPostfixed] = addPostfixToAtomicClassAndClassMaps(smDarkAtomicStylesFiltered, smDarkAtomicClassMapFiltered, SmDarkAtomicClassPostfix)

  const allMergedClassMaps = mergeNestedObj(
    lgLightAtomicClassMap,
    lgDarkClassMapPostfixed,
    mdLightClassMapPostfixed,
    mdDarkClassMapPostfixed,
    smLightClassMapPostfixed,
    smDarkClassMapPostfixed,
  )

  // optimize css by combine same styles selectors
  const lgLightCombineSelectors = combineSelectors(lgLightAtomicStyles)
  const lgDarkCombinedSelectors = combineSelectors(lgDarkAtomicClassesPostfixed)
  const mdLightCombinedSelectors = combineSelectors(mdLightAtomicStylesPostfixed)
  const mdDarkCombinedSelectors = combineSelectors(mdDarkAtomicStylesPostfixed)
  const smLightCombinedSelectors = combineSelectors(smLightAtomicStylesPostfixed)
  const smDarkCombinedSelectors = combineSelectors(smDarkAtomicStylesPostfixed)

  // keep all fields in lay.lg and remove same layout fields from md and sm in order to keep only different fields in md and sm
  const simplyfiedLayout = {}
  simplyfiedLayout.lg = sortedLayout.lg
  simplyfiedLayout.md = getLayoutDiff(sortedLayout.lg, sortedLayout.md)
  simplyfiedLayout.sm = getLayoutDiff(sortedLayout.md, sortedLayout.sm)

  const { lgLayoutStyleText, mdLayoutStyleText, smLayoutStyleText } = generateLayoutStyle(simplyfiedLayout)

  console.log('========', { darkModeSelector, darkModeOnSystemPreference })

  // generate css text from objects and add dark mode prefix if need
  const mdLightCssText = objectToCssText(mdLightCombinedSelectors)?.trim()
  const smLightCssText = objectToCssText(smLightCombinedSelectors)?.trim()
  const lgDarkCssText = objectToCssText(lgDarkCombinedSelectors)?.trim()
  const lgPrefixedDarkCssText = objectToCssText(addPrefixInObjectKeys(lgDarkCombinedSelectors, `${darkModeSelector} `))?.trim()
  const mdDarkCssText = objectToCssText(mdDarkCombinedSelectors)?.trim()
  const mdPrefixedDarkCssText = objectToCssText(addPrefixInObjectKeys(mdDarkCombinedSelectors, `${darkModeSelector} `))?.trim()
  const smDarkCssText = objectToCssText(smDarkCombinedSelectors)?.trim()
  const smPrefixedDarkCssText = objectToCssText(addPrefixInObjectKeys(smDarkCombinedSelectors, `${darkModeSelector} `))?.trim()

  // concat css texts
  let cssText = generateFormGridStyle('lg', formId)
  cssText += lgLayoutStyleText
  cssText += objectToCssText(lgLightCombineSelectors)

  if (mdLayoutStyleText || mdLightCssText) {
    cssText += `@media (max-width:${mdBreakpointSize}px){`
    // cssText += generateFormGridStyle('md', formId) // unused after make all cols 60
    if (mdLayoutStyleText) cssText += mdLayoutStyleText
    if (mdLightCssText) cssText += mdLightCssText
    cssText += '}'
  }

  if (smLayoutStyleText || smLightCssText) {
    cssText += `@media (max-width:${smBreakpointSize}px){`
    // cssText += generateFormGridStyle('sm', formId) // unused after make all cols 60
    if (smLayoutStyleText) cssText += smLayoutStyleText
    if (smLightCssText) cssText += smLightCssText
    cssText += '}'
  }

  if (lgPrefixedDarkCssText) cssText += lgPrefixedDarkCssText
  if (mdPrefixedDarkCssText) cssText += mdPrefixedDarkCssText
  if (smPrefixedDarkCssText) cssText += smPrefixedDarkCssText
  if (lgDarkCssText && darkModeOnSystemPreference) cssText += `@media (prefers-color-scheme:dark){${lgDarkCssText}}`
  if (mdDarkCssText && darkModeOnSystemPreference) cssText += `@media (prefers-color-scheme:dark) and (max-width:${mdBreakpointSize}px){${mdDarkCssText}}`
  if (smDarkCssText && darkModeOnSystemPreference) cssText += `@media (prefers-color-scheme:dark) and (max-width:${smBreakpointSize}px){${smDarkCssText}}`

  return {
    atomicCssText: cssText,
    atomicClassMap: allMergedClassMaps,
    lightThemeColors,
    darkThemeColors,
    lgLightThemeVars,
    lgDarkThemeVars,
    mdLightThemeVars,
    mdDarkThemeVars,
    smLightThemeVars,
    smDarkThemeVars,
    lgLightStyles,
    lgDarkStyles,
    mdLightStyles,
    mdDarkStyles,
    smLightStyles,
    smDarkStyles,
  }
}

/*
  get only css classes from style object
*/
function flatenStyleObj(styleObj) {
  let flatedStyleObj = {}
  flatedStyleObj = styleObj?.form || {}
  const fieldKeys = Object.keys(styleObj.fields)
  const fieldKeyCount = fieldKeys.length

  flatedStyleObj = {
    ...flatedStyleObj,
    ...getConfirmationMsgStyles(styleObj), // get confirmation message styles wich are added in conditonals
  }
  for (let i = 0; i < fieldKeyCount; i += 1) {
    const fieldKey = fieldKeys[i]
    if (styleObj?.fields?.[fieldKey]?.classes) {
      flatedStyleObj = {
        ...flatedStyleObj,
        ...styleObj.fields[fieldKey].classes,
      }
    }
  }
  return flatedStyleObj
}

function getConfirmationMsgStyles(styleObj) {
  const workflows = bitStore.get($workflows)
  const tempStyleObj = {}
  let msgStyles = {}
  styleObj?.confirmations?.forEach(cmfObj => {
    tempStyleObj[cmfObj.confMsgId] = cmfObj.style
  })

  workflows?.forEach(workflow => {
    workflow.conditions?.forEach(condition => {
      condition.actions?.success?.forEach(conf => {
        if (conf.type === 'successMsg' && conf.details.id) {
          const msgId = JSON.parse(conf.details.id)?.id
          if (tempStyleObj[msgId]) {
            msgStyles = {
              ...msgStyles,
              ...tempStyleObj[msgId],
            }
          }
        }
      })
      if (condition.actions?.failure) {
        const msgId = JSON.parse(condition.actions?.failure)?.id
        if (tempStyleObj[msgId]) {
          msgStyles = {
            ...msgStyles,
            ...tempStyleObj[msgId],
          }
        }
      }
    })
  })
  return msgStyles
}

function getElmClassNamesByAtomicClass(atomicClasses, classMaps) {
  const atomicClassNames = Object.keys(atomicClasses)
  const atomicClassNameCount = atomicClassNames.length
  const elementClassNames = Object.keys(classMaps)
  const elementClassNameCount = elementClassNames.length

  if (!elementClassNameCount || !atomicClassNameCount) {
    return {}
  }

  const matchedElementClasses = {}

  for (let i = 0; i < atomicClassNameCount; i += 1) {
    const atomicClassName = atomicClassNames[i].substring(1)
    for (let j = 0; j < elementClassNameCount; j += 1) {
      const elementClassName = elementClassNames[j]
      if (classMaps[elementClassName]?.includes(atomicClassName)) {
        if (Array.isArray(matchedElementClasses[elementClassName])) {
          matchedElementClasses[elementClassName].push(atomicClassName)
        } else {
          matchedElementClasses[elementClassName] = [atomicClassName]
        }
      }
    }
  }
  return matchedElementClasses
}

function addPostfixToAtomicClassAndClassMaps(
  atomicClassesObj,
  classMapObj,
  postfix,
) {
  const renamedAtomicClassObj = {}
  const renamedClassMapObj = {}
  const atomicClassesNames = Object.keys(atomicClassesObj)
  const elementClassNames = Object.keys(classMapObj)

  atomicClassesNames.forEach((atomicClassName) => {
    renamedAtomicClassObj[atomicClassName + postfix] = atomicClassesObj[atomicClassName]
  })

  elementClassNames.forEach((elmClassName) => {
    renamedClassMapObj[elmClassName] = classMapObj[elmClassName]?.map(
      (atomicClassName) => atomicClassName + postfix,
    )
  })

  return [renamedAtomicClassObj, renamedClassMapObj]
}

function addPrefixInObjectKeys(obj, prefix) {
  const objKeys = Object.keys(obj)
  const newObj = {}
  objKeys.forEach((key) => {
    newObj[prefix + key] = { ...obj[key] }
  })
  return newObj
}

export function generateLayoutStyle(layouts) {
  let lgLayoutStyleText = ''
  let mdLayoutStyleText = ''
  let smLayoutStyleText = ''

  for (let i = 0; i < layouts.lg.length; i += 1) {
    // for large screen
    const lgFld = layouts.lg[i]
    const lgClsName = lgFld.i

    const lg_g_r_s = Math.round(lgFld.y + 1)
    const lg_g_c_s = Math.round(lgFld.x + 1)
    const lg_g_r_e = Math.round(lgFld.y !== 1 ? lgFld.h + (lgFld.y + 1) : 1)
    const lg_g_c_e = Math.round((lgFld.x + 1) + lgFld.w)
    // const lg_g_r_span = lg_g_r_e - lg_g_r_s
    // const lg_g_c_span = lg_g_c_e - lg_g_c_s
    const lg_min_height = `${lgFld.h}px`

    lgLayoutStyleText += `.${lgClsName}{`
    lgLayoutStyleText += `grid-area:${lg_g_r_s}/${lg_g_c_s}/${lg_g_r_e}/${lg_g_c_e};`
    // lgLayoutStyleText += `-ms-grid-row:${lg_g_r_s};`
    // lgLayoutStyleText += `-ms-grid-row-span:${lg_g_r_span};`
    // lgLayoutStyleText += `-ms-grid-column:${lg_g_c_s};`
    // lgLayoutStyleText += `-ms-grid-column-span:${lg_g_c_span};`
    lgLayoutStyleText += `min-height:${lg_min_height}`
    lgLayoutStyleText += '}'
  }
  for (let i = 0; i < layouts.md.length; i += 1) {
    // for medium screen
    const mdFld = layouts.md[i]
    const mdClsName = mdFld.i

    const md_g_r_s = Math.round(mdFld.y + 1)
    const md_g_c_s = Math.round(mdFld.x + 1)
    const md_g_r_e = Math.round(mdFld.y !== 1 ? mdFld.h + (mdFld.y + 1) : 1)
    const md_g_c_e = Math.round((mdFld.x + 1) + mdFld.w)
    // const md_g_r_span = md_g_r_e - md_g_r_s
    // const md_g_c_span = md_g_c_e - md_g_c_s
    const md_min_height = `${mdFld.h}px`

    mdLayoutStyleText += `.${mdClsName}{`
    mdLayoutStyleText += `grid-area:${md_g_r_s}/${md_g_c_s}/${md_g_r_e}/${md_g_c_e};`
    // mdLayoutStyleText += `-ms-grid-row:${md_g_r_s};`
    // mdLayoutStyleText += `-ms-grid-row-span:${md_g_r_span};`
    // mdLayoutStyleText += `-ms-grid-column:${md_g_c_s};`
    // mdLayoutStyleText += `-ms-grid-column-span:${md_g_c_span};`
    mdLayoutStyleText += `min-height:${md_min_height}`
    mdLayoutStyleText += '}'
  }
  for (let i = 0; i < layouts.sm.length; i += 1) {
    // for small screen
    const smFld = layouts.sm[i]
    const smClsName = smFld.i

    const sm_g_r_s = Math.round(smFld.y + 1)
    const sm_g_c_s = Math.round(smFld.x + 1)
    const sm_g_r_e = Math.round(smFld.y !== 1 ? smFld.h + (smFld.y + 1) : 1)
    const sm_g_c_e = Math.round((smFld.x + 1) + smFld.w)
    // const sm_g_r_span = sm_g_r_e - sm_g_r_s
    // const sm_g_c_span = sm_g_c_e - sm_g_c_s
    const sm_min_height = `${smFld.h}px`

    smLayoutStyleText += `.${smClsName}{`
    smLayoutStyleText += `grid-area:${sm_g_r_s}/${sm_g_c_s}/${sm_g_r_e}/${sm_g_c_e};`
    // smLayoutStyleText += `-ms-grid-row:${sm_g_r_s};`
    // smLayoutStyleText += `-ms-grid-row-span:${sm_g_r_span};`
    // smLayoutStyleText += `-ms-grid-column:${sm_g_c_s};`
    // smLayoutStyleText += `-ms-grid-column-span:${sm_g_c_span};`
    smLayoutStyleText += `min-height:${sm_min_height}`
    smLayoutStyleText += '}'
  }

  return {
    lgLayoutStyleText,
    mdLayoutStyleText,
    smLayoutStyleText,
  }
}

export function generateFormGridStyle(breakpoint, formId) {
  const columnRepeat = 60
  // breakpoint === 'md' && (columnRepeat = 40)
  // breakpoint === 'sm' && (columnRepeat = 20)
  let style = ''
  formId && (style += `._frm-b${formId}`)
  style += '{'
  breakpoint === 'lg' && (style += 'display:grid;')
  style += `grid-template-columns:repeat(${columnRepeat},minmax(1px,1fr))`
  style += '}'
  return style
}
