/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles, $themeVars } from '../../GlobalStates'
import BorderRadiusCornersIcn from '../../Icons/BorderRadiusCornersIcn'
import BorderRadiusIcn from '../../Icons/BorderRadiusIcn'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { hsv2hsl } from './colorHelpers'
import boxSizeControlStyle from '../../styles/boxSizeControl.style'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'

export default function SimpleColorPickerMenu({ action, value }) {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [color, setColor] = useState({ h: 0, s: 0, v: 0, a: 100 })
  const [controller, setController] = useState('Var')
  const [colorVar, setColorVar] = useState()
  const options = [
    { label: 'Var', icn: 'Variable', show: ['icn'], tip: 'Variable color' },
    { label: 'Custom', icn: 'Custom', show: ['icn'], tip: 'Custom color' },
  ]
  const { '--global-bg-color': globalBgColor,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgColor,
    '--global-font-color': globalFontColor,
    '--global-primary-color': globalPrimaryColor } = themeVars

  useEffect(() => {
    switch (action?.type) {
      case 'global-primary-color':
        return setColor(str2Color(themeVars['--global-primary-color']))
      case 'global-font-color':
        return setColor(str2Color(themeVars['--global-font-color']))
      case 'global-bg-color':
        return setColor(str2Color(themeVars['--global-bg-color']))
      case 'global-fld-bdr-color':
        return setColor(str2Color(themeVars['--global-fld-bdr-clr']))
      case 'global-fld-bg-color':
        return setColor(str2Color(themeVars['--global-fld-bg-color']))
      default:
        break
    }
  }, [action])

  useEffect(() => {
    const [_h, _s, _l] = hsv2hsl(color.h, color.s, color.v)
    switch (action?.type) {
      case 'global-primary-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-primary-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft['--gph'] = Math.round(_h)
          drft['--gps'] = `${Math.round(_s)}%`
          drft['--gpl'] = `${Math.round(_l)}%`
          drft['--gpa'] = color.a / 100
        }))
        break
      case 'global-font-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-font-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft['--gfh'] = Math.round(_h)
          drft['--gfs'] = `${Math.round(_s)}%`
          drft['--gfl'] = `${Math.round(_l)}%`
          drft['--gfa'] = color.a / 100
        }))
        break
      case 'global-bg-color':
        console.log(`hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`)
        console.log('--global-bg-color', themeVars['--global-bg-color'])

        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-bg-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft['--gbg-h'] = Math.round(_h)
          drft['--gbg-s'] = `${Math.round(_s)}%`
          drft['--gbg-l'] = `${Math.round(_l)}%`
          drft['--gbg-a'] = color.a / 100
        }))
        break
      case 'global-fld-bdr-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bdr-clr'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft['--gfbc-h'] = Math.round(_h)
          drft['--gfbc-s'] = `${Math.round(_s)}%`
          drft['--gfbc-l'] = `${Math.round(_l)}%`
          drft['--gfbc-a'] = color.a / 100
        }))
        break
      case 'global-fld-bg-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bg-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft['--gfbg-h'] = Math.round(_h)
          drft['--gfbg-s'] = `${Math.round(_s)}%`
          drft['--gfbg-l'] = `${Math.round(_l)}%`
          drft['--gfbg-a'] = color.a / 100
        }))
        break
      default:
        break
    }
  }, [color])

  const ColHandler = (val) => {
    setColorVar(val)
  }
  useEffect(() => {
    switch (action?.type) {
      case 'global-primary-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-primary-color'] = `var(${colorVar})`
        }))
        break
      case 'global-font-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-font-color'] = `var(${colorVar})`
        }))
        break
      case 'global-bg-color':
        console.log(colorVar)
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-bg-color'] = `var(${colorVar})`
        }))
        break
      case 'global-fld-bdr-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bdr-clr'] = `var(${colorVar})`
        }))
        break
      case 'global-fld-bg-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bg-color'] = `var(${colorVar})`
        }))
        break
      default:
        break
    }
  }, [colorVar])

  return (
    <div className={css(c.preview_wrp)}>
      <div className={css(boxSizeControlStyle.titlecontainer, c.mb)}>
        <span className={css(boxSizeControlStyle.title, c.m)}>Color</span>
        <StyleSegmentControl
          square
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
          <button className={css(c.clrItem, value === globalBgColor ? c.active : null)} type="button" onClick={() => ColHandler('--global-bg-color')}>
            <span className={css(c.color)} style={{ background: globalBgColor }} />
            <span>Background Color</span>
          </button>
          <button className={css(c.clrItem, value === globalPrimaryColor ? c.active : null)} type="button" onClick={() => ColHandler('--global-primary-color')}>
            <span className={css(c.color)} style={{ background: globalPrimaryColor }} />
            <span>Background Primary Color</span>
          </button>
          <button className={css(c.clrItem, value === globalFontColor ? c.active : null)} type="button" onClick={() => ColHandler('--global-font-color')}>
            <span className={css(c.color)} style={{ background: globalFontColor }} />
            <span>Font Color</span>
          </button>
          <button className={css(c.clrItem, value === globalFldBdrClr ? c.active : null)} type="button" onClick={() => ColHandler('--global-fld-bdr-clr')}>
            <span className={css(c.color)} style={{ background: globalFldBdrClr }} />
            <span>Field Border Color</span>
          </button>
          <button className={css(c.clrItem, value === globalFldBgColor ? c.active : null)} type="button" onClick={() => ColHandler('--global-fld-bg-color')}>
            <span className={css(c.color)} style={{ background: globalFldBgColor }} />
            <span>Field Background Color</span>
          </button>
        </div>
      </Grow>

      <Grow open={controller === 'Custom'}>
        <ColorPicker showParams showPreview onChange={setColor} value={color} />
      </Grow>

    </div>
  )
}

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
  varClr: { my: 5 },
  active: {
    bd: 'var(--b-79-96)',
    cr: 'var(--b-50)',
  },
  clrItem: {
    dy: 'block',
    flx: 'align-center',
    bd: 'var(--white-0-93)',
    p: 3,
    mb: 8,
    brs: 8,
    fs: 13,
    cur: 'pointer',
    w: '100%',
    b: 'none',
  },
  m: { mr: 15 },
  mb: { mb: 5 },
}
