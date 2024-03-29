/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { create } from 'mutative'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import { hsva2hsla } from './colorHelpers'
import { assignNestedObj, getValueByObjPath } from './styleHelpers'

// stateObjName string ex: themeColor
// objPath string ex: a->b->
// hslaPaths object ex: {h: 'a->b->',s: 'a->s->l'}
// canSetVariable bool
//
// fields->id->classes->className->prop

// <SimpleColorsPicker
//  stateName="themevar"
//  propertyPath="fields->id->classes->className->prop"
//  hsla={{h:'--gfh', s: ''}}
// />
function FilterColorsPickerMenu({ stateObjName,
  objectPaths, id, propertyPath }) {
  const { css } = useFela()
  const { fieldKey, element } = useParams()
  const [themeVars, setThemeVars] = useAtom($themeVars)
  const [color, setColor] = useState()
  const [themeColors, setThemeColors] = useAtom($themeColors)
  const [styles, setStyles] = useAtom($styles)

  const { paths } = objectPaths

  useEffect(() => {
    switch (stateObjName) {
      case 'themeColors':
        const themeColorsVal = getValueByObjPath(themeColors, propertyPath)
        setColor(str2Color(themeColorsVal))
        break

      case 'themeVars':
        const themeVarColor = getValueByObjPath(themeVars, propertyPath)
        setColor(str2Color(themeVarColor))
        break

      case 'styles':
        const pathArr = Array.isArray(propertyPath) ? propertyPath[0] : propertyPath
        const styleColor = getValueByObjPath(styles, pathArr)
        let c = styleColor
        if (styleColor?.match(/var/gi)?.[0] === 'var') {
          const varClr = styleColor?.replace(/\(|var|,.*|\)/gi, '')
          c = themeVars[varClr] ? themeVars[varClr] : themeColors[varClr]
        }
        setColor(str2Color(c))
        break

      case 'field-accent-color':
        const accColor = getValueByObjPath(themeColors, propertyPath)
        setColor(str2Color(accColor))
        break

      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleColor = (path, _h, _s, _v, _a) => {
    const [h, s, l, a, hslaStr] = hsva2hsla(_h, _s, _v, _a)

    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvState => create(prvState, drftThmClr => {
          drftThmClr[path] = hslaStr
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, hslaStr, { themeColors: getLatestState('themeColors') }))
        break

      case 'themeVars':
        setThemeVars(prvState => create(prvState, drftThmVar => {
          drftThmVar[path] = hslaStr
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, hslaStr, { themeVars: getLatestState('themeVars') }))
        break

      case 'styles':
        setStyles(prvState => create(prvState, drftStyles => {
          let hslaColor = hslaStr
          const value = getValueByObjPath(drftStyles, path)
          const checkExistImportant = value?.match(/!important/gi)?.[0]
          if (checkExistImportant) hslaColor = `${hslaColor} !important`

          assignNestedObj(drftStyles, path, hslaColor)
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, hslaStr, { styles: getLatestState('styles') }))
        break

      default:
        break
    }
  }

  const handleValue = (path, value) => {
    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvState => create(prvState, drftThmClr => {
          drftThmClr[path] = value
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, value, { themeColors: getLatestState('themeColors') }))
        break

      case 'themeVars':
        setThemeVars(prvState => create(prvState, drftThmVar => {
          drftThmVar[path] = value
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, value, { themeVars: getLatestState('themeVars') }))
        break

      case 'styles':
        setStyles(prvState => create(prvState, drftStyles => {
          let hslaColor = value
          const tempValue = getValueByObjPath(drftStyles, path)
          const checkExistImportant = tempValue?.match(/!important/gi)?.[0]
          if (checkExistImportant) hslaColor = `${hslaColor} !important`
          assignNestedObj(drftStyles, path, hslaColor)
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, path, value, { styles: getLatestState('styles') }))
        break

      default:
        break
    }
  }

  const setColorState = (colorObj) => {
    setColor(colorObj)
    const resultObj = hexToCSSFilter(colorObj.str)
    handleColor(paths['icon-color'], colorObj.h, colorObj.s, colorObj.v, colorObj.a)
    handleValue(paths.filter, resultObj.filter)
  }

  return (
    <div className={css(c.preview_wrp)}>

      <ColorPicker showParams showPreview onChange={setColorState} value={color} />

    </div>
  )
}

export default memo(FilterColorsPickerMenu)

const c = {
  preview_wrp: {
    '& div[role="group"]': { p: 4, b: 0 },
    '& input': {
      brs: 8,
      b: '1px solid lightgray',
      p: '3px 8px',
      mnh: '10px !important',
      fs: 12,
      mb: 3,
      bs: 'none',
      ':focus': { focusShadow: 1, b: '1px solid var(--b-50)' },
    },
    '& .common-module_transBackground__2AOKu': {
      brs: 8,
      ow: 'hidden',
    },
  },
  color: {
    w: 30,
    h: 30,
    brs: 8,
    mr: 10,
  },
  bggrid: { bi: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)' },
  varClr: { my: 5 },
  active: { bcr: 'var(--b-50) !important', bd: '#f3f8ff' },
  clrItem: {
    dy: 'block',
    flx: 'align-center',
    bd: 'transparent',
    b: '2px solid var(--white-0-93)',
    p: 3,
    mb: 8,
    brs: 10,
    fs: 12,
    cur: 'pointer',
    w: '100%',
    tn: 'background .3s',
    ':hover': { bd: 'var(--white-0-97)' },
  },
  m: { mr: 15 },
  mb: { mb: 5 },
}
