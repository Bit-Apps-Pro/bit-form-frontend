/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles, $themeColors, $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import boxSizeControlStyle from '../../styles/boxSizeControl.style'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { hsva2hsla } from './colorHelpers'
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
  const isColorVar = typeof color === 'string'
  const [controller, setController] = useState(isColorVar ? 'Var' : 'Custom')
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [styles, setStyles] = useRecoilState($styles)
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
        const styleColor = getValueByObjPath(styles, propertyPath)
        // let c = styleColor
        // if (styleColor.match(/var/gi)?.[0 === 'var']) {
        //   const varClr = styleColor.replaceAll(/\(|var|,.*|\)/gi, '')
        //   c = themeVars[varClr] ? themeVars[varClr] : $themeColors[varClr]
        // }
        // setColor(str2Color(c))
        break
      case 'field-accent-color':
        const accColor = getValueByObjPath(themeColors, propertyPath)
        setColor(str2Color(accColor))

      // eslint-disable-next-line no-fallthrough
      default:
        break
    }
  }, [id])

  const handleColor = (_h, _s, _v, _a) => {
    const [h, s, l, a, hslaStr] = hsva2hsla(_h, _s, _v, _a)
    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvState => produce(prvState, drftThmClr => {
          drftThmClr[propertyPath] = hslaStr
          if (hslaPaths) {
            if ('h' in hslaPaths) { drftThmClr[hslaPaths.h] = h }
            if ('s' in hslaPaths) { drftThmClr[hslaPaths.s] = s }
            if ('l' in hslaPaths) { drftThmClr[hslaPaths.l] = l }
            if ('a' in hslaPaths) { drftThmClr[hslaPaths.a] = a }
          }
        }))
        break
      case 'themeVars':
        setThemeVars(prvState => produce(prvState, drftThmVar => {
          drftThmVar[propertyPath] = hslaStr
          if (hslaPaths) {
            if ('h' in hslaPaths) { drftThmVar[hslaPaths.h] = h }
            if ('s' in hslaPaths) { drftThmVar[hslaPaths.s] = s }
            if ('l' in hslaPaths) { drftThmVar[hslaPaths.l] = l }
            if ('a' in hslaPaths) { drftThmVar[hslaPaths.a] = a }
          }
        }))
        break
      case 'styles':
        setStyles(prvState => produce(prvState, drftStyles => {
          let hslaColor = hslaStr
          const value = getValueByObjPath(drftStyles, propertyPath)
          const checkExistImportant = value?.match(/!important/gi)?.[0]
          if (checkExistImportant) hslaColor = `${hslaColor} !important`
          assignNestedObj(drftStyles, propertyPath, hslaColor)
        }))
        break
      case 'field-accent-color':
        setStyles(prvState => produce(prvState, drftStyles => {
          const sc = `0 0 0 3px hsla(${h}, ${s}, ${l}, 0.30)!important`
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:focus`]['border-color'] = `${hslaStr}!important`
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:focus`]['box-shadow'] = sc
          drftStyles.fields[fldKey].classes[`.${fldKey}-fld:hover`]['border-color'] = `${hslaStr}!important`
        }))

      // eslint-disable-next-line no-fallthrough
      default:
        break
    }
  }

  const setColorState = (colorObj) => {
    setColor(colorObj)
    handleColor(colorObj.h, colorObj.s, colorObj.v, colorObj.a)
  }

  return (
    <div className={css(c.preview_wrp)}>
      {canSetVariable ? (
        <>
          <div className={css(boxSizeControlStyle.titlecontainer, c.mb)}>
            <StyleSegmentControl
              square
              noShadow
              defaultActive="Var"
              options={options}
              size={60}
              component="button"
              onChange={lbl => setController(lbl)}
              show={['icn']}
              variant="lightgray"
              activeValue={controller}
              width="100%"
              wideTab
            />
          </div>

          <Grow open={controller === 'Var'}>
            <div className={css(c.varClr)}>
              <button className={`${css(c.clrItem)} ${css(color === '--global-bg-color' ? c.active : null)}`} type="button" onClick={() => setColorState('--global-bg-color')}>
                <ColorPreview bg={themeBgColor} className={css(ut.mr2)} />
                <span>Background Color</span>
              </button>
              <button className={css(c.clrItem, color === '--global-accent-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-accent-color')}>
                <ColorPreview bg={themePrimaryColor} className={css(ut.mr2)} />
                <span>Background Accent Color</span>
              </button>
              <button className={css(c.clrItem, color === '--global-font-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-font-color')}>
                <ColorPreview bg={themeFontColor} className={css(ut.mr2)} />
                <span>Font Color</span>
              </button>
              <button className={css(c.clrItem, color === '--global-fld-bdr-clr' ? c.active : null)} type="button" onClick={() => setColorState('--global-fld-bdr-clr')}>
                <ColorPreview bg={themeFldBdrClr} className={css(ut.mr2)} />
                <span>Field Border Color</span>
              </button>
              <button className={css(c.clrItem, color === '--global-fld-bg-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-fld-bg-color')}>
                <ColorPreview bg={themeFldBgColor} className={css(ut.mr2)} />
                <span>Field Background Color</span>
              </button>
            </div>
          </Grow>

          <Grow open={controller === 'Custom'}>
            <ColorPicker showParams showPreview onChange={setColorState} value={color} />
          </Grow>
        </>
      ) : (
        <ColorPicker showParams showPreview onChange={setColorState} value={color} />
      )}
    </div>
  )
}

export default memo(SimpleColorsPickerMenu)

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
