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
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { hsv2hsl } from './colorHelpers'
import ColorPreview from './ColorPreview'

function SimpleColorPickerMenu({ action, value, objectPaths }) {
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
    '--global-primary-color': themePrimaryColor } = themeColors

  const getCustomColor = () => {
    const colorValue = styles.fields[objectPaths.fk].classes[objectPaths.selector][objectPaths.property]
    if (colorValue === undefined) return 'hsla(0, 0%, 100%, 100)'
    if (colorValue.match(/var/g)?.[0] === 'var') {
      const getVarProperty = colorValue.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return colorValue
  }

  useEffect(() => {
    if (isColorVar) return
    if (!action.type) return

    switch (action.type) {
      case 'global-primary-color':
      case 'global-font-color':
        return setColor(str2Color(themeVars['--global-font-color']))
      case 'global-fld-bdr-clr':
        return setColor(str2Color(themeVars['--global-fld-bdr-clr']))
      case 'individul-color':
        return setColor(str2Color(getCustomColor()))
      default:
        return setColor(str2Color(themeVars[`--${action.type}`]))
    }
  }, [action])

  const handleColor = () => {
    const [_h, _s, _l] = hsv2hsl(color.h, color.s, color.v)
    if (!action.type) return

    const h = Math.round(_h || 0)
    const s = Math.round(_s)
    const l = Math.round(_l)
    const a = color.a || 100

    const hsla = `hsla(${h}, ${s}%, ${l}%, ${a})`

    switch (action.type) {
      case 'global-primary-color':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-primary-color'] = hsla
          drft['--gph'] = h
          drft['--gps'] = `${s}%`
          drft['--gpl'] = `${l}%`
          drft['--gpa'] = a / 100
        }))
        break
      case 'global-font-color':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-font-color'] = hsla
          drft['--gfh'] = Math.round(_h)
          drft['--gfs'] = `${s}%`
          drft['--gfl'] = `${l}%`
          drft['--gfa'] = a / 100
        }))
        break
      case 'global-bg-color':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-bg-color'] = hsla
          drft['--gbg-h'] = Math.round(_h)
          drft['--gbg-s'] = `${s}%`
          drft['--gbg-l'] = `${l}%`
          drft['--gbg-a'] = a / 100
        }))
        break
      case 'global-fld-bdr-clr':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-fld-bdr-clr'] = hsla
          // drft['--gfbc-h'] = Math.round(_h)
          // drft['--gfbc-s'] = `${s}%`
          // drft['--gfbc-l'] = `${l}%`
          // drft['--gfbc-a'] = a / 100
        }))
        break
      case 'global-fld-bg-color':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-fld-bg-color'] = hsla
          // drft['--gfbg-h'] = Math.round(_h)
          // drft['--gfbg-s'] = `${s}%`
          // drft['--gfbg-l'] = `${l}%`
          // drft['--gfbg-a'] = a / 100
        }))
        break
      case 'fw-bg':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--fld-wrp-bg'] = hsla
          // drft['--gfbg-h'] = Math.round(_h)
          // drft['--gfbg-s'] = `${s}%`
          // drft['--gfbg-l'] = `${l}%`
          // drft['--gfbg-a'] = a / 100
        }))
        break
      case 'individul-color':
        setStyles(prvStyle => produce(prvStyle, drft => {
          drft.fields[objectPaths.fk].classes[objectPaths.selector][objectPaths.property] = hsla
        }))
        break
      default:
        return setThemeVars(prvState => produce(prvState, drft => {
          drft[`--${action.type}`] = hsla
        }))
    }
  }

  const handleColorVar = () => {
    if (!action.type) return

    const colorVar = `var(${color})`

    switch (action.type) {
      case 'global-fld-bdr-clr':
        setThemeColors(prvState => produce(prvState, drft => {
          drft['--global-fld-bdr-clr'] = colorVar
        }))
        break
      default:
        return setThemeVars(prvState => produce(prvState, drft => {
          drft[`--${action.type}`] = colorVar
        }))
    }
  }

  useEffect(() => {
    if (isColorVar) {
      handleColorVar()
    } else if (color) {
      handleColor()
    }
  }, [color])

  const formatColorOnChange = clr => {
    let c = ''
    if (typeof clr === 'string') {
      c = `var(${clr})`
    } else {
      const [_h, _s, _l] = hsv2hsl(clr.h, clr.s, clr.v)
      c = `hsla(${Math.round(_h || 0)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${clr.a || 100})`
    }

    action.onChange(c)
  }

  const setColorState = (val) => {
    setColor(val)

    if (action.onChange) formatColorOnChange(val)
  }

  // useEffect(() => {
  //   if (!isColorVar) return

  // }, [colorVar])

  return (
    <div className={css(c.preview_wrp)}>
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
          <button className={css(c.clrItem, color === '--global-primary-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-primary-color')}>
            <ColorPreview bg={themePrimaryColor} className={css(ut.mr2)} />
            <span>Background Primary Color</span>
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

    </div>
  )
}

export default memo(SimpleColorPickerMenu)

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
