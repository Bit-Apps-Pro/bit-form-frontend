/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import boxSizeControlStyle from '../../styles/boxSizeControl.style'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { hsv2hsl } from './colorHelpers'
import ColorPreview from './ColorPreview'

export default function SimpleColorPickerMenu({ action, value }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [color, setColor] = useState()
  const isColorVar = typeof color === 'string'
  const [controller, setController] = useState(isColorVar ? 'Var' : 'Custom')
  // const [colorVar, setColorVar] = useState()
  const options = [
    { label: 'Custom', icn: 'Custom color', show: ['icn'], tip: 'Custom color' },
    { label: 'Var', icn: 'Variables', show: ['icn'], tip: 'Variable color' },
  ]
  const { '--global-bg-color': globalBgColor,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgColor,
    '--global-font-color': globalFontColor,
    '--global-primary-color': globalPrimaryColor } = themeVars

  useEffect(() => {
    if (isColorVar) return
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

  const handleColor = () => {
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
          // drft['--gfbc-h'] = Math.round(_h)
          // drft['--gfbc-s'] = `${Math.round(_s)}%`
          // drft['--gfbc-l'] = `${Math.round(_l)}%`
          // drft['--gfbc-a'] = color.a / 100
        }))
        break
      case 'global-fld-bg-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bg-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          // drft['--gfbg-h'] = Math.round(_h)
          // drft['--gfbg-s'] = `${Math.round(_s)}%`
          // drft['--gfbg-l'] = `${Math.round(_l)}%`
          // drft['--gfbg-a'] = color.a / 100
        }))
        break
      default:
        break
    }
  }

  const handleColorVar = () => {
    switch (action?.type) {
      case 'global-primary-color':
        console.log('set color')

        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-primary-color'] = `var(${color})`
        }))
        break
      case 'global-font-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-font-color'] = `var(${color})`
        }))
        break
      case 'global-bg-color':
        console.log(colorVar)
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-bg-color'] = `var(${color})`
        }))
        break
      case 'global-fld-bdr-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bdr-clr'] = `var(${color})`
        }))
        break
      case 'global-fld-bg-color':
        setThemeVars(prvState => produce(prvState, drft => {
          drft['--global-fld-bg-color'] = `var(${color})`
        }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    console.log('handle var', isColorVar, color)
    if (isColorVar) {
      console.log('handle var')
      handleColorVar()
    } else if (color) {
      handleColor()
    }
  }, [color])

  const setColorState = (val) => {
    setColor(val)
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
            <ColorPreview bg={globalBgColor} className={css(ut.mr2)} />
            <span>Background Color</span>
          </button>
          <button className={css(c.clrItem, color === '--global-primary-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-primary-color')}>
            <ColorPreview bg={globalPrimaryColor} className={css(ut.mr2)} />
            <span>Background Primary Color</span>
          </button>
          <button className={css(c.clrItem, color === '--global-font-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-font-color')}>
            <ColorPreview bg={globalFontColor} className={css(ut.mr2)} />
            <span>Font Color</span>
          </button>
          <button className={css(c.clrItem, color === '--global-fld-bdr-clr' ? c.active : null)} type="button" onClick={() => setColorState('--global-fld-bdr-clr')}>
            <ColorPreview bg={globalFldBdrClr} className={css(ut.mr2)} />
            <span>Field Border Color</span>
          </button>
          <button className={css(c.clrItem, color === '--global-fld-bg-color' ? c.active : null)} type="button" onClick={() => setColorState('--global-fld-bg-color')}>
            <ColorPreview bg={globalFldBgColor} className={css(ut.mr2)} />
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
