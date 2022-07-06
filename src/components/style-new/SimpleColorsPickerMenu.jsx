/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { hexToCSSFilter } from 'hex-to-css-filter'
import produce from 'immer'
import { useTransition, memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import boxSizeControlStyle from '../../styles/boxSizeControl.style'
import { addToBuilderHistory, assignNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SingleToggle from '../Utilities/SingleToggle'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { hsla2hsva, hslToHex, hsva2hsla } from './colorHelpers'
import ColorPreview from './ColorPreview'
import { getValueByObjPath } from './styleHelpers'

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
function SimpleColorsPickerMenu({ stateObjName,
  propertyPath,
  hslaPaths,
  canSetVariable,
  id,
  fldKey }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [color, setColor] = useState()
  const [, startColorTransition] = useTransition()
  const isColorVar = typeof color === 'string'
  const [controller, setController] = useState(isColorVar ? 'Var' : 'Custom')
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const options = [
    { label: 'Custom', icn: 'Custom color', show: ['icn'], tip: 'Custom color' },
    { label: 'Var', icn: 'Variables', show: ['icn'], tip: 'Variable color' },
  ]
  const { '--global-bg-color': themeBgColor,
    '--global-fld-bdr-clr': themeFldBdrClr,
    '--global-fld-bg-color': themeFldBgColor,
    '--global-font-color': themeFontColor,
    '--global-accent-color': themePrimaryColor } = themeColors

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
          const varClr = styleColor?.replaceAll(/\(|var|,.*|\)|(!important)|\s/gi, '')
          c = themeVars[varClr] ? themeVars[varClr] : themeColors[varClr]
        }
        if (styleColor?.match(/(!important)/gi)) {
          c = styleColor?.replaceAll(/(!important)|\s/gi, '')
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

  const handleColor = (_h, _s, _v, _a, str = '') => {
    const [h, s, l, a, hslaStr] = hsva2hsla(_h, _s, _v, _a)

    const event = 'color changed'
    const type = propertyPath
    const state = { fldKey: stateObjName }
    const historyData = { event, type, state }

    switch (stateObjName) {
      case 'themeColors':
        const newThemeColors = produce(themeColors, drftThmClr => {
          drftThmClr[propertyPath] = hslaStr
          if (hslaPaths) {
            if ('h' in hslaPaths) { drftThmClr[hslaPaths.h] = h }
            if ('s' in hslaPaths) { drftThmClr[hslaPaths.s] = `${s}%` }
            if ('l' in hslaPaths) { drftThmClr[hslaPaths.l] = `${l}%` }
            if ('a' in hslaPaths) { drftThmClr[hslaPaths.a] = `${a}%` }
          }

          if (propertyPath === '--global-accent-color') {
            const hexValue = hslToHex(h, s, l)
            const setFilterValue = hexToCSSFilter(hexValue)
            drftThmClr['--fld-focs-i-fltr'] = setFilterValue.filter
          }
        })
        setThemeColors(newThemeColors)
        historyData.state.themeColors = newThemeColors
        addToBuilderHistory(setBuilderHistory, historyData, setUpdateBtn)
        break

      case 'themeVars':
        setThemeVars(prvState => produce(prvState, drftThmVar => {
          drftThmVar[propertyPath] = hslaStr
          if (hslaPaths) {
            if ('h' in hslaPaths) { drftThmVar[hslaPaths.h] = h }
            if ('s' in hslaPaths) { drftThmVar[hslaPaths.s] = `${s}%` }
            if ('l' in hslaPaths) { drftThmVar[hslaPaths.l] = `${l}%` }
            if ('a' in hslaPaths) { drftThmVar[hslaPaths.a] = `${a}%` }
          }
        }))
        break

      case 'field-accent-color':
        setStyles(prvState => produce(prvState, drftStyles => {
          const v = `${hslaStr}!important`
          const sc = `0px 0px 0px 3px hsla(${h}, ${s}%, ${l}%, 0.30)!important`
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:focus`]['border-color'] = v
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:focus`]['box-shadow'] = sc
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:hover`]['border-color'] = v
        }))
        break

      case 'styles':
        setStyles(prvState => produce(prvState, drftStyles => {
          let hslaColor = hslaStr
          const propertyPathArr = Array.isArray(propertyPath) ? propertyPath[0] : propertyPath
          const value = getValueByObjPath(drftStyles, propertyPathArr)
          const checkExistImportant = value?.match(/(!important)/gi)?.[0]
          const sc = `0px 0px 0px 3px hsla(${h}, ${s}%, ${l}%, 0.30) !important`
          if (checkExistImportant) hslaColor = `${hslaColor} !important`
          const clr = str || hslaColor
          if (Array.isArray(propertyPath)) {
            propertyPath.forEach(path => {
              const pathArr = path.split('->')
              const lastIndx = pathArr.length - 1
              if (pathArr[lastIndx] === 'box-shadow') assignNestedObj(drftStyles, path, sc)
              else if (pathArr[lastIndx] === 'filter') {
                const hexValue = hslToHex(h, s, l)
                const setFilterValue = hexToCSSFilter(hexValue)
                assignNestedObj(drftStyles, path, setFilterValue.filter)
              } else assignNestedObj(drftStyles, path, clr)
            })
          } else {
            assignNestedObj(drftStyles, propertyPath, clr)
          }
        }))
        break

      default:
        break
    }
  }

  const setColorState = (colorObj) => {
    if (typeof colorObj === 'object') {
      setColor(colorObj)
      startColorTransition(() => {
        handleColor(colorObj.h, colorObj.s, colorObj.v, colorObj.a)
      })
    } else {
      const str = `var(${colorObj})`
      const getColor = themeColors[colorObj]
      if (getColor) {
        const [_h, _s, _v, _a] = getColor.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
        const [h, s, v, a] = hsla2hsva(_h, _s, _v, _a)
        setColor({ h, s, v, a })
        startColorTransition(() => {
          handleColor(h, s, v, a, str)
        })
      } else {
        startColorTransition(() => {
          handleColor('', '', '', '', str)
        })
      }
    }
  }

  const transparantColor = (e) => {
    const colorObj = { h: 0, s: 0, v: 0, a: 0 }
    if (e.target.checked) {
      setColorState(colorObj)
    } else {
      setColorState('--global-accent-color')
    }
  }

  const checkTransparant = () => {
    if (color?.h === 0 && color?.s === 0 && color?.v === 0 && color?.a === 0) {
      return true
    }
    return false
  }

  return (
    <div className={css(c.preview_wrp)}>
      {canSetVariable ? (
        <>
          <div className={css(boxSizeControlStyle.titlecontainer, c.mb)}>
            <StyleSegmentControl
              square
              noShadow
              defaultActive="Custom"
              options={options}
              size={60}
              component="button"
              onChange={lbl => setController(lbl)}
              show={['icn']}
              variant="lightgray"
              width="100%"
              wideTab
            />
          </div>

          <Grow open={controller === 'Var'}>
            <div className={css(c.varClr)}>
              <button
                className={`${css(c.clrItem)} ${css(color === '--global-bg-color' ? c.active : null)}`}
                type="button"
                onClick={() => setColorState('--global-bg-color')}
                data-testid={`${id}-g-bg-c`}
              >
                <ColorPreview bg={themeBgColor} className={css(ut.mr2)} />
                <span>Background Color</span>
              </button>

              <button
                className={css(c.clrItem, color === '--global-accent-color' ? c.active : null)}
                type="button"
                onClick={() => setColorState('--global-accent-color')}
                data-testid={`${id}-g-a-c`}
              >
                <ColorPreview bg={themePrimaryColor} className={css(ut.mr2)} />
                <span>Background Accent Color</span>
              </button>

              <button
                className={css(c.clrItem, color === '--global-font-color' ? c.active : null)}
                type="button"
                onClick={() => setColorState('--global-font-color')}
                data-testid={`${id}-g-f-c`}
              >
                <ColorPreview bg={themeFontColor} className={css(ut.mr2)} />
                <span>Font Color</span>
              </button>

              <button
                className={css(c.clrItem, color === '--global-fld-bdr-clr' ? c.active : null)}
                type="button"
                onClick={() => setColorState('--global-fld-bdr-clr')}
                data-testid={`${id}-g-f-b`}
              >
                <ColorPreview bg={themeFldBdrClr} className={css(ut.mr2)} />
                <span>Field Border Color</span>
              </button>

              <button
                className={css(c.clrItem, color === '--global-fld-bg-color' ? c.active : null)}
                type="button"
                onClick={() => setColorState('--global-fld-bg-color')}
                data-testid={`${id}-g-f-bg-c`}
              >
                <ColorPreview bg={themeFldBgColor} className={css(ut.mr2)} />
                <span>Field Background Color</span>
              </button>
            </div>
          </Grow>

          <Grow open={controller === 'Custom'}>
            <div className={css(c.container)}>
              <div className={css(c.subContainer)}>
                <SingleToggle
                  title={__('Transparant')}
                  action={transparantColor}
                  isChecked={checkTransparant()}
                  id="color-transparant"
                />
              </div>
              <ColorPicker
                showParams
                showPreview
                onChange={setColorState}
                value={color}
              />
            </div>
          </Grow>
        </>
      ) : (
        <div className={css(c.container)}>
          <div className={css(c.subContainer)}>
            <SingleToggle
              title={__('Transparant')}
              action={transparantColor}
              isChecked={checkTransparant()}
              id="color-transparant"
            />
          </div>
          <ColorPicker
            showParams
            showPreview
            onChange={setColorState}
            value={color}
          />
        </div>
      )}
    </div>
  )
}

export default memo(SimpleColorsPickerMenu)

const c = {
  preview_wrp: {
    w: 248,
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
  container: {
    dy: 'flex',
    fd: 'column',
    '& .styles-module_container__2LiHz': { w: '100%' },
  },
  subContainer: {
    m: 5,
    '& span': { fs: 12 },
    '& input': { m: 0 },
  },
  color: {
    w: 30,
    h: 30,
    brs: 8,
    mr: 10,
  },
  bggrid: { bi: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)' },
  varClr: { my: 5, w: '100%' },
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
