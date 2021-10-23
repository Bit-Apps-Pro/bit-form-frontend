/* eslint-disable no-param-reassign */
import { useFela } from 'react-fela'
import ColorPicker from '@atomik-color/component'
import { useRecoilState } from 'recoil'
import produce from 'immer'
import { useEffect, useState } from 'react'
import { hsv2hsl } from './colorHelpers'
import { $styles } from '../../GlobalStates'
import { str2Color } from '@atomik-color/core'

export default function SimpleColorPickerMenu({ action, value }) {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const [color, setColor] = useState({ h: 0, s: 0, v: 0, a: 100 })

  useEffect(() => {
    switch (action?.type) {
      case 'global-primary-color':
        return setColor(str2Color(styles.themeVars['--global-primary-color']))
      case 'global-font-color':
        return setColor(str2Color(styles.themeVars['--global-font-color']))
      case 'global-bg-color':
        return setColor(str2Color(styles.themeVars['--global-bg-color']))
      default:
        break
    }
  }, [action])

  useEffect(() => {
    const [_h, _s, _l] = hsv2hsl(color.h, color.s, color.v)
    switch (action?.type) {
      case 'global-primary-color':
        setStyles(prvState => produce(prvState, drft => {
          drft.themeVars['--global-primary-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft.themeVars['--gph'] = Math.round(_h)
          drft.themeVars['--gps'] = `${Math.round(_s)}%`
          drft.themeVars['--gpl'] = `${Math.round(_l)}%`
          drft.themeVars['--gpa'] = color.a / 100
        }))
        break
      case 'global-font-color':
        setStyles(prvState => produce(prvState, drft => {
          drft.themeVars['--global-font-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          drft.themeVars['--gfh'] = Math.round(_h)
          drft.themeVars['--gfs'] = `${Math.round(_s)}%`
          drft.themeVars['--gfl'] = `${Math.round(_l)}%`
          drft.themeVars['--gfa'] = color.a / 100
        }))
        break
      case 'global-bg-color':
        setStyles(prvState => produce(prvState, drft => {
          drft.themeVars['--global-bg-color'] = `hsla(${Math.round(_h)}, ${Math.round(_s)}%, ${Math.round(_l)}%, ${color.a})`
          console.log(drft.themeVars['--global-bg-color'])
          drft.themeVars['--gbg-h'] = Math.round(_h)
          drft.themeVars['--gbg-s'] = `${Math.round(_s)}%`
          drft.themeVars['--gbg-l'] = `${Math.round(_l)}%`
          drft.themeVars['--gbg-a'] = color.a / 100
        }))
        break
      default:
        break;
    }
    if (action?.type === 'global-primary-color') {

    }
  }, [color])

  return (
    <div className={css(c.preview_wrp)}>
      <ColorPicker showParams showPreview onChange={setColor} value={color} />
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
}
